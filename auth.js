// ==========================================
// KALI LIFE ECOSYSTEM
// AUTHENTICATION & SECURITY SYSTEM
// PREMIUM FINAL VERSION
// ==========================================

/*
    IMPORTANT:

    This file manages:
    - Login protection
    - Role protection
    - Session information
    - Logout
    - Current user information
    - Role-based dashboard routing

    NOTE:
    localStorage is suitable for the current
    development stage, but it is NOT a secure
    production authentication system.

    Production authentication should later use
    Firebase Authentication / server-side security.
*/


// ==========================================
// SESSION HELPERS
// ==========================================

function isUserLoggedIn() {

    return (
        localStorage.getItem("isLoggedIn") === "true"
    );

}


function getUserRole() {

    return (
        localStorage.getItem("userRole") || ""
    );

}


function getUserName() {

    return (
        localStorage.getItem("userName") ||
        "Administrator"
    );

}


function getUserMobile() {

    return (
        localStorage.getItem("userMobile") ||
        ""
    );

}


function getUserEmail() {

    return (
        localStorage.getItem("userEmail") ||
        ""
    );

}


function getAdminId() {

    return (
        localStorage.getItem("adminId") ||
        ""
    );

}


// ==========================================
// CHECK LOGIN STATUS
// ==========================================

function checkLogin() {

    if (!isUserLoggedIn()) {

        alert(
            "Please Login First!"
        );

        window.location.href =
            "admin.html";

        return false;
    }

    return true;

}


// ==========================================
// CHECK USER / ADMIN LOGIN
// ==========================================

function checkUserLogin() {

    if (!isUserLoggedIn()) {

        alert(
            "Please Login First!"
        );

        window.location.href =
            "login.html";

        return false;
    }

    return true;

}


// ==========================================
// CHECK EXACT ROLE
// ==========================================

function checkRole(requiredRole) {

    if (!isUserLoggedIn()) {

        alert(
            "Please Login First!"
        );

        window.location.href =
            "admin.html";

        return false;
    }


    const currentRole =
        getUserRole();


    if (
        currentRole !== requiredRole
    ) {

        alert(
            "Access Denied!"
        );

        redirectToDashboard();

        return false;
    }


    return true;

}


// ==========================================
// CHECK MULTIPLE ROLES
// ==========================================

function checkAnyRole(allowedRoles) {

    if (!isUserLoggedIn()) {

        alert(
            "Please Login First!"
        );

        window.location.href =
            "admin.html";

        return false;
    }


    const currentRole =
        getUserRole();


    if (
        !allowedRoles.includes(
            currentRole
        )
    ) {

        alert(
            "Access Denied!"
        );

        redirectToDashboard();

        return false;
    }


    return true;

}


// ==========================================
// ADMIN ACCESS
// ==========================================

function checkAdminAccess() {

    if (!isUserLoggedIn()) {

        alert(
            "Please Login First!"
        );

        window.location.href =
            "admin.html";

        return false;
    }


    const role =
        getUserRole();


    if (
        !role ||
        role === "User"
    ) {

        alert(
            "Admin Access Required!"
        );

        window.location.href =
            "dashboard.html";

        return false;
    }


    return true;

}


// ==========================================
// SUPER ADMIN ACCESS
// ==========================================

function checkSuperAdmin() {

    return checkRole(
        "Super Admin"
    );

}


// ==========================================
// CORE ADMIN ACCESS
// ==========================================

function checkCoreAdmin() {

    return checkRole(
        "Core Admin"
    );

}


// ==========================================
// ADMIN DASHBOARD REDIRECT
// ==========================================

