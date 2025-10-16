// client/src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signOut,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGm8uvVGEhauWtNNNwzZ95DLgltxLzHUA",
  authDomain: "harmoniqmind.firebaseapp.com",
  projectId: "harmoniqmind",
  storageBucket: "harmoniqmind.firebasestorage.app",
  messagingSenderId: "583609946191",
  appId: "1:583609946191:web:2429ae99fefc71337b9a3a",
  measurementId: "G-YM0JTPVCHQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

// Google sign-in
export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

// Facebook sign-in
export async function signInWithFacebook() {
  const result = await signInWithPopup(auth, facebookProvider);
  return result.user;
}

// Phone sign-in
export function setupRecaptcha(containerId = "recaptcha-container") {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(containerId, {
      size: "invisible"
    }, auth);
  }
}

export async function signInWithPhone(phoneNumber) {
  setupRecaptcha();
  const verifier = window.recaptchaVerifier;
  const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, verifier);
  return confirmationResult;
}

// Logout
export async function logout() {
  return await signOut(auth);
}
