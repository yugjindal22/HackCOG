import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";

import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";


const LoginButton = document.getElementById("submit_btn");
const nameText = document.getElementById("nameTextField");
const emailText = document.getElementById("typeEmailX");
const passwdText = document.getElementById("typePasswordX");
const addressText = document.getElementById("addressTextField");
const SignUpWithGoogleButton = document.getElementById("googlebtn");

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

const db = getFirestore(app);

const userSignUp = async () => {
    const signUpEmail = emailText.value;
    const signUpPassword = passwdText.value;
    await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
        .then((userCredentials) => {
            const user = userCredentials.user;
            console.log(db.collection("userData"));

            db.collection("userData").doc(signUpEmail).set({
                owner: auth.currentUser.uid,
                Name: nameText.value,
                Email: signUpEmail,
                Password: signUpPassword,
                Address: addressText.value,
            })
            console.log("Document successfully written!");
            alert("Your account have been made!");
            window.local.local = "https://enovate-7c07a.web.app/signuppage.html";


        })
        .catch((error) => {
            const errCode = error.code;
            const errMsg = error.message;
            console.log(errCode + errMsg);
        })
}

SignUpWithGoogleButton.addEventListener("click", () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            alert("Successfully signed up using google!");
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
    userSignUp();
});

function isFormValid() {
    if (!emailText.value) return false;
    if (!passwdText.value) return false;

    return true;
}