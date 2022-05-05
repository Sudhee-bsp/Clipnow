import React from "react";
import {
  MDBFooter,
  MDBIcon,
} from "mdb-react-ui-kit";

function Footer() {
  return (
    <MDBFooter
      className="myfooter text-center text-white mb-0"
      style={{ backgroundColor: "#120E43" }}
    >
      <div className="text-center p-2">
        <div className="text-center">
          Developed © 2022 | Clipnow
          <br />
          &lt;{" "}
          <a href="https://github.com/Sudhee-bsp" target="_blank" rel="noreferrer">
            Sudhindra <MDBIcon fab icon="github" />
          </a>{" "}
          |{" "}
          <a href="https://github.com/18mis7023" target="_blank" rel="noreferrer">
            Hemanth <MDBIcon fab icon="github" />
          </a>{" "}
          /&gt;
        </div>
      </div>
    </MDBFooter>
  );
}

export default Footer;
