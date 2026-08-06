// ==========================================
// KALI LIFE ECOSYSTEM
// Authentication & Security System
// Version 2.0
// ==========================================

// ----------------------------
// Check Login Status
// ----------------------------
function checkLogin() {

    if (localStorage.getItem("isLoggedIn") !== "true") {

        alert("Please Login First!");

        window.location.href = "admin.html";

        return;
    }

}

// ----------------------------
// Check User Role
// ----------------------------
function checkRole(role) {

    let currentRole = localStorage.getItem("userRole");

    if (currentRole !== role) {

        alert("Access Denied!");

        window.location.href = "admin.html";

        return;
    }

}

// ----------------------------
// Login Status
// ----------------------------
let isLoggedIn = false;

// ----------------------------
// Login Function
// ----------------------------
function login() {

    let username =
        document.getElementById("username").value.trim();

    let password =
        document.getElementById("password").value.trim();

    // Temporary Master Login

    if (username === "admin" && password === "12345") {

        isLoggedIn = true;

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "Super Admin");
        localStorage.setItem("userName", "Master Admin");
        localStorage.setItem("userMobile", "0000000000");

        alert("Super Admin Login Successful!");

        window.location.href = "super-admin-dashboard.html";

        return;

    }

    // Admin List

    let admins =
        JSON.parse(localStorage.getItem("admins")) || [];

    let admin =
        admins.find(item =>
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

        return;

    }

    alert("Invalid Mobile Number or Password!");

}// ----------------------------
// Logout Function
// ----------------------------
function logout() {

    isLoggedIn = false;

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("userMobile");

    alert("Logout Successful!");

    window.location.href = "admin.html";

}

// ----------------------------
// Get Current User
// ----------------------------
function getCurrentUser() {

    return {
        name: localStorage.getItem("userName"),
        role: localStorage.getItem("userRole"),
        mobile: localStorage.getItem("userMobile")
    };

}
