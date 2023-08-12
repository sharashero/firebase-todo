import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
    getAuth,
    connectAuthEmulator
} from "firebase/auth";

import {
    getFirestore,
    connectFirestoreEmulator
} from "firebase/firestore";

const firebaseConfig = {
    // ...
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

try {
    if (import.meta.env.DEV) {
        connectAuthEmulator(auth, "http://127.0.0.1:9099");
        connectFirestoreEmulator(db, '127.0.0.1', 8080);
    }
} catch { /* */ }
