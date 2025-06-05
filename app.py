from flask import Flask, jsonify, request, session, render_template
from flask_mysqldb import MySQL
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__, template_folder='templates')
app.secret_key = 'super-secret-key'
CORS(app, supports_credentials=True)

# MySQL Config
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'your_password'
app.config['MYSQL_DB'] = 'watch_store'

mysql = MySQL(app)

@app.route('/')
def index():
    return render_template('admin.html')

# ---------------- User Auth ----------------
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data['name']
    email = data['email']
    password = generate_password_hash(data['password'])
    cur = mysql.connection.cursor()
    try:
        cur.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)", (name, email, password))
        mysql.connection.commit()
        return jsonify({'message': 'Registration successful'})
    except:
        return jsonify({'error': 'Email already registered'}), 400

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']
    cur = mysql.connection.cursor()
    cur.execute("SELECT id, name, password, is_admin FROM users WHERE email=%s", (email,))
    user = cur.fetchone()
    if user and check_password_hash(user[2], password):
        session['user_id'] = user[0]
        session['name'] = user[1]
        session['is_admin'] = user[3]
        return jsonify({'message': 'Login successful', 'user_id': user[0], 'name': user[1], 'is_admin': user[3]})
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'message': 'Logged out'})

@app.route('/api/session', methods=['GET'])
def get_session():
    if 'user_id' in session:
        return jsonify({
            'user_id': session['user_id'],
            'name': session['name'],
            'is_admin': session['is_admin']
        })
    return jsonify({'user': None})

# ---------------- Watches (CRUD) --------------
@app.route('/api/watches', methods=['GET'])
def get_watches():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM watches")
    watches = cur.fetchall()
    result = []
    for w in watches:
        result.append({
            'id': w[0],
            'name': w[1],
            'brand': w[2],
            'price': float(w[3]),
            'description': w[4],
            'image_url': w[5]
        })
    return jsonify(result)

@app.route('/api/watches/<int:watch_id>', methods=['GET'])
def get_watch(watch_id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM watches WHERE id=%s", (watch_id,))
    w = cur.fetchone()
    if w:
        return jsonify({
            'id': w[0],
            'name': w[1],
            'brand': w[2],
            'price': float(w[3]),
            'description': w[4],
            'image_url': w[5]
        })
    return jsonify({'error': 'Watch not found'}), 404

@app.route('/api/admin/watches', methods=['POST'])
def add_watch():
    if not session.get('is_admin'):
        return jsonify({'error': 'Unauthorized'}), 403
    data = request.get_json()
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO watches (name, brand, price, description, image_url) VALUES (%s,%s,%s,%s,%s)",
                (data['name'], data['brand'], data['price'], data['description'], data['image_url']))
    mysql.connection.commit()
    return jsonify({'message': 'Watch added'})

@app.route('/api/admin/watches/<int:watch_id>', methods=['PUT'])
def update_watch(watch_id):
    if not session.get('is_admin'):
        return jsonify({'error': 'Unauthorized'}), 403
    data = request.get_json()
    cur = mysql.connection.cursor()
    cur.execute("""UPDATE watches SET name=%s, brand=%s, price=%s, description=%s, image_url=%s WHERE id=%s""",
                (data['name'], data['brand'], data['price'], data['description'], data['image_url'], watch_id))
    mysql.connection.commit()
    return jsonify({'message': 'Watch updated'})

@app.route('/api/admin/watches/<int:watch_id>', methods=['DELETE'])
def delete_watch(watch_id):
    if not session.get('is_admin'):
        return jsonify({'error': 'Unauthorized'}), 403
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM watches WHERE id=%s", (watch_id,))
    mysql.connection.commit()
    return jsonify({'message': 'Watch deleted'})

