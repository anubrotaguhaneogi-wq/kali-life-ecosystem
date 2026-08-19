<!DOCTYPE html>
<html lang="bn">

<head>

<meta charset="UTF-8">

<meta name="viewport"
      content="width=device-width, initial-scale=1.0">

<title>Admin Login - KALI LIFE ECOSYSTEM</title>

<style>

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
}

body {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;

    background:
        linear-gradient(
            135deg,
            #064e3b,
            #166534,
            #0f172a
        );
}

.login-box {
    width: 100%;
    max-width: 430px;
    background: #ffffff;
    padding: 32px;
    border-radius: 20px;

    box-shadow:
        0 20px 50px
        rgba(0,0,0,0.28);

    text-align: center;
}

.logo {
    color: #166534;
    font-size: 28px;
    font-weight: bold;
}

.subtitle {
    margin-top: 6px;
    color: #64748b;
    font-size: 13px;
}

.login-title {
    margin-top: 25px;
    margin-bottom: 22px;
    color: #0f172a;
    font-size: 22px;
}

.form-group {
    text-align: left;
    margin-bottom: 17px;
}

label {
    display: block;
    margin-bottom: 7px;
    color: #334155;
    font-size: 14px;
    font-weight: bold;
}

input {
    width: 100%;
    padding: 14px;

    border:
        1px solid #cbd5e1;

    border-radius: 9px;

    background: #ffffff;
    color: #0f172a;
    font-size: 15px;
    outline: none;
}

input:focus {
    border-color: #16a34a;

    box-shadow:
        0 0 0 3px
        rgba(22,163,74,0.12);
}

.password-box {
    position: relative;
}

.password-box input {
    padding-right: 70px;
}

.show-password {
    position: absolute;
    right: 10px;
    top: 50%;

    transform:
        translateY(-50%);

    border: none;
    background: transparent;
    color: #166534;

    font-size: 13px;
    font-weight: bold;
    cursor: pointer;
}

.login-btn {
    width: 100%;
    padding: 14px;
    margin-top: 5px;

    border: none;
    border-radius: 9px;

    background: #16a34a;
    color: #ffffff;

    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
}

.login-btn:disabled {
    background: #94a3b8;
    cursor: not-allowed;
}

#error {
    min-height: 20px;
    margin-top: 13px;

    color: #dc2626;
    font-size: 14px;
    font-weight: bold;
}

.success {
    color: #166534 !important;
}

.security-box {
    margin-top: 20px;
    padding: 11px;

    border-radius: 8px;

    background: #f0fdf4;
    color: #166534;

    font-size: 12px;
    line-height: 1.5;
}

.back-btn {
    display: block;
    margin-top: 18px;

    color: #166534;
    text-decoration: none;

    font-size: 14px;
    font-weight: bold;
}

.footer {
    margin-top: 18px;
    color: #94a3b8;
    font-size: 11px;
}

@media (max-width: 500px) {

    body {
        padding: 12px;
    }

    .login-box {
        padding: 25px 20px;
        border-radius: 16px;
    }

    .logo {
        font-size: 24px;
    }

    .login-title {
        font-size: 20px;
    }

}

</style>

</head>


<body>


<div class="login-box">


    <div class="logo">
        KALI LIFE ECOSYSTEM
    </div>


    <div class="subtitle">
        Administration & Management System
    </div>


    <h2 class="login-title">
        🔐 Admin Login
    </h2>


    <!-- EMAIL -->

    <div class="form-group">

        <label for="email">
            Admin Email ID
        </label>

        <input
            type="email"
            id="email"
            placeholder="Enter Admin Email ID"
            autocomplete="username">

    </div>


    <!-- PASSWORD -->

    <div class="form-group">

        <label for="password">
            Password
        </label>

        <div class="password-box">

            <input
                type="password"
                id="password"
                placeholder="Enter Admin Password"
                autocomplete="current-password">

            <button
                type="button"
                class="show-password"
                id="showPasswordBtn">

                Show

            </button>

        </div>

    </div>


    <!-- LOGIN -->

    <button
        type="button"
        class="login-btn"
        id="loginBtn">

        Login

    </button>


    <p id="error"></p>


    <div class="security-box">

        🔐 Authorized Admin Access Only

        <br>

        Admin Email ID and Password are required.

    </div>


    <a
        href="index.html"
        class="back-btn">

        ⬅ Back to Home

    </a>


    <div class="footer">

        © KALI LIFE ECOSYSTEM -
        Admin Management System

    </div>


