import React from "react";
import Warper from "./warper";
import Popup from "reactjs-popup";
import { MDBSwitch } from "mdb-react-ui-kit";

import "./popup.css";

const contentStyle = {
  maxWidth: "600px",
  width: "90%",
};

const PopupPrompt = () => (
  <Popup
    trigger={
      <button className="button">
        <MDBSwitch id="flexSwitchCheckDefault" />
        Secure CLIP
      </button>
    }
    modal
    //contentStyle={contentStyle}
  >
    {(close) => (
      <div className="modal">
        <a className="modal-close" onClick={close}>
          &times;
        </a>
        <div className="modal-header"> Modal Title </div>
        <div className="modal-content">Vitae?</div>
        <div className="modal-actions">
          <button
            className="button"
            onClick={() => {
              console.log("modal closed ");
              close();
            }}
          >
            close modal
          </button>
        </div>
      </div>
    )}
  </Popup>
);

export default Warper(PopupPrompt);
