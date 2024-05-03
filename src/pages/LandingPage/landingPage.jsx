import React, { useState } from "react";
import "./landingPage.scss";
import { TbBrandPushover } from "react-icons/tb";
import {  useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [exitValue, setExitValue] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    setExitValue(!exitValue);
    setTimeout(gotoLogin, 800);
  };
  function gotoLogin(){
    return(
      navigate('login')
    )
  }
  return (
    <div className="LandingPage">
      <div className={exitValue ? "LandingPageContainer exitValues" : "LandingPageContainer "}>
        <div className="LandingPagebRight"></div>
        <div className="LandingPagebLeft"></div>
      </div>
      <div
        className={exitValue ? " hideGlassEffect" : "glassEffect "}
        onClick={handleClick}
      >
        <TbBrandPushover className="paymentLogo" />
        <h1>Pizzap Entertainment</h1>
      </div>
    </div>
  );
};

export default LandingPage;
