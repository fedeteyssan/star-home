import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
      apiKey: "AIzaSyAJxvROVcbvFdHyv1fty5Ia92YLerDRLTM",
      authDomain: "star-home-fedeteyssan.firebaseapp.com",
      projectId: "star-home-fedeteyssan",
      storageBucket: "star-home-fedeteyssan.appspot.com",
      messagingSenderId: "523388087620",
      appId: "1:523388087620:web:2d659fafc697b45a1a3b11"
};    

const app = initializeApp(firebaseConfig);

export const getFirebase = () => app;
export { getFirestore };