# -------------- Cart API -------------------
@app.route('/api/cart', methods=['GET'])
def get_cart():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Login required'}), 401
    cur = mysql.connection.cursor()
    cur.execute("""
        SELECT c.id, w.id, w.name, w.price, w.image_url, c.quantity
        FROM cart c JOIN watches w ON c.watch_id = w.id
        WHERE c.user_id = %s""", (user_id,))
    items = cur.fetchall()
    cart_items = []
    for i in items:
        cart_items.append({
            'cart_id': i[0],
            'watch_id': i[1],
            'name': i[2],
            'price': float(i[3]),
            'image_url': i[4],
            'quantity': i[5]
        })
    return jsonify(cart_items)

@app.route('/api/cart', methods=['POST'])
def add_to_cart():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Login required'}), 401
    data = request.get_json()
    watch_id = data['watch_id']
    quantity = data.get('quantity', 1)
    cur = mysql.connection.cursor()
    cur.execute("SELECT id, quantity FROM cart WHERE user_id=%s AND watch_id=%s", (user_id, watch_id))
    existing = cur.fetchone()
    if existing:
        new_qty = existing[1] + quantity
        cur.execute("UPDATE cart SET quantity=%s WHERE id=%s", (new_qty, existing[0]))
    else:
        cur.execute("INSERT INTO cart (user_id, watch_id, quantity) VALUES (%s,%s,%s)", (user_id, watch_id, quantity))
    mysql.connection.commit()
    return jsonify({'message': 'Added to cart'})

@app.route('/api/cart/<int:cart_id>', methods=['DELETE'])
def remove_cart_item(cart_id):
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Login required'}), 401
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM cart WHERE id=%s AND user_id=%s", (cart_id, user_id))
    mysql.connection.commit()
    return jsonify({'message': 'Removed from cart'})

# -------------- Order & Checkout API --------------
@app.route('/api/orders', methods=['POST'])
def create_order():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Login required'}), 401
    cur = mysql.connection.cursor()
    # get cart items
    cur.execute("""
        SELECT c.watch_id, c.quantity, w.price
        FROM cart c JOIN watches w ON c.watch_id = w.id
        WHERE c.user_id = %s
    """, (user_id,))
    items = cur.fetchall()
    if not items:
        return jsonify({'error': 'Cart is empty'}), 400
    total = sum(i[1] * float(i[2]) for i in items)
    # create order
    cur.execute("INSERT INTO orders (user_id, total_price) VALUES (%s, %s)", (user_id, total))
    order_id = cur.lastrowid
    # add order items
    for watch_id, qty, price in items:
        cur.execute("INSERT INTO order_items (order_id, watch_id, quantity, price) VALUES (%s,%s,%s,%s)",
                    (order_id, watch_id, qty, price))
    # clear cart
    cur.execute("DELETE FROM cart WHERE user_id=%s", (user_id,))
    mysql.connection.commit()
    return jsonify({'message': 'Order placed', 'order_id': order_id})

@app.route('/api/orders', methods=['GET'])
def get_orders():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Login required'}), 401
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM orders WHERE user_id=%s ORDER BY created_at DESC", (user_id,))
    orders = cur.fetchall()
    result = []
    for o in orders:
        order_id = o[0]
        cur.execute("SELECT w.name, oi.quantity, oi.price FROM order_items oi JOIN watches w ON oi.watch_id=w.id WHERE oi.order_id=%s", (order_id,))
        items = cur.fetchall()
        items_list = [{'name': i[0], 'quantity': i[1], 'price': float(i[2])} for i in items]
        result.append({
            'order_id': order_id,
            'total_price': float(o[2]),
            'status': o[4],
            'created_at': o[3].strftime("%Y-%m-%d %H:%M:%S"),
            'items': items_list
        })
    return jsonify(result)

# -------------- Payment Simulation --------------
@app.route('/api/payments', methods=['POST'])
def make_payment():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Login required'}), 401
    data = request.get_json()
    order_id = data['order_id']
    payment_method = data['payment_method']
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO payments (order_id, payment_method, payment_status, paid_at) VALUES (%s,%s,%s,NOW())",
                (order_id, payment_method, 'completed'))
    cur.execute("UPDATE orders SET status='completed' WHERE id=%s", (order_id,))
    mysql.connection.commit()
    return jsonify({'message': 'Payment successful'})

if __name__ == '__main__':
    app.run(debug=True)
