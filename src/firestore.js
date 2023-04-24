import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuvBzYHmTlextXBYrEmzjQVk9bEwn_Dhg",
  authDomain: "fir-f66cd.firebaseapp.com",
  projectId: "fir-f66cd",
  storageBucket: "fir-f66cd.appspot.com",
  messagingSenderId: "969866596894",
  appId: "1:969866596894:web:d301c01a79020744f2140f",
  measurementId: "G-H2EMB2R90L",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
