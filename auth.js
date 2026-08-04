// ===============================
// KALI LIFE ECOSYSTEM
// Authentication & Security System
// Version 1.0
// ===============================
// Check Login Status
function checkLogin() {
    console.log("Authentication System Loaded");
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

    if (username === "admin" && password === "12345") {

        isLoggedIn = true;

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "Super Admin");
        localStorage.setItem("userName", "Admin");
        localStorage.setItem("userMobile", "6296107338");

        alert("Login Successful!");

        window.location.href = "super-admin-dashboard.html";

    } else {

        alert("Invalid Username or Password!");

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

    window.location.href = "admin-login.html";

}
