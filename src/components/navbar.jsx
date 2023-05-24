import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import Logo from "../assets/log5.svg";

import DarkMode from "./theme/darkmode";
import AboutPage from "./about";

import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("clipDarkMode") === "true") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  return (
    <>
      <MDBNavbar
        {...(darkMode ? 'dark bgColor = "dark"' : 'light bgColor = "light"')}
      >
        <MDBContainer>
          <MDBNavbarBrand href="./">
            <img
              src={Logo}
              //   width="150"
              height="40"
              alt="clipnow_logo"
              loading="lazy"
            />
          </MDBNavbarBrand>

          <div className="flex">
            <div style={{ float: "left", marginRight: "15px" }}>
              <DarkMode />
            </div>
            <MDBBtn
              tag="a"
              color="none"
              className="m-1"
              style={{ color: "#3b5998" }}
            >
              <MDBIcon
                onClick={() => navigate("/about")}
                fas
                icon="paw"
                size="lg"
              />
            </MDBBtn>
          </div>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}
