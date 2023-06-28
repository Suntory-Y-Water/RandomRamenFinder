import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBOWt7q6Pu5qp_vCBNNnt2gos9a7sOTDes",
    authDomain: "ramen-roulette.firebaseapp.com",
    projectId: "ramen-roulette",
    storageBucket: "ramen-roulette.appspot.com",
    messagingSenderId: "993169566760",
    appId: "1:993169566760:web:7747f2bb953b465696591d",
    measurementId: "G-39EC7HHL6D"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;