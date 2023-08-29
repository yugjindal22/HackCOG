import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";

const LoginButton = document.getElementById("submit_btn");
const emailText = document.getElementById("typeEmailX");
const passwdText = document.getElementById("typePasswordX");
const LogInWithGoogleButton = document.getElementById("googlebtn");

const firebaseConfig = {
    apiKey: "AIzaSyC1brUIhjSaqiREif6IvBLfeYrqJMwIcnk",
    authDomain: "enovate-7c07a.firebaseapp.com",
    projectId: "enovate-7c07a",
    storageBucket: "enovate-7c07a.appspot.com",
    messagingSenderId: "76574137043",
    appId: "1:76574137043:web:7e5ff492b2dbb35a2b5226",
    measurementId: "G-WD7ZEV8T6Y"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const userLogIn = async() => {
    const LogInEmail = emailText.value;
    const LogInPassword = passwdText.value;
    signInWithEmailAndPassword(auth, LogInEmail, LogInPassword)
    .then((userCredentials) => {
        const user = userCredentials.user;
        alert("You have been signed in!");
            window.local.replace = "https://enovate-7c07a.web.app/";
    })
    .catch((error) => {
        const errCode = error.code;
        const errMsg = error.message;
        console.log(errCode + errMsg);
    })
}

LogInWithGoogleButton.addEventListener("click", () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            alert("Successfully signed in using google!");
            window.local.href = "/";
        })
        .catch((error) => {
            const errCode = error.code;
            const errMsg = error.message;
            
            console.log(errCode + errMsg);
        });
})

LoginButton.addEventListener("click", () => {
    if (!isFormValid()) return;
    userLogIn();
});

function isFormValid() {
    if (!emailText.value) return false;
    if (!passwdText.value) return false;

    return true;
}