</div>


<!-- ======================================================
     FIREBASE
====================================================== -->

<script type="module">


import {
    initializeApp
} from
"https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";


import {
    getAuth,
    signInWithEmailAndPassword,
    signOut
} from
"https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";


import {
    getFirestore,
    doc,
    getDoc
} from
"https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


/* ======================================================
   FIREBASE CONFIG
====================================================== */

const firebaseConfig = {

    apiKey:
        "AIzaSyDqXcxTrI22JuR1j9mtbUSCjGkT7B_OxZo",

    authDomain:
        "kali-life-ecosystem.firebaseapp.com",

    projectId:
        "kali-life-ecosystem",

    storageBucket:
        "kali-life-ecosystem.firebasestorage.app",

    messagingSenderId:
        "734170546737",

    appId:
        "1:734170546737:web:26f79e1b4b19ebabfe0b10",

    measurementId:
        "G-LBEY0W7RX3"

};


/* ======================================================
   FIREBASE INITIALIZATION
====================================================== */

const app =
    initializeApp(
        firebaseConfig
    );


const auth =
    getAuth(
        app
    );


const db =
    getFirestore(
        app
    );


/* ======================================================
   ELEMENTS
====================================================== */

const emailInput =
    document.getElementById(
        "email"
    );

const passwordInput =
    document.getElementById(
        "password"
    );

const showPasswordBtn =
    document.getElementById(
        "showPasswordBtn"
    );

const loginBtn =
    document.getElementById(
        "loginBtn"
    );

const errorBox =
    document.getElementById(
        "error"
    );


/* ======================================================
   SHOW / HIDE PASSWORD
====================================================== */

showPasswordBtn.addEventListener(
    "click",
    function () {

        if (
            passwordInput.type ===
            "password"
        ) {

            passwordInput.type =
                "text";

            showPasswordBtn.textContent =
                "Hide";

        } else {

            passwordInput.type =
                "password";

            showPasswordBtn.textContent =
                "Show";

        }

    }
);


/* ======================================================
   MESSAGE
====================================================== */

function showError(
    message
) {

    errorBox.className = "";

    errorBox.textContent =
        message;

}


function showSuccess(
    message
) {

    errorBox.className =
        "success";

    errorBox.textContent =
        message;

}


/* ======================================================
   SAVE ADMIN SESSION
   Compatible with auth.js
====================================================== */

function saveAdminSession(
    userData,
    firebaseUser,
    role,
    status,
    email
) {

    const name =
        userData.name || "";

    const mobile =
        userData.mobile || "";


    /* --------------------------------------------------
       MAIN SESSION
    -------------------------------------------------- */

    localStorage.setItem(
        "isLoggedIn",
        "true"
    );

    localStorage.setItem(
        "userUid",
        firebaseUser.uid
    );

    localStorage.setItem(
        "userName",
        name
    );

    localStorage.setItem(
        "userMobile",
        mobile
    );

    localStorage.setItem(
        "userEmail",
        userData.email || email
    );

    localStorage.setItem(
        "userRole",
        role
    );

    localStorage.setItem(
        "userStatus",
        status
    );


    /* --------------------------------------------------
       KALI COMPATIBILITY SESSION
    -------------------------------------------------- */

    localStorage.setItem(
        "kaliUserLoggedIn",
        "true"
    );

    localStorage.setItem(
        "kaliUserId",
        firebaseUser.uid
    );

    localStorage.setItem(
        "kaliUserMobile",
        mobile
    );

    localStorage.setItem(
        "kaliUserName",
        name
    );

    localStorage.setItem(
        "kaliUserRole",
        role
    );

    localStorage.setItem(
        "kaliUserStatus",
        status
    );


    /* --------------------------------------------------
       ADMIN-SPECIFIC SESSION
    -------------------------------------------------- */

    sessionStorage.setItem(
        "adminName",
        name
    );

    sessionStorage.setItem(
        "adminEmail",
        userData.email || email
    );

    sessionStorage.setItem(
        "adminRole",
        role
    );

    sessionStorage.setItem(
        "adminDepartment",
        userData.department || ""
    );

}


