// ======================================================
// KALI LIFE ECOSYSTEM
// GENERAL USER AUTHENTICATION
// Mobile Number + Firebase Authentication
// ======================================================


// ======================================================
// FIREBASE IMPORTS
// ======================================================

import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


// ======================================================
// FIREBASE CONFIGURATION
// Same configuration used by register.html
// ======================================================

const firebaseConfig = {

  apiKey:
    "AIzaSyDqXcxTrI22Ju1Rj9mtbUSCjGkT7B_OxZo",

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


// ======================================================
// FIREBASE INITIALIZE
// ======================================================

const app =
  initializeApp(firebaseConfig);

const auth =
  getAuth(app);

const db =
  getFirestore(app);


// ======================================================
// NORMALIZE MOBILE
// ======================================================

function normalizeMobile(value) {

  let mobile =
    String(value || "")
      .trim()
      .replace(/\D/g, "");

  // Convert +91XXXXXXXXXX to XXXXXXXXXX
  if (
    mobile.startsWith("91") &&
    mobile.length === 12
  ) {

    mobile =
      mobile.substring(2);

  }

  return mobile;

}


// ======================================================
// FIND USER BY MOBILE
// ======================================================

async function findUserByMobile(mobile) {

  const usersRef =
    collection(db, "users");

  const snapshot =
    await getDocs(usersRef);

  for (
    const userDoc of snapshot.docs
  ) {

    const data =
      userDoc.data();

    if (!data.mobile) {
      continue;
    }

    const storedMobile =
      normalizeMobile(
        data.mobile
      );

    if (
      storedMobile === mobile
    ) {

      return {
        id: userDoc.id,
        ...data
      };

    }

  }

  return null;

}


// ======================================================
// SAVE USER SESSION
// ======================================================

function saveUserSession(
  userData,
  firebaseUser
) {

  const name =
    userData.name ||
    firebaseUser.displayName ||
    "";

  const mobile =
    normalizeMobile(
      userData.mobile || ""
    );

  const email =
    userData.email ||
    firebaseUser.email ||
    "";

  const role =
    userData.role ||
    "User";

  const status =
    userData.status ||
    "Active";


  // ----------------------------------------------------
  // CURRENT DASHBOARD SESSION
  // ----------------------------------------------------

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
    email
  );

  localStorage.setItem(
    "userRole",
    role
  );

  localStorage.setItem(
    "userStatus",
    status
  );


  // ----------------------------------------------------
  // COMPATIBILITY SESSION
  // Keeps older KALI USER pages working
  // ----------------------------------------------------

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

}


// ======================================================
// CLEAR USER SESSION
// ======================================================

function clearUserSession() {

  // Current session
  localStorage.removeItem(
    "isLoggedIn"
  );

  localStorage.removeItem(
    "userUid"
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
    "userRole"
  );

  localStorage.removeItem(
    "userStatus"
  );


  // Older session
  localStorage.removeItem(
    "kaliUserLoggedIn"
  );

  localStorage.removeItem(
    "kaliUserId"
  );

  localStorage.removeItem(
    "kaliUserMobile"
  );

  localStorage.removeItem(
    "kaliUserName"
  );

  localStorage.removeItem(
    "kaliUserRole"
  );

  localStorage.removeItem(
    "kaliUserStatus"
  );

}


// ======================================================
// LOGIN FORM
// ======================================================

const loginForm =
  document.getElementById(
    "loginForm"
  );

const message =
  document.getElementById(
    "message"
  );


