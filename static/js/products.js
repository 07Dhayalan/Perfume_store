const productsData = [
  { sku: 'WCH-001', name: 'Classic Silver Watch', category: 'Classic', price: 199.99, stock: 'In Stock' },
  { sku: 'WCH-002', name: 'Modern Black Watch', category: 'Modern', price: 249.99, stock: 'Low Stock' },
  { sku: 'WCH-003', name: 'Sporty Blue Watch', category: 'Sports', price: 179.99, stock: 'Out of Stock' },
  { sku: 'WCH-004', name: 'Elegant Gold Watch', category: 'Luxury', price: 499.99, stock: 'In Stock' },
  { sku: 'WCH-005', name: 'Casual Green Watch', category: 'Casual', price: 129.99, stock: 'In Stock' },
  { sku: 'WCH-006', name: 'Vintage Brown Watch', category: 'Vintage', price: 229.99, stock: 'Low Stock' },
  { sku: 'WCH-007', name: 'Digital Sport Watch', category: 'Sports', price: 159.99, stock: 'In Stock' },
  { sku: 'WCH-008', name: 'Luxury Diamond Watch', category: 'Luxury', price: 899.99, stock: 'Out of Stock' },
  { sku: 'WCH-009', name: 'Minimal White Watch', category: 'Modern', price: 199.99, stock: 'In Stock' },
  { sku: 'WCH-010', name: 'Bold Red Watch', category: 'Casual', price: 139.99, stock: 'Low Stock' },
];

const productsPerPage = 5;
let currentPage = 1;
let editSKU = null;

const tbody = document.getElementById('productsTbody');
const searchInput = document.getElementById('searchInput');
const prevBtn = document.getElementById('prevPage');
const nextBtn = document.getElementById('nextPage');
const pageInfo = document.getElementById('pageInfo');

// Modal elements
const modal = document.getElementById('addProductModal');
const modalTitle = modal.querySelector('h2');
const closeModalBtn = document.getElementById('modalCloseBtn');
const addProductForm = document.getElementById('addProductForm');
const submitBtn = addProductForm.querySelector('button[type="submit"]');

function getStockBadgeClass(stock) {
  switch (stock.toLowerCase()) {
    case 'in stock':
      return 'instock';
    case 'low stock':
      return 'lowstock';
    case 'out of stock':
      return 'outofstock';
    default:
      return '';
  }
}

function renderTable(data, page = 1) {
  tbody.innerHTML = '';
  const start = (page - 1) * productsPerPage;
  const end = start + productsPerPage;
  const pageData = data.slice(start, end);

  if (pageData.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:20px;">No products found.</td></tr>';
    return;
  }

  pageData.forEach(product => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${product.sku}</td>
      <td>${product.name}</td>
      <td>${product.category}</td>
      <td>$${product.price.toFixed(2)}</td>
      <td><span class="badge ${getStockBadgeClass(product.stock)}">${product.stock}</span></td>
      <td><button class="action-btn edit-btn" data-sku="${product.sku}">Edit</button></td>
    `;
    tbody.appendChild(tr);
  });

  pageInfo.textContent = `Page ${page} of ${Math.ceil(data.length / productsPerPage)}`;

  prevBtn.disabled = page === 1;
  nextBtn.disabled = page === Math.ceil(data.length / productsPerPage);
}

function filterProducts() {
  const term = searchInput.value.trim().toLowerCase();
  const filtered = productsData.filter(product =>
    product.name.toLowerCase().includes(term) ||
    product.sku.toLowerCase().includes(term)
  );
  currentPage = 1;
  renderTable(filtered, currentPage);
  return filtered;
}

searchInput.addEventListener('input', () => {
  filterProducts();
});

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    const filtered = filterProducts();
    renderTable(filtered, currentPage);
  }
});

nextBtn.addEventListener('click', () => {
  const filtered = filterProducts();
  if (currentPage < Math.ceil(filtered.length / productsPerPage)) {
    currentPage++;
    renderTable(filtered, currentPage);
  }
});

// Modal handling
document.addEventListener('click', e => {
  if (e.target.classList.contains('edit-btn')) {
    const sku = e.target.dataset.sku;
    const product = productsData.find(p => p.sku === sku);
    if (product) {
      openEditModal(product);
    }
  }
});

function openEditModal(product) {
  modal.style.display = 'block';
  modalTitle.textContent = 'Edit Product';
  submitBtn.textContent = 'Save Changes';
  editSKU = product.sku;

  addProductForm.sku.value = product.sku;
  addProductForm.name.value = product.name;
  addProductForm.category.value = product.category;
  addProductForm.price.value = product.price;
  addProductForm.stock.value = product.stock;

  addProductForm.sku.disabled = true;
}

function closeModal() {
  modal.style.display = 'none';
  addProductForm.reset();
  editSKU = null;
  addProductForm.sku.disabled = false;
}

closeModalBtn.addEventListener('click', closeModal);
window.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});

// Submit form
addProductForm.addEventListener('submit', e => {
  e.preventDefault();

  const formData = {
    sku: addProductForm.sku.value.trim(),
    name: addProductForm.name.value.trim(),
    category: addProductForm.category.value.trim(),
    price: parseFloat(addProductForm.price.value),
    stock: addProductForm.stock.value.trim(),
  };

  if (!formData.sku || !formData.name || isNaN(formData.price)) {
    alert('Please fill all required fields.');
    return;
  }

  if (editSKU) {
    const index = productsData.findIndex(p => p.sku === editSKU);
    if (index !== -1) {
      productsData[index] = { ...formData };
    }
  }

  closeModal();
  renderTable(filterProducts(), currentPage);
});

// Initial render
renderTable(productsData, currentPage);


// Existing product data and pagination code...



function openModal() {
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
  addProductForm.reset();
}

addProductBtn.addEventListener('click', openModal);
modalCloseBtn.addEventListener('click', closeModal);

// Close modal if clicking outside modal content
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Add product form submit handler
addProductForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Collect form data
  const newProduct = {
    sku: addProductForm.sku.value.trim(),
    name: addProductForm.name.value.trim(),
    category: addProductForm.category.value.trim(),
    price: parseFloat(addProductForm.price.value),
    stock: addProductForm.stock.value,
  };

  // Basic validation (you can enhance this)
  if (!newProduct.sku || !newProduct.name || !newProduct.category || isNaN(newProduct.price)) {
    alert('Please fill all fields correctly.');
    return;
  }

  // Check for duplicate SKU
  if (productsData.some(p => p.sku.toLowerCase() === newProduct.sku.toLowerCase())) {
    alert('SKU already exists. Please use a unique SKU.');
    return;
  }

  // Add product to data array
  productsData.push(newProduct);

  // Close modal and reset form
  closeModal();

  // Refresh filtered and paginated table
  currentPage = Math.ceil(productsData.length / productsPerPage);
  renderTable(productsData, currentPage);
  searchInput.value = '';
});
