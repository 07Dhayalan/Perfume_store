const ordersData = [
  { id: '#1001', customer: 'Jane Doe', date: '2025-06-05', total: 150, status: 'Completed' },
  { id: '#1002', customer: 'John Smith', date: '2025-06-04', total: 300, status: 'Pending' },
  { id: '#1003', customer: 'Mary Jane', date: '2025-06-03', total: 120, status: 'Cancelled' },
  { id: '#1004', customer: 'Alex Johnson', date: '2025-06-02', total: 220, status: 'Completed' },
  { id: '#1005', customer: 'Emily Clark', date: '2025-06-01', total: 180, status: 'Pending' },
  { id: '#1006', customer: 'Michael Brown', date: '2025-05-31', total: 250, status: 'Completed' },
  { id: '#1007', customer: 'Sophia Lee', date: '2025-05-30', total: 130, status: 'Cancelled' },
  { id: '#1008', customer: 'David Wilson', date: '2025-05-29', total: 400, status: 'Pending' },
  { id: '#1009', customer: 'Olivia Martinez', date: '2025-05-28', total: 350, status: 'Completed' },
  { id: '#1010', customer: 'Liam Taylor', date: '2025-05-27', total: 210, status: 'Pending' },
  // Add more if you want
];

const ordersPerPage = 5;
let currentPage = 1;

const tbody = document.getElementById('ordersTbody');
const searchInput = document.getElementById('searchInput');
const prevBtn = document.getElementById('prevPage');
const nextBtn = document.getElementById('nextPage');
const pageInfo = document.getElementById('pageInfo');

function getStatusBadgeClass(status) {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'success';
    case 'pending':
      return 'warning';
    case 'cancelled':
      return 'danger';
    default:
      return '';
  }
}

function renderTable(data, page = 1) {
  tbody.innerHTML = '';
  const start = (page - 1) * ordersPerPage;
  const end = start + ordersPerPage;
  const pageData = data.slice(start, end);

  if (pageData.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:20px;">No orders found.</td></tr>';
    return;
  }

  pageData.forEach(order => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${order.id}</td>
      <td>${order.customer}</td>
      <td>${order.date}</td>
      <td>$${order.total.toFixed(2)}</td>
      <td><span class="badge ${getStatusBadgeClass(order.status)}">${order.status}</span></td>
      <td><button class="action-btn" onclick="alert('Viewing details for ${order.id}')">View</button></td>
    `;

    tbody.appendChild(tr);
  });

  pageInfo.textContent = `Page ${page} of ${Math.ceil(data.length / ordersPerPage)}`;

  prevBtn.disabled = page === 1;
  nextBtn.disabled = page === Math.ceil(data.length / ordersPerPage);
}

// Filter orders based on search
function filterOrders() {
  const term = searchInput.value.trim().toLowerCase();
  const filtered = ordersData.filter(order =>
    order.id.toLowerCase().includes(term) ||
    order.customer.toLowerCase().includes(term)
  );
  currentPage = 1;
  renderTable(filtered, currentPage);
  return filtered;
}

searchInput.addEventListener('input', () => {
  filterOrders();
});

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    const filtered = filterOrders();
    renderTable(filtered, currentPage);
  }
});

nextBtn.addEventListener('click', () => {
  const filtered = filterOrders();
  if (currentPage < Math.ceil(filtered.length / ordersPerPage)) {
    currentPage++;
    renderTable(filtered, currentPage);
  }
});

// Initial render
renderTable(ordersData, currentPage);
