// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuvBzYHmTlextXBYrEmzjQVk9bEwn_Dhg",
  authDomain: "fir-f66cd.firebaseapp.com",
  projectId: "fir-f66cd",
  storageBucket: "fir-f66cd.appspot.com",
  messagingSenderId: "969866596894",
  appId: "1:969866596894:web:d301c01a79020744f2140f",
  measurementId: "G-H2EMB2R90L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export let auth = getAuth(app);
// const analytics = getAnalytics(app);
