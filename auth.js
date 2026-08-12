import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const app = initializeApp({
  apiKey: "AIzaSyDqXcxTrI22JuR1j9mtbUSCjGkT7B_OxZo",
  authDomain: "kali-life-ecosystem.firebaseapp.com",
  projectId: "kali-life-ecosystem",
  storageBucket: "kali-life-ecosystem.firebasestorage.app",
  messagingSenderId: "734170546737",
  appId: "1:734170546737:web:26f79e1b4b19ebabfe0b10"
});

const auth = getAuth(app);
const db = getFirestore(app);

function cleanMobile(m) {
  let n = String(m).replace(/\D/g, "");
  if (n.startsWith("91") && n.length === 12) n = n.slice(2);
  return n;
}

document.getElementById("loginForm").onsubmit = async (e) => {
  e.preventDefault();

  const mobile = cleanMobile(
    document.getElementById("mobile").value
  );

  const password =
    document.getElementById("password").value;

  const message =
    document.getElementById("message");

  try {
    const snap = await getDocs(collection(db, "users"));

    let user = null;

    snap.forEach(doc => {
      const data = doc.data();

      if (
        data.mobile &&
        cleanMobile(data.mobile) === mobile
      ) {
        user = data;
      }
    });

    if (!user) {
      message.textContent = "Mobile number not found";
      return;
    }

    if (!user.email) {
      message.textContent = "Email not found for this account";
      return;
    }

    await signInWithEmailAndPassword(
      auth,
      user.email,
      password
    );

    message.style.color = "green";
    message.textContent = "Login successful";

    setTimeout(() => {
      location.href = "admin-dashboard.html";
    }, 500);

  } catch (error) {
    console.error(error);
    message.textContent =
      "Login failed: " + error.message;
  }
};
