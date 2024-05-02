import React from "react";

import "../assets/css/header.css";

import Logo from "../assets/images/logo.png";

import { useDispatch } from "react-redux";
import { openSideBar } from "../library/store/sidebar";

import { useHistory } from "react-router-dom";
import { confirmDialog } from "primereact/confirmdialog";

export default function Header() {
  const history = useHistory();
  const dispatch = useDispatch();

  const logout = () => {
    confirmDialog({
      message: 'Are you sure want to logout?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        localStorage.clear();
        history.push("/login");
      },
      reject: () => null
  });
  }

  return (
    <>
      <div className="header-box d-flex p-ai-center">
        <div>
          <button
            className="p-d-inline-block p-d-lg-none btn btn-link p-0 mr-3"
            aria-label="open sidebar"
            onClick={() => {
              dispatch(openSideBar());
            }}
          >
            <i className="pi pi-bars"></i>
          </button>
          <img src={Logo} alt="Logo" className="img img-fluid logo" />
        </div>
        <div className="ml-auto menu-items mr-0">
          <i className="pi pi-power-off" style={{cursor: 'pointer'}} onClick={logout} ></i>
        </div>
      </div>
    </>
  );
}
