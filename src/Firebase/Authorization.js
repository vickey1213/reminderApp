import React, { useState, useEffect, createContext } from "react";
import { auth } from "./Firebase";
import { useNavigate } from "react-router-dom";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { currentUser,selectProduct,fastDeliveryy,searchItem } from "../Redux/Action";

export const AuthContext = createContext();

export default function Authorization({ children }) {
  let navigate=useNavigate();
  let [user, setUser] = useState("");
  let dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (userInfo) => {
      if (userInfo && userInfo.emailVerified && userInfo.accessToken) {
        sessionStorage.setItem("user", userInfo.accessToken);
        sessionStorage.setItem("userName", userInfo.displayName);
        sessionStorage.setItem("userPic", user.photoURL);
      } else {
        sessionStorage.removeItem("user");
        setUser("");
      }
    });
  }, [user]);

  async function GoogleSignIn() {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setUser(auth.currentUser);
      sessionStorage.setItem("user", user.accessToken);
      sessionStorage.setItem("userName", user.displayName);
      await sessionStorage.setItem("userPic", user.photoURL);
      dispatch(currentUser(user));
    } catch (error) {
      console.log(error);
    }
  }
  async function PhoneLogin(mobile) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, mobile, recaptchaVerifier);
  }
  async function logout() {
    await signOut(auth);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userPic");
    dispatch(currentUser([]));
    dispatch(selectProduct([]));
    dispatch(searchItem(""));
    dispatch(fastDeliveryy(false));
    navigate("/");
  }
  return (
    <AuthContext.Provider value={{ GoogleSignIn, PhoneLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
