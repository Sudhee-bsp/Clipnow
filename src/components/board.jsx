import React, { useState } from "react";
import {
  MDBInput,
  MDBBtn,
  MDBCol,
  MDBRow,
  MDBContainer,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

function Board() {
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const handleProceed = (e) => {
    e.preventDefault();
    id && navigate(`/${id}`);
  };

  return (
    <div className="container mt-4">
      {/* <h3 className="text_center">CLIPNOW</h3> */}
      <h5 className="text_center">Create your CLIP!</h5>
      <MDBRow className="d-flex justify-content-center mt-5">
        <MDBCol md="6">
          <form
            onSubmit={(e) => {
              handleProceed(e);
            }}
          >
            <MDBInput
              id="clipid"
              name="id"
              wrapperClass="mb-4"
              label="Enter your CLIP-ID"
              value={id}
              pattern="^[a-zA-Z0-9]*$"
              onChange={(e) => setId(e.target.value)}
            />
            {/* <MDBInput
              wrapperClass="mb-4"
              textarea
              id="message"
              rows={4}
              label="Message"
            /> */}

            <MDBContainer>
              {/* <h2 className="display-2">Fluid jumbotron</h2> */}
              <p className="lead fst-italic">
                Create your <strong>unique CLIP ID</strong> and use it as your
                live personal clipboard to share across all your devices.
              </p>
            </MDBContainer>

            <MDBBtn rounded className="col-6 mb-4">
              Get your CLIP <i className="fas fa-angle-double-right"></i>
            </MDBBtn>
          </form>
        </MDBCol>
      </MDBRow>
    </div>
  );
}

export default Board;
