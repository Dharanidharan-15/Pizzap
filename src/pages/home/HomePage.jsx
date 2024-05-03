import React, { useEffect } from "react";
import "./HomePage.scss";
import { useDispatch, useSelector } from "react-redux";
import { SubscriptionPackages } from "../../helpers/dataList";
import { BiLogOut } from "react-icons/bi";
import { clearUser } from "../../app/feature/UserSlice";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOff = () => {
    navigate("/login");
    dispatch(clearUser());
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handlePayment = (price) => {
    var options = {
      key: process.env.REACT_APP_kEY_ID,
      key_secret: process.env.REACT_APP_kEY_SECRET,
      amount: price * 100,
      currency: "INR",
      name: "Pizzap Entertainment",
      description: "this is for tesing purpose",
      handler: function (response) {
        alert(
          "Your Payment ID : " +
            response.razorpay_payment_id +
            " has been completed successfully."
        );
      },
      prefill: {
        name: user.given_name,
        email: user.email,
      },
      notes: {
        address: "Rayzorpay Corporate office DD",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var pay = new window.Razorpay(options);
    pay.open();
  };
  return (
    <div className="HomePage">
      <div className="BallContainer">
        <div className="HomeLeftBall"></div>
        <div className="HomeRightBall"></div>
      </div>
      <h1>Hello, {user?.given_name}</h1>
      <div className="PackageContainer">
        {SubscriptionPackages.map((data, index) => (
          <div className="PackageCards" key={index}>
            <img src={data.image} alt="Packages" style={data?.style} />
            <h2>{data.title}</h2>
            <p>{data.description}</p>
            <div
              className="getNowButton"
              onClick={() => handlePayment(data.price)}
            >
              <h2>Get Now</h2>
            </div>
          </div>
        ))}
      </div>
      <BiLogOut className="logoffIcon" onClick={handleLogOff} />
    </div>
  );
};

export default HomePage;
