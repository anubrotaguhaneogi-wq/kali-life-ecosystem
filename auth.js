// ==========================================
// KALI LIFE ECOSYSTEM
// AUTHENTICATION & SESSION SYSTEM
// VERSION 1
//
// ROLES:
// 1. Super Admin
// 2. Admin
// 3. User
// ==========================================


// ==========================================
// LOGIN STATUS
// ==========================================

function isUserLoggedIn() {

    return (
        localStorage.getItem("isLoggedIn") === "true"
    );

}


// ==========================================
// CURRENT USER INFORMATION
// ==========================================

function getUserRole() {

    return (
        localStorage.getItem("userRole") || ""
    );

}


function getUserName() {

    return (
        localStorage.getItem("userName") ||
        "User"
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
// LOGIN PROTECTION
// ==========================================

function checkLogin() {

    if (!isUserLoggedIn()) {

        window.location.href =
            "login.html";

        return false;
    }

    return true;

}


// ==========================================
// USER LOGIN PROTECTION
// ==========================================

function checkUserLogin() {

    if (!isUserLoggedIn()) {

        window.location.href =
            "login.html";

        return false;
    }

    return true;

}


// ==========================================
// ADMIN ACCESS
// ==========================================

function checkAdminAccess() {

    if (!isUserLoggedIn()) {

        window.location.href =
            "login.html";

        return false;
    }


    const role =
        getUserRole();


    if (
        role !== "Super Admin" &&
        role !== "Admin"
    ) {

        alert(
            "Admin Access Required!"
        );

        redirectToDashboard();

        return false;
    }


    return true;

}


// ==========================================
// SUPER ADMIN ACCESS
// ==========================================

function checkSuperAdmin() {

    if (!isUserLoggedIn()) {

        window.location.href =
            "login.html";

        return false;
    }


    if (
        getUserRole() !==
        "Super Admin"
    ) {

        alert(
            "Super Admin Access Required!"
        );

        redirectToDashboard();

        return false;
    }


    return true;

}


// ==========================================
// ADMIN ACCESS
// SUPER ADMIN + ADMIN
// ==========================================

function checkAdminRole() {

    if (!isUserLoggedIn()) {

        window.location.href =
            "login.html";

        return false;
    }


    const role =
        getUserRole();


    if (
        role !== "Super Admin" &&
        role !== "Admin"
    ) {

        alert(
            "Admin Access Required!"
        );

        redirectToDashboard();

        return false;
    }


    return true;

}


// ==========================================
// CHECK EXACT ROLE
// ==========================================

function checkRole(requiredRole) {

    if (!isUserLoggedIn()) {

        window.location.href =
            "login.html";

        return false;
    }


    if (
        getUserRole() !==
        requiredRole
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

function checkAnyRole(
    allowedRoles
) {

    if (!isUserLoggedIn()) {

        window.location.href =
            "login.html";

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
// DASHBOARD ROUTING
// ==========================================

function redirectToDashboard() {

    const role =
        getUserRole();


    // SUPER ADMIN

    if (
        role === "Super Admin"
    ) {

        window.location.href =
            "super-admin-dashboard.html";

        return;
    }


    // ADMIN

    if (
        role === "Admin"
    ) {

        window.location.href =
            "admin-dashboard.html";

        return;
    }


    // NORMAL USER

    if (
        role === "User"
    ) {

        window.location.href =
            "dashboard.html";

        return;
    }


    // UNKNOWN ROLE

    localStorage.clear();

    window.location.href =
        "login.html";

}


// ==========================================
// CREATE LOGIN SESSION
// ==========================================

function createSession(
    userData
) {

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


    if (
        userData.uid
    ) {

        localStorage.setItem(
            "userUid",
            userData.uid
        );

    }


    if (
        userData.adminId
    ) {

        localStorage.setItem(
            "adminId",
            userData.adminId
        );

    }


    if (
        userData.reportsTo
    ) {

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


    window.location.href =
        "login.html";

}


// ==========================================
// USER LOGOUT
// ==========================================

function logoutUser() {

    logout();

}


// ==========================================
// CURRENT USER
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
// SESSION STATUS
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
// PREVENT UNAUTHORIZED ACCESS
// ==========================================

function preventUnauthorizedAccess() {

    if (!isUserLoggedIn()) {

        window.location.href =
            "login.html";

        return false;
    }

    return true;

}


// ==========================================
// CLEAR SESSION
// ==========================================

function clearSession() {

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

}


// ==========================================
// END OF AUTH SYSTEM
// ==========================================
