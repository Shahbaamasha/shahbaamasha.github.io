let users = [];

const storedUsers = localStorage.getItem('users');
if (storedUsers) {
    users = JSON.parse(storedUsers);
    renderUsers();
}

function updateLocalStorage() {
    localStorage.setItem('users', JSON.stringify(users));
}

function renderUsers() {
    const usersList = document.getElementById('users-list');
    usersList.innerHTML = '';
    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.userLastName}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td class="${user.connected ? "connect" : "disconnect"}">${user.connected ? "מחובר" : "לא מחובר"}</td>
            <td>
                <button class="edit" onclick="editUser(${index})">עריכה</button>
                <button class="delete" onclick="deleteUser(${index})">מחיקה</button>
                ${user.connected ? `<button class="logout" onclick="logoutUser(${index})">התנתק</button>` : ''}
            </td>
        `;
        usersList.appendChild(row);
    });
}

function registerUser(username, userLastName, email, password) {
    users.push({ username, userLastName, email, password, connected: false });
    renderUsers();
    updateLocalStorage();
}

function deleteUser(index) {
    users.splice(index, 1);
    renderUsers();
    updateLocalStorage();
}

function editUser(index) {
    const user = users[index];
    const newUsername = prompt('הכנס שם חדש:', user.username);
    if (newUsername !== null) {
        user.username = newUsername;
        renderUsers();
        updateLocalStorage();
    }
}

function loginUser(name, pass) {
    const user = users.find(user => user.username === name && user.password === pass);
    if (user) {
        user.connected = true;
        renderUsers();
        updateLocalStorage();
        document.getElementById('login-form').reset();
    } else {
        alert('שם משתמש או סיסמה לא נכונים');
    }
}

function logoutUser(index) {
    const user = users[index];
    user.connected = false;
    renderUsers();
    updateLocalStorage();
}

document.getElementById('registration-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const userLastName = document.getElementById('userLastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    registerUser(username, userLastName, email, password);
    this.reset();
});


document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    loginUser(username, password);
    this.reset();
});
