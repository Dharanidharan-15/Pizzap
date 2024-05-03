import React, { useState } from "react";
import "./LoginSignUp.scss";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../app/feature/UserSlice";
const LoginSignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();
  const handlePayzooClick = () => {
    navigate("/");
  };
  const user = useSelector((state) => state.user.user);

  const handleGoogleLogin = (status) => {
    if (status === true) {
      setTimeout(gotoHomePage, 900);
    }
  };

  function gotoHomePage() {
    navigate("/home");
  }

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const lengthRegex = /.{8,}/;
    const specialCharRegex = /[^a-zA-Z0-9]/;
    const numberRegex = /\d/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    return (
      lengthRegex.test(password) &&
      specialCharRegex.test(password) &&
      numberRegex.test(password) &&
      uppercaseRegex.test(password) &&
      lowercaseRegex.test(password)
    );
  };

  const handleLogin = () => {
    setEmailError("");
    setPasswordError("");

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError("Enter valid Password");
      return;
    }
    if (emailError === "" && passwordError === "" && user) {
      setTimeout(gotoHomePage, 800);
    }
  };

  return (
    <div className="LoginSignUp">
      <div className="LoginContainer">
        <div className="LoginContainerballLeft"></div>
        <div className="LoginContainerballRight"></div>
      </div>
      <div className="LoginForm">
        <p className="LoginTitle">Login Now</p>
        <div className="InnerContainer">
          <div className="LoginInput">
            <label htmlFor="emailInput">Email</label>
            <input
              type="email"
              className="emailInput "
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="errorMessage">{emailError}</p>}
          </div>
          <div className="LoginInput">
            <label htmlFor="passwordInput">Password</label>
            <input
              type="password"
              className="passwordInput "
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p className="errorMessage">{passwordError}</p>}
          </div>
        </div>
        <div className="bottomContainer">
          <div className="LoginButton" onClick={handleLogin}>
            <h3>Log In</h3>
          </div>
          <div className="PoweredByContent">
            <p>
              Made with <span className="HeartEmoji">&hearts;</span> by{" "}
              <span className="PayzooTitle" onClick={handlePayzooClick}>
                Pizzap
              </span>
            </p>
            <div className="oAuthLogin">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  const decode = jwtDecode(credentialResponse?.credential);
                  handleGoogleLogin(decode.email_verified);
                  console.log(decode)
                  dispatch(setUser(decode));
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
