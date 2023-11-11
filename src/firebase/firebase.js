import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCvRZFsLM_ZwQR7XiVPYiZIZFqi9RtOiIU",
    authDomain: "expense-tracker-2649e.firebaseapp.com",
    projectId: "expense-tracker-2649e",
    storageBucket: "expense-tracker-2649e.appspot.com",
    messagingSenderId: "711346538833",
    appId: "1:711346538833:web:488a32b89e0b06cca26b70",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
