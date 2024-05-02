import React from "react";

import "../assets/css/header.css";

import Logo from "../assets/images/logo.png";

import { useHistory } from "react-router-dom";
import { Button } from "primereact/button";

export default function LandingHeader() {
  const history = useHistory();

  const start = () => {
    history.push("/login");
  }

  return (
    <>
      <div className="header-box d-flex p-ai-center">
        <div>
          <img src={Logo} alt="Logo" className="img img-fluid logo" />
        </div>
        <div className="ml-auto menu-items mr-0">
          <Button label="Get Started" outlined onClick={start} />
        </div>
      </div>
    </>
  );
}
