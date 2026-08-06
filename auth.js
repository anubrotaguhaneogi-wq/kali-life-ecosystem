// ===============================
// KALI LIFE ECOSYSTEM
// Authentication & Security System
// Version 1.0
// ===============================
// Check Login Status
function checkLogin() {
    if(localStorage.getItem("isLoggedIn")!=="true"){

alert("Please Login First!");

window.location.href="admin.html";

    }
}
// Check User Role

// ===============================
// Role Security Check
// ===============================
function checkRole(role) {

    let currentRole = localStorage.getItem("userRole");

    if (currentRole !== role) {

        alert("Access Denied!");

        window.location.href = "admin.html";

    }

}
// Check User Login
let isLoggedIn = false;
// ===============================
// Login Function
// ===============================
function login() {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
function login() {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "admin" && password === "12345") {

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "Super Admin");
        localStorage.setItem("userName", "Master Admin");

        window.location.href = "super-admin-dashboard.html";
        return;
    }

    let admins = JSON.parse(localStorage.getItem("admins")) || [];

    let admin = admins.find(item =>
        item.mobile === username &&
        item.password === password &&
        item.status === "Active"
    );
let admins = JSON.parse(localStorage.getItem("admins")) || [];

let admin = admins.find(item =>
    item.mobile === username &&
    item.password === password &&
    item.status === "Active"
);

if (admin) {

    isLoggedIn = true;

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", admin.role);
    localStorage.setItem("userName", admin.fullName);
    localStorage.setItem("userMobile", admin.mobile);

    alert("Login Successful!");

  if (admin.role === "Super Admin") {
    window.location.href = "super-admin-dashboard.html";
} else if (admin.role === "Core Admin") {
    window.location.href = "core-admin-dashboard.html";
} else {
    window.location.href = "department-admin-dashboard.html";
  }  

} else {

    alert("Invalid Mobile Number or Password!");

}

    }


// ===============================
// Logout Function
// ===============================
function logout() {

    isLoggedIn = false;

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("username");

    alert("Logout Successful!");

    window.location.href = "admin.html";

}