function redirectToDashboard() {

    const role =
        getUserRole();


    if (
        role === "Super Admin"
    ) {

        window.location.href =
            "super-admin-dashboard.html";

        return;
    }


    if (
        role === "Core Admin"
    ) {

        window.location.href =
            "admin-dashboard.html";

        return;
    }


    if (
        role &&
        role !== "User"
    ) {

        window.location.href =
            "admin-dashboard.html";

        return;
    }


    if (
        role === "User"
    ) {

        window.location.href =
            "dashboard.html";

        return;
    }


    window.location.href =
        "admin.html";

}


// ==========================================
// SAVE LOGIN SESSION
// ==========================================

function createSession(userData) {

    localStorage.setItem(
        "isLoggedIn",
        "true"
    );


    localStorage.setItem(
        "userName",
        userData.name || ""
    );


    localStorage.setItem(
        "userMobile",
        userData.mobile || ""
    );


    localStorage.setItem(
        "userEmail",
        userData.email || ""
    );


    localStorage.setItem(
        "userRole",
        userData.role || "User"
    );


    if (userData.uid) {

        localStorage.setItem(
            "userUid",
            userData.uid
        );

    }


    if (userData.adminId) {

        localStorage.setItem(
            "adminId",
            userData.adminId
        );

    }


    if (userData.reportsTo) {

        localStorage.setItem(
            "adminReportsTo",
            userData.reportsTo
        );

    }

}


// ==========================================
// LOGOUT
// ==========================================

function logout() {

    /*
        Firebase logout is handled by the
        Firebase-enabled pages.

        This function clears the local session
        so existing admin pages remain protected.
    */


    localStorage.removeItem(
        "isLoggedIn"
    );

    localStorage.removeItem(
        "userUid"
    );

    localStorage.removeItem(
        "userRole"
    );

    localStorage.removeItem(
        "userName"
    );

    localStorage.removeItem(
        "userMobile"
    );

    localStorage.removeItem(
        "userEmail"
    );

    localStorage.removeItem(
        "adminId"
    );

    localStorage.removeItem(
        "adminReportsTo"
    );


    alert(
        "Logout Successful!"
    );


    window.location.href =
        "admin.html";

}


// ==========================================
// USER LOGOUT
// ==========================================

function logoutUser() {

    localStorage.removeItem(
        "isLoggedIn"
    );

    localStorage.removeItem(
        "userUid"
    );

    localStorage.removeItem(
        "userRole"
    );

    localStorage.removeItem(
        "userName"
    );

    localStorage.removeItem(
        "userMobile"
    );

    localStorage.removeItem(
        "userEmail"
    );

    localStorage.removeItem(
        "adminId"
    );

    localStorage.removeItem(
        "adminReportsTo"
    );


    alert(
        "Logout Successful!"
    );


    window.location.href =
        "login.html";

}


// ==========================================
// GET CURRENT USER
// ==========================================

function getCurrentUser() {

    return {

        isLoggedIn:
            isUserLoggedIn(),

        name:
            getUserName(),

        mobile:
            getUserMobile(),

        email:
            getUserEmail(),

        role:
            getUserRole(),

        adminId:
            getAdminId()

    };

}


// ==========================================
// CHECK CURRENT SESSION
// ==========================================

function getSessionStatus() {

    return {

        loggedIn:
            isUserLoggedIn(),

        role:
            getUserRole(),

        name:
            getUserName(),

        mobile:
            getUserMobile(),

        email:
            getUserEmail()

    };

}


// ==========================================
// PREVENT BACK-ACCESS AFTER LOGOUT
// ==========================================

function preventUnauthorizedAccess() {

    if (
        !isUserLoggedIn()
    ) {

        window.location.href =
            "admin.html";

        return false;
    }


    return true;

}


// ==========================================
// PAGE LOAD SECURITY CHECK
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
            Authentication is intentionally
            NOT forced automatically here.

            Individual pages decide whether they
            require:
            - checkLogin()
            - checkUserLogin()
            - checkAdminAccess()
            - checkRole()
            - checkAnyRole()
        */
    }
);


// ==========================================
// END OF AUTHENTICATION SYSTEM
// ==========================================
