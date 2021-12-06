import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAo0Db3cA_LwBPDadyz7Vl9NtNCBPyx7sI",
    authDomain: "somoswica-3fbb1.firebaseapp.com",
    projectId: "somoswica-3fbb1",
    storageBucket: "somoswica-3fbb1.appspot.com",
    messagingSenderId: "1056377996142",
    appId: "1:1056377996142:web:dcc5269f8786a0cc5b777f"
};

const app = initializeApp(firebaseConfig);

export const getFirebase = () => app;
export { getFirestore };