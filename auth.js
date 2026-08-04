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

function checkRole(role) {
    console.log("Current Role:", role);
}
// Check User Login
let isLoggedIn = false;
// ===============================
// Login Function
// ===============================
function login(username, password) {

    // Super Admin Login
    if (username === "superadmin" && password === "123456") {

        isLoggedIn = true;

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "Super Admin");
        localStorage.setItem("username", username);

        alert("Login Successful!");

        window.location.href = "super-admin-dashboard.html";

    } else {

        alert("Invalid Username or Password!");

    }

}
