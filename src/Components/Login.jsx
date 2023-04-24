import React, { useState,  } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";



export default function Login() {

  let navigate = useNavigate();
  let [password, setPassword] = useState();
  let [email, setEmail] = useState();

  async function logInData(e) {
    e.preventDefault();
    try {
      let userData = await signInWithEmailAndPassword(auth, email, password);
      console.log(userData);
      if (userData.user.emailVerified === true) {
        signInWithEmailAndPassword(auth, email, password);
        toast.success(`Logged in as ${email}`);
        navigate("/Reminder");
        window.location.reload();
      } else {
        toast.error(`Please verify your email address ${userData.user.email}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Email Id and password doesn't match");
    }
  }
  return (
    <form onSubmit={logInData}>
      <div className="mainBodyForm">
        <div className="loginForm">
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
              re
            />
          </div>
          <div className="btnSection">
            <button className="loginBtn">Submit</button>
          </div>

          <div className="btnSection">
            <button className="loginBtn" onClick={() => navigate("/Signup")}>
              New User? Create an account
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
