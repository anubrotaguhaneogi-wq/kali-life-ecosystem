// auth.js
// KALI LIFE ECOSYSTEM - Session & Dashboard Management

"use strict";

/* ================================
   CREATE LOGIN SESSION
================================ */
function createSession(data) {
    const session = {
        name: data?.name || "User",
        mobile: data?.mobile || "",
        email: data?.email || "",
        role: data?.role || "User",
        uid: data?.uid || "",
        adminId: data?.adminId || "",
        reportsTo: data?.reportsTo || "",
        createdAt: Date.now()
    };

    // Main session
    localStorage.setItem(
        "kaliLifeSession",
        JSON.stringify(session)
    );

    // Backward-compatible login data
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
        const savedSession = localStorage.getItem("kaliLifeSession");

        if (savedSession) {
            return JSON.parse(savedSession);
        }
    } catch (error) {
        console.error("Session read error:", error);
    }

    // Old session format support
    if (localStorage.getItem("isLoggedIn") === "true") {
        return {
            name: localStorage.getItem("userName") || "",
            mobile: localStorage.getItem("userMobile") || "",
            email: "",
            role: localStorage.getItem("userRole") || "User",
            uid: localStorage.getItem("userUid") || "",
            adminId: "",
            reportsTo: ""
        };
    }

    return null;
}


/* ================================
   CHECK LOGIN
================================ */
function isUserLoggedIn() {
    return localStorage.getItem("isLoggedIn") === "true";
}


/* ================================
   REDIRECT TO CORRECT DASHBOARD
================================ */
function redirectToDashboard() {

    const session = getSession();

    const role = String(
        session?.role || "User"
    ).trim();

    // Admin roles
    if (
        role === "Super Admin" ||
        role === "Core Admin" ||
        role === "Departmental Admin" ||
        role === "Admin"
    ) {
        window.location.replace("admin-dashboard.html");
        return;
    }

    // Normal customer/user
    window.location.replace("dashboard.html");
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
window.redirectToDashboard = redirectToDashboard;
window.logoutUser = logoutUser;
