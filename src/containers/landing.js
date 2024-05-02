import React from "react";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function LandingPage() {
  const history = useHistory();

  const start = () => {
    history.push("/login");
  }

  return (
    <div className="form-box">
      <div className="fullHeight p-ai-center p-d-flex p-jc-center">
        <div className="m-3 px-3 py-4 px-sm-4 py-sm-5">
            <p className="text-center mb-3 font-weight-bold">Learn More Be The Best!</p>
            <br></br>
            <h1 className="text-center">Online Learning Platform</h1>
            <br></br>
            <p className="text-center">“The most effective, successful professionals are constantly learning, they take the time to apply what they have learned, and they continually work to improve themselves.” 
            <br></br>- Joel Gardner</p>
            <br></br>
            <p className="text-center font-weight-bold">If you want to learn and become the best, This is the right place for you. This online platform is free and easy to use. Get start and see the difference.</p>
            <br></br>
            <div className="text-center">
            <Button label="Get Started" outlined onClick={start} />
            </div>
        </div>
      </div>
    </div>
  );
}
