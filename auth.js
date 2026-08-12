// ======================================================
// KALI LIFE ECOSYSTEM
// GENERAL USER LOGIN
// Mobile Number + Password
// ======================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";


// ======================================================
// FIREBASE CONFIG
// ======================================================
// আপনার পুরনো auth.js-এর firebaseConfig-এর আসল
// values এখানে বসান.
// ======================================================

const firebaseConfig = {
  apiKey: "YOUR_EXISTING_API_KEY",
  authDomain: "kali-life-ecosystem.firebaseapp.com",
  projectId: "kali-life-ecosystem",
  storageBucket: "YOUR_EXISTING_STORAGE_BUCKET",
  messagingSenderId: "YOUR_EXISTING_MESSAGING_SENDER_ID",
  appId: "YOUR_EXISTING_APP_ID"
};


// ======================================================
// FIREBASE INITIALIZE
// ======================================================

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// ======================================================
// MOBILE NORMALIZE
// ======================================================

function normalizeMobile(value) {

  let mobile = String(value || "")
    .trim()
    .replace(/\D/g, "");

  // +91XXXXXXXXXX
  if (mobile.startsWith("91") && mobile.length === 12) {
    mobile = mobile.substring(2);
  }

  return mobile;
}


// ======================================================
// FIND USER
// ======================================================

async function findUserByMobile(mobile) {

  const usersRef = collection(db, "users");

  const snapshot = await getDocs(usersRef);

  for (const userDoc of snapshot.docs) {

    const userData = userDoc.data();

    if (!userData.mobile) {
      continue;
    }

    const storedMobile =
      normalizeMobile(userData.mobile);

    if (storedMobile === mobile) {

      return {
        id: userDoc.id,
        ...userData
      };

    }
  }

  return null;
}


// ======================================================
// LOGIN FORM
// ======================================================

const loginForm =
  document.getElementById("loginForm");

const message =
  document.getElementById("message");


if (loginForm) {

  loginForm.addEventListener(
    "submit",
    async function (event) {

      event.preventDefault();


      // ------------------------------------------------
      // GET INPUT
      // ------------------------------------------------

      const mobileInput =
        document.getElementById("mobile").value;

      const passwordInput =
        document.getElementById("password").value;


      const mobile =
        normalizeMobile(mobileInput);


      // ------------------------------------------------
      // CLEAR MESSAGE
      // ------------------------------------------------

      message.textContent = "";
      message.style.color = "#d00";


      // ------------------------------------------------
      // MOBILE VALIDATION
      // ------------------------------------------------

      if (!/^\d{10}$/.test(mobile)) {

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


      message.style.color = "#555";

      message.textContent =
        "Checking login...";


      try {

        // ----------------------------------------------
        // FIND USER BY MOBILE
        // ----------------------------------------------

        const user =
          await findUserByMobile(mobile);


        if (!user) {

          message.style.color = "#d00";

          message.textContent =
            "Mobile number not found.";

          return;
        }


        // ----------------------------------------------
        // CHECK PASSWORD
        // ----------------------------------------------

        if (
          user.password === undefined ||
          user.password === null
        ) {

          message.style.color = "#d00";

          message.textContent =
            "Password information is missing.";

          return;
        }


        if (
          String(user.password) !==
          String(passwordInput)
        ) {

          message.style.color = "#d00";

          message.textContent =
            "Incorrect password.";

          return;
        }


        // ----------------------------------------------
        // ACCOUNT STATUS
        // ----------------------------------------------

        if (
          user.status &&
          String(user.status).toLowerCase() ===
          "blocked"
        ) {

          message.style.color = "#d00";

          message.textContent =
            "This account is blocked.";

          return;
        }


        // ----------------------------------------------
        // SAVE GENERAL USER SESSION
        // ----------------------------------------------

        localStorage.setItem(
          "kaliUserLoggedIn",
          "true"
        );

        localStorage.setItem(
          "kaliUserId",
          user.id
        );

        localStorage.setItem(
          "kaliUserMobile",
          mobile
        );

        localStorage.setItem(
          "kaliUserName",
          user.name || ""
        );

        localStorage.setItem(
          "kaliUserRole",
          user.role || "user"
        );
localStorage.setItem(
  "kaliUserStatus",
  user.status || "Active"
);

        // ----------------------------------------------
        // LOGIN SUCCESS
        // ----------------------------------------------

        message.style.color = "green";

        message.textContent =
          "Login successful. Opening system...";


        // ----------------------------------------------
        // GENERAL USER DASHBOARD
        // ----------------------------------------------

        setTimeout(function () {

          window.location.href =
            "dashboard.html";

        }, 500);


      } catch (error) {

        console.error(
          "GENERAL LOGIN ERROR:",
          error
        );

        message.style.color = "#d00";

        message.textContent =
          "Login failed. Please try again.";

      }

    }
  );
}


// ======================================================
// GENERAL USER LOGOUT
// ======================================================

window.logoutUser = function () {

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

  window.location.href =
    "login.html";
};
