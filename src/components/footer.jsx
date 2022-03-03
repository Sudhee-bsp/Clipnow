import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
} from "mdb-react-ui-kit";

function Footer() {
  return (
    <MDBFooter
      className="text-center text-white mb-0 fixed-bottom"
      style={{ backgroundColor: "#120E43" }}
    >
      <div className="text-center p-3">
        <div className="text-center">
          Developed © 2022 | Clipnow
          <br />
          &lt;{" "}
          <a href="https://github.com/Sudhee-bsp" target="_blank">
            Sudhindra <MDBIcon fab icon="github" />
          </a>{" "}
          |{" "}
          <a href="https://github.com/18mis7023" target="_blank">
            Hemanth <MDBIcon fab icon="github" />
          </a>{" "}
          /&gt;
        </div>
      </div>
    </MDBFooter>
  );
}

export default Footer;
