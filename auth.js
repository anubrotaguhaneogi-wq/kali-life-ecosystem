// auth.js - Mobile + Password Login (Mobile Friendly)

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDqXcxTrI22JuR1j9mtbUSCjGkT7B_OxZo",
    authDomain: "kali-life-ecosystem.firebaseapp.com",
    projectId: "kali-life-ecosystem",
    storageBucket: "kali-life-ecosystem.firebasestorage.app",
    messagingSenderId: "734170546737",
    appId: "1:734170546737:web:26f79e1b4b19ebabfe0b10",
    measurementId: "G-LBEY0W7RX3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const loginForm = document.getElementById("loginForm");
const messageBox = document.getElementById("message");

function showMessage(text, isError = true) {
    if (!messageBox) return;
    messageBox.style.color = isError ? "#dc2626" : "#059669";
    messageBox.textContent = text;
}

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const mobileInput = document.getElementById("mobile");
        const passwordInput = document.getElementById("password");

        let mobile = mobileInput.value.trim();
        const password = passwordInput.value;

        // শুধু নাম্বার রাখা
        mobile = mobile.replace(/\D/g, "");

        if (!mobile || mobile.length < 10) {
            showMessage("সঠিক মোবাইল নাম্বার দিন");
            return;
        }

        if (!password) {
            showMessage("পাসওয়ার্ড দিন");
            return;
        }

        showMessage("লগইন হচ্ছে...", false);

        try {
            // Firestore থেকে মোবাইল নাম্বার দিয়ে ইউজার খোঁজা
            const q = query(
                collection(db, "users"),
                where("mobile", "==", mobile)
            );

            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                showMessage("এই মোবাইল নাম্বারে কোনো অ্যাকাউন্ট নেই");
                return;
            }

            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();

            // ইমেইল না থাকলে মোবাইল দিয়ে বানানো
            const email = userData.email || (mobile + "@kalilife.com");

            // Firebase Auth দিয়ে লগইন
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Session সেভ করা
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userUid", user.uid);
            localStorage.setItem("userMobile", mobile);
            localStorage.setItem("userName", userData.name || "");
            localStorage.setItem("userRole", userData.role || "User");

            showMessage("লগইন সফল!", false);

            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 800);

        } catch (error) {
            console.error("Login Error:", error);

            if (
                error.code === "auth/wrong-password" ||
                error.code === "auth/invalid-credential" ||
                error.code === "auth/user-not-found"
            ) {
                showMessage("মোবাইল নাম্বার বা পাসওয়ার্ড ভুল");
            } else {
                showMessage("লগইন ব্যর্থ। আবার চেষ্টা করুন");
            }
        }
    });
}
