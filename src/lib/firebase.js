// Firebase initialization helper
// Reads Vite env vars prefixed with VITE_FIREBASE_*. If missing, exports enabled=false
import { initializeApp } from "firebase/app";
import { getFirestore, setLogLevel } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
const appId = import.meta.env.VITE_FIREBASE_APP_ID;

// expose firebase config for debugging
export const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

export const firebaseEnabled = !!(apiKey && projectId && appId);

let app = null;
let db = null;
let auth = null;

if (firebaseEnabled) {
  const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
  };

  try {
    // configure Firestore SDK log level:
    // - default to 'silent' to avoid verbose logs in dev
    // - enable debug if VITE_FIREBASE_DEBUG is set to 'true'
    try {
      const enableDebug = import.meta.env.VITE_FIREBASE_DEBUG === "true";
      setLogLevel(enableDebug ? "debug" : "silent");
    } catch (e) {
      // ignore if not available
    }

    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);

    // log a redacted copy of the config so you can verify values (avoid full secrets in shared logs)
    console.debug(
      "Firebase initialized. projectId=",
      projectId,
      "apiKey=",
      apiKey ? apiKey.slice(0, 8) + "..." : null
    );
  } catch (err) {
    // initialization failed; disable firebase
    console.error("Firebase init error:", err);
  }
}

export { app, db, auth };
