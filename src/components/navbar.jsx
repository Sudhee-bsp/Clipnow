import React, { useState, useEffect } from "react";
import { MDBContainer, MDBNavbar, MDBNavbarBrand } from "mdb-react-ui-kit";
import Logo from "../assets/log5.svg";

import DarkMode from "./theme/darkmode";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

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
          <DarkMode />
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}
