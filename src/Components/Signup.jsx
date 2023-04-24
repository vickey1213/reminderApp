import React, { useState,  } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase/Firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
export default function Signup() {
  
  let navigate = useNavigate();
  let [userName, setUserName] = useState();
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();
  let [confirmPassword, setConfirmPassword] = useState();
  async function signUpData(e) {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        toast.error("Password and Confirm Password Should Match");
      } else {
        let data = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
          userName
        );
        toast.success("Signup Successfully");
        toast.warning(
          `Please verify your email address link sended to ${email}`
        );
        let user = data.user;
        updateProfile(user, { displayName: userName });
        console.log(user);
        sendEmailVerification(user);
        navigate("/LogIn");
      }
    } catch (error) {
      console.log(error);
    }
  }
 
  return (
    <form onSubmit={signUpData}>
      <div className="mainBodyForm">
        <div className="signupForm">
          <div className="inputdiv">
            <input
              type="text"
              placeholder="Username"
              className="inputTag"
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="inputdiv">
            <input
              type="email"
              placeholder="Email"
              className="inputTag"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="inputdiv">
            <input
              type="password"
              placeholder="Password"
              className="inputTag"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="inputdiv">
            <input
              type="password"
              placeholder="Confirm Password"
              className="inputTag"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="btnSection">
            <button className="loginBtn">Submit</button>
          </div>
         
          <div className="btnSection">
            <button className="loginBtn" onClick={() => navigate("/Login")}>
              Existing User? Log in
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
