const users = [
  { id: 1, name: 'Jane Doe', email: 'jane@example.com', role: 'Admin', status: 'active' },
  { id: 2, name: 'John Smith', email: 'john@example.com', role: 'Editor', status: 'inactive' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'Viewer', status: 'active' },
  { id: 4, name: 'Bob Martin', email: 'bob@example.com', role: 'Editor', status: 'inactive' },
];

const tbody = document.getElementById('userTbody');
const searchInput = document.getElementById('searchUserInput');

function renderUsers(filteredUsers) {
  tbody.innerHTML = '';

  if (filteredUsers.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No users found.</td></tr>';
    return;
  }

  filteredUsers.forEach(user => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td><span class="badge ${user.status === 'active' ? 'active' : 'inactive'}">${user.status}</span></td>
      <td><button class="action-btn" onclick="editUser(${user.id})">Edit</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function editUser(id) {
  const user = users.find(u => u.id === id);
  if (user) {
    alert(`Editing user ${user.name}`);
    // You can expand this to open a modal or navigate to an edit form
  }
}

searchInput.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase();
  const filtered = users.filter(user =>
    user.name.toLowerCase().includes(term) ||
    user.email.toLowerCase().includes(term)
  );
  renderUsers(filtered);
});

// Initial render
renderUsers(users);