/* ======================================================
   LOGIN
====================================================== */

async function login() {

    errorBox.textContent =
        "";

    errorBox.className =
        "";


    const email =
        emailInput.value
            .trim()
            .toLowerCase();

    const password =
        passwordInput.value;


    /* ==================================================
       VALIDATION
    ================================================== */

    if (!email) {

        showError(
            "Please enter Admin Email ID."
        );

        emailInput.focus();

        return;

    }


    if (!password) {

        showError(
            "Please enter Admin Password."
        );

        passwordInput.focus();

        return;

    }


    /* ==================================================
       LOADING
    ================================================== */

    loginBtn.disabled =
        true;

    loginBtn.textContent =
        "Logging in...";


    try {

        /* ==============================================
           FIREBASE AUTHENTICATION
        ============================================== */

        const credential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


        const user =
            credential.user;


        /* ==============================================
           FIRESTORE ADMIN PROFILE
        ============================================== */

        const userDoc =
            await getDoc(
                doc(
                    db,
                    "users",
                    user.uid
                )
            );


        if (
            !userDoc.exists()
        ) {

            await signOut(
                auth
            );

            showError(
                "Admin profile not found."
            );

            return;

        }


        const userData =
            userDoc.data();


        /* ==============================================
           ROLE CHECK
        ============================================== */

        const role =
            String(
                userData.role || ""
            )
            .trim();


        if (
            role !== "Admin" &&
            role !== "Super Admin"
        ) {

            await signOut(
                auth
            );

            showError(
                "Access denied. This account is not an Admin account."
            );

            return;

        }


        /* ==============================================
           STATUS CHECK
        ============================================== */

        const status =
            String(
                userData.status || "Active"
            )
            .trim()
            .toLowerCase();


        if (
            status !== "active"
        ) {

            await signOut(
                auth
            );

            showError(
                "This Admin account is inactive."
            );

            return;

        }


        /* ==============================================
           SAVE ADMIN SESSION
        ============================================== */

        saveAdminSession(
            userData,
            user,
            role,
            status,
            email
        );


        /* ==============================================
           SUCCESS
        ============================================== */

        showSuccess(
            "Login successful. Opening Admin Dashboard..."
        );


        /* ==============================================
           REDIRECT
        ============================================== */

        setTimeout(
            function () {

                if (
                    role ===
                    "Super Admin"
                ) {

                    window.location.href =
                        "super-admin-dashboard.html";

                } else {

                    window.location.href =
                        "admin-dashboard.html";

                }

            },
            500
        );


    } catch (error) {

        console.error(
            "ADMIN LOGIN ERROR:",
            error
        );


        if (
            error.code ===
            "auth/invalid-credential"
        ) {

            showError(
                "Incorrect Email ID or Password."
            );

        }

        else if (
            error.code ===
            "auth/user-not-found"
        ) {

            showError(
                "Admin account not found."
            );

        }

        else if (
            error.code ===
            "auth/wrong-password"
        ) {

            showError(
                "Incorrect Admin password."
            );

        }

        else if (
            error.code ===
            "auth/invalid-email"
        ) {

            showError(
                "Please enter a valid Email ID."
            );

        }

        else {

            showError(
                "ERROR: " +
                error.code +
                " | " +
                error.message
            );

        }

    }

    finally {

        loginBtn.disabled =
            false;

        loginBtn.textContent =
            "Login";

    }

}


/* ======================================================
   LOGIN BUTTON
====================================================== */

loginBtn.addEventListener(
    "click",
    login
);


/* ======================================================
   ENTER KEY
====================================================== */

passwordInput.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key ===
            "Enter"
        ) {

            login();

        }

    }
);


</script>


</body>

</html>