if (loginForm) {

  loginForm.addEventListener(
    "submit",
    async function (event) {

      event.preventDefault();


      // ------------------------------------------------
      // GET INPUT
      // ------------------------------------------------

      const mobileInput =
        document.getElementById(
          "mobile"
        ).value;

      const passwordInput =
        document.getElementById(
          "password"
        ).value;


      const mobile =
        normalizeMobile(
          mobileInput
        );


      // ------------------------------------------------
      // CLEAR MESSAGE
      // ------------------------------------------------

      message.textContent = "";

      message.style.color =
        "#d00";


      // ------------------------------------------------
      // MOBILE VALIDATION
      // ------------------------------------------------

      if (
        !/^\d{10}$/.test(mobile)
      ) {

        message.textContent =
          "Please enter a valid 10-digit mobile number.";

        return;

      }


      // ------------------------------------------------
      // PASSWORD VALIDATION
      // ------------------------------------------------

      if (!passwordInput) {

        message.textContent =
          "Please enter your password.";

        return;

      }


      message.style.color =
        "#555";

      message.textContent =
        "Checking account...";


      try {

        // ----------------------------------------------
        // FIND FIRESTORE USER PROFILE
        // ----------------------------------------------

        const user =
          await findUserByMobile(
            mobile
          );


        if (!user) {

          message.style.color =
            "#d00";

          message.textContent =
            "Mobile number not found.";

          return;

        }


        // ----------------------------------------------
        // STATUS CHECK
        // ----------------------------------------------

        const status =
          String(
            user.status ||
            "Active"
          )
          .trim()
          .toLowerCase();


        if (
          status === "blocked"
        ) {

          message.style.color =
            "#d00";

          message.textContent =
            "This account is blocked.";

          return;

        }


        // ----------------------------------------------
        // EMAIL REQUIRED
        // Firebase Authentication uses email/password
        // ----------------------------------------------

        const email =
          String(
            user.email || ""
          )
          .trim()
          .toLowerCase();


        if (!email) {

          message.style.color =
            "#d00";

          message.textContent =
            "This account needs to be migrated to secure login.";

          return;

        }


        // ----------------------------------------------
        // FIREBASE AUTH LOGIN
        // ----------------------------------------------

        message.style.color =
          "#555";

        message.textContent =
          "Signing in securely...";


        const userCredential =
          await signInWithEmailAndPassword(
            auth,
            email,
            passwordInput
          );


        const firebaseUser =
          userCredential.user;


        // ----------------------------------------------
        // UID CHECK
        // ----------------------------------------------

        if (
          user.uid &&
          String(user.uid) !==
          String(firebaseUser.uid)
        ) {

          await signOut(auth);

          message.style.color =
            "#d00";

          message.textContent =
            "Account security verification failed.";

          return;

        }


        // ----------------------------------------------
        // SAVE SESSION
        // ----------------------------------------------

        saveUserSession(
          user,
          firebaseUser
        );


        // ----------------------------------------------
        // SUCCESS
        // ----------------------------------------------

        message.style.color =
          "green";

        message.textContent =
          "Login successful. Opening system...";


        setTimeout(
          function () {

            window.location.href =
              "dashboard.html";

          },
          500
        );


      } catch (error) {

        console.error(
          "GENERAL USER LOGIN ERROR:",
          error
        );


        message.style.color =
          "#d00";


        // ----------------------------------------------
        // FIREBASE ERROR HANDLING
        // ----------------------------------------------

        if (
          error.code ===
          "auth/invalid-credential"
        ) {

          message.textContent =
            "Incorrect password or login information.";

        }

        else if (
          error.code ===
          "auth/wrong-password"
        ) {

          message.textContent =
            "Incorrect password.";

        }

        else if (
          error.code ===
          "auth/user-not-found"
        ) {

          message.textContent =
            "Firebase account not found.";

        }

        else if (
          error.code ===
          "auth/user-disabled"
        ) {

          message.textContent =
            "This account has been disabled.";

        }

        else if (
          error.code ===
          "auth/too-many-requests"
        ) {

          message.textContent =
            "Too many login attempts. Please try again later.";

        }

        else {

          message.textContent =
            "Login failed. Please try again.";

        }

      }

    }
  );

}


// ======================================================
// CHECK LOGIN
// ======================================================

function checkLogin() {

  const loggedIn =
    localStorage.getItem(
      "isLoggedIn"
    );

  const uid =
    localStorage.getItem(
      "userUid"
    );


  if (
    loggedIn !== "true" ||
    !uid
  ) {

    window.location.href =
      "login.html";

    return false;

  }


  return true;

}


// ======================================================
// GET CURRENT USER
// ======================================================

function getCurrentUser() {

  const loggedIn =
    localStorage.getItem(
      "isLoggedIn"
    );


  if (
    loggedIn !== "true"
  ) {

    return null;

  }


  return {

    uid:
      localStorage.getItem(
        "userUid"
      ) || "",

    name:
      localStorage.getItem(
        "userName"
      ) || "",

    mobile:
      localStorage.getItem(
        "userMobile"
      ) || "",

    email:
      localStorage.getItem(
        "userEmail"
      ) || "",

    role:
      localStorage.getItem(
        "userRole"
      ) || "User",

    status:
      localStorage.getItem(
        "userStatus"
      ) || "Active"

  };

}


// ======================================================
// CHECK ADMIN ACCESS
// ======================================================

function checkAdminAccess() {

  const user =
    getCurrentUser();


  if (!user) {

    window.location.href =
      "login.html";

    return false;

  }


  const role =
    String(
      user.role || ""
    )
    .trim()
    .toLowerCase();


  if (
    !role ||
    role === "user"
  ) {

    alert(
      "Admin access required."
    );

    window.location.href =
      "dashboard.html";

    return false;

  }


  if (
    String(
      user.status || ""
    )
    .trim()
    .toLowerCase() ===
    "blocked"
  ) {

    alert(
      "Your account is blocked."
    );

    clearUserSession();

    window.location.href =
      "login.html";

    return false;

  }


  return true;

}


// ======================================================
// LOGOUT
// ======================================================

async function logout() {

  try {

    await signOut(
      auth
    );

  }

  catch (error) {

    console.error(
      "Firebase logout error:",
      error
    );

  }


  clearUserSession();


  window.location.href =
    "login.html";

}


// ======================================================
// GLOBAL FUNCTIONS
// ======================================================

window.checkLogin =
  checkLogin;

window.getCurrentUser =
  getCurrentUser;

window.checkAdminAccess =
  checkAdminAccess;

window.logout =
  logout;

window.logoutUser =
  logout;


// ======================================================
// EXPORT FUNCTIONS
// ======================================================

export {

  checkLogin,

  getCurrentUser,

  checkAdminAccess,

  logout,

  findUserByMobile,

  normalizeMobile

};
