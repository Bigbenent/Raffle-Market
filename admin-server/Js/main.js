// Sidebar Toggle (Mobile)
const sidebar = document.getElementById('sidebar');
const sidebarToggleMobile = document.getElementById('sidebarToggleMobile');
const sidebarToggle = document.getElementById('sidebarToggle');

if (sidebarToggleMobile) {
  sidebarToggleMobile.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });
}

if (sidebarToggle) {
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });
}

// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const icon = themeToggle.querySelector('i');
  icon.classList.toggle('bi-moon');
  icon.classList.toggle('bi-brightness-high');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Remember Dark Mode Preference
window.addEventListener('DOMContentLoaded', () => {
  const savedMode = localStorage.getItem('darkMode') === 'true';
  if (savedMode) document.body.classList.add('dark-mode');
});

//  Js for user display

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchUser");
  const filterStatus = document.getElementById("filterStatus");
  const userList = document.getElementById("userList");
  const userCount = document.getElementById("userCount");
  const pagination = document.getElementById("pagination");
  const users = Array.from(userList.getElementsByClassName("user-card"));
  const perPage = 6;
  let currentPage = 1;

  function renderUsers() {
    let query = searchInput.value.toLowerCase();
    let status = filterStatus.value;
    let filtered = users.filter(user => {
      let name = user.querySelector("h6").textContent.toLowerCase();
      let username = user.querySelector("p").textContent.toLowerCase();
      let matchStatus = (status === "all" || user.dataset.status === status);
      return (name.includes(query) || username.includes(query)) && matchStatus;
    });

    userCount.textContent = filtered.length;

    let start = (currentPage - 1) * perPage;
    let end = start + perPage;
    users.forEach(u => u.style.display = "none");
    filtered.slice(start, end).forEach(u => u.style.display = "block");

    // Pagination
    pagination.innerHTML = "";
    let totalPages = Math.ceil(filtered.length / perPage);
    for (let i = 1; i <= totalPages; i++) {
      let li = document.createElement("li");
      li.className = `page-item ${i === currentPage ? 'active' : ''}`;
      li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
      li.addEventListener("click", e => {
        e.preventDefault();
        currentPage = i;
        renderUsers();
      });
      pagination.appendChild(li);
    }
  }

  searchInput.addEventListener("input", () => { currentPage = 1; renderUsers(); });
  filterStatus.addEventListener("change", () => { currentPage = 1; renderUsers(); });
  renderUsers();
});


// Search and filter
const searchInput = document.getElementById("searchDraw");
const filterSelect = document.getElementById("filterStatus");
const drawTable = document.getElementById("drawTable").getElementsByTagName("tbody")[0];

function filterTable() {
  const searchTerm = searchInput.value.toLowerCase();
  const filterValue = filterSelect.value.toLowerCase();
  const rows = drawTable.getElementsByTagName("tr");

  for (let row of rows) {
    const title = row.cells[2].textContent.toLowerCase();
    const status = row.cells[6].textContent.toLowerCase();
    const matchSearch = title.includes(searchTerm);
    const matchFilter = !filterValue || status.includes(filterValue);
    row.style.display = matchSearch && matchFilter ? "" : "none";
  }
}

searchInput.addEventListener("input", filterTable);
filterSelect.addEventListener("change", filterTable);

// paginator js

document.querySelectorAll(".pagination .page-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelectorAll(".pagination .page-item").forEach(item => item.classList.remove("active"));
    link.parentElement.classList.add("active");
    // Load new data dynamically here (AJAX/PHP)
  });
});


// Search Function
document.getElementById("searchTransaction").addEventListener("keyup", function() {
  let searchValue = this.value.toLowerCase();
  document.querySelectorAll("#transactionTable tbody tr").forEach(row => {
    let text = row.textContent.toLowerCase();
    row.style.display = text.includes(searchValue) ? "" : "none";
  });
});

// Filter by Status
document.getElementById("filterStatus").addEventListener("change", function() {
  let filter = this.value;
  document.querySelectorAll("#transactionTable tbody tr").forEach(row => {
    let status = row.getAttribute("data-status");
    row.style.display = (filter === "all" || filter === status) ? "" : "none";
  });
});

// Export to CSV
document.getElementById("exportCSV").addEventListener("click", function() {
  let rows = document.querySelectorAll("#transactionTable tr");
  let csv = [];
  rows.forEach(row => {
    let cols = row.querySelectorAll("td, th");
    let data = [];
    cols.forEach(col => data.push(col.innerText));
    csv.push(data.join(","));
  });

  let csvFile = new Blob([csv.join("\n")], { type: "text/csv" });
  let downloadLink = document.createElement("a");
  downloadLink.download = "transactions.csv";
  downloadLink.href = window.URL.createObjectURL(csvFile);
  downloadLink.click();
});

// support page js

