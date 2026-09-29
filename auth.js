// auth.js
// KALI LIFE ECOSYSTEM - Session, Role & Dashboard Management
// Version: 3.0 | Role-Based Access Control

"use strict";

/* ================================
   ROLE DEFINITIONS
================================ */
const ADMIN_ROLES = [
    "Super Admin",
    "Core Admin",
    "Departmental Admin",
    "Admin"
];

const ROLE_DASHBOARD = {
    "Super Admin": "super-admin-dashboard.html",
    "Core Admin": "core-admin-dashboard.html",
    "Departmental Admin": "dept-admin-dashboard.html",
    "Admin": "admin-dashboard.html",
    "User": "dashboard.html"
};

/* ================================
   CREATE LOGIN SESSION
================================ */
function createSession(data) {
    const session = {
        name: data?.name || "User",
        mobile: data?.mobile || "",
        email: data?.email || "",
        role: (data?.role || "User").trim(),
        uid: data?.uid || "",
        adminId: data?.adminId || "",
        reportsTo: data?.reportsTo || "",
        department: data?.department || "",
        createdAt: Date.now()
    };

    localStorage.setItem("kaliLifeSession", JSON.stringify(session));

    // Backward-compatible keys
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userUid", session.uid);
    localStorage.setItem("userMobile", session.mobile);
    localStorage.setItem("userName", session.name);
    localStorage.setItem("userRole", session.role);

    return session;
}

/* ================================
   GET LOGIN SESSION
================================ */
function getSession() {
    try {
        const saved = localStorage.getItem("kaliLifeSession");
        if (saved) return JSON.parse(saved);
    } catch (e) {
        console.error("Session read error:", e);
    }

    // Old format support
    if (localStorage.getItem("isLoggedIn") === "true") {
        return {
            name: localStorage.getItem("userName") || "",
            mobile: localStorage.getItem("userMobile") || "",
            email: "",
            role: localStorage.getItem("userRole") || "User",
            uid: localStorage.getItem("userUid") || "",
            adminId: "",
            reportsTo: "",
            department: ""
        };
    }

    return null;
}

/* ================================
   HELPERS
================================ */
function isUserLoggedIn() {
    return localStorage.getItem("isLoggedIn") === "true" && getSession() !== null;
}

function getRole() {
    const session = getSession();
    return String(session?.role || "User").trim();
}

function isAdminRole(role) {
    const r = role || getRole();
    return ADMIN_ROLES.includes(r);
}

/* ================================
   CHECK LOGIN (call on protected pages)
================================ */
function checkLogin() {
    if (!isUserLoggedIn()) {
        alert("Please login first.");
        window.location.replace("login.html");
        return false;
    }
    return true;
}

/* ================================
   CHECK ROLE
   Usage: checkRole("Super Admin")
          checkRole(["Super Admin", "Core Admin"])
================================ */
function checkRole(allowedRoles) {
    if (!checkLogin()) return false;

    const currentRole = getRole();
    const allowed = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

    if (!allowed.includes(currentRole)) {
        alert("Access Denied! You do not have permission to view this page.");
        redirectToDashboard();
        return false;
    }
    return true;
}

/* ================================
   REDIRECT TO CORRECT DASHBOARD
================================ */
function redirectToDashboard() {
    const role = getRole();
    const target = ROLE_DASHBOARD[role] || "dashboard.html";
    window.location.replace(target);
}

/* ================================
   LOGOUT
================================ */
function logoutUser() {
    localStorage.removeItem("kaliLifeSession");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userUid");
    localStorage.removeItem("userMobile");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");

    window.location.replace("login.html");
}

/* ================================
   GLOBAL ACCESS
================================ */
window.createSession = createSession;
window.getSession = getSession;
window.isUserLoggedIn = isUserLoggedIn;
window.getRole = getRole;
window.isAdminRole = isAdminRole;
window.checkLogin = checkLogin;
window.checkRole = checkRole;
window.redirectToDashboard = redirectToDashboard;
window.logoutUser = logoutUser;
window.ADMIN_ROLES = ADMIN_ROLES;
window.ROLE_DASHBOARD = ROLE_DASHBOARD;
