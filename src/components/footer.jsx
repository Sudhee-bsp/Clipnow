import React from "react";
import {
  MDBFooter,
  MDBIcon,
} from "mdb-react-ui-kit";

function Footer() {
  return (
    <MDBFooter
      className="myfooter text-center"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "1rem 0",
        color: "white"
      }}
    >
      <div className="text-center">
        <div className="mb-1" style={{ fontSize: "0.9rem", fontWeight: "500" }}>
          Developed © 2022 - {new Date().getFullYear()} | Clipnow
        </div>
        <div style={{ fontSize: "0.85rem" }}>
          &lt;{" "}
          <a href="https://github.com/Sudhee-bsp" target="_blank" rel="noreferrer" style={{ color: "#ffffff", textDecoration: "none" }}>
            Sudhindra <MDBIcon fab icon="github" />
          </a>{" "}
          |{" "}
          <a href="https://github.com/18mis7023" target="_blank" rel="noreferrer" style={{ color: "#ffffff", textDecoration: "none" }}>
            Hemanth <MDBIcon fab icon="github" />
          </a>{" "}
          /&gt;
        </div>
      </div>
    </MDBFooter>
  );
}

export default Footer;
