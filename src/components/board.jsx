import React, { useState } from "react";
import {
  MDBInput,
  MDBBtn,
  MDBCol,
  MDBRow,
  MDBContainer,
  MDBIcon,
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
      <div className="fade-in-up">
        <h4 className="text_center mb-2">
          <MDBIcon fas icon="clipboard" className="me-2" />
          Create your CLIP!
        </h4>
        <p className="text-muted mb-4">Share text & files across all your devices</p>
      </div>

      <MDBRow className="d-flex justify-content-center mt-4">
        <MDBCol md="6">
          <form
            onSubmit={(e) => {
              handleProceed(e);
            }}
            className="fade-in-up-delay"
          >
            <MDBInput
              id="clipid"
              name="id"
              wrapperClass="mb-4"
              label="Enter your CLIP-ID"
              value={id}
              pattern="^[a-zA-Z0-9]*$"
              onChange={(e) => setId(e.target.value)}
              size="lg"
            />

            <MDBContainer className="mb-4">
              <p className="lead fst-italic">
                Create your <strong>unique CLIP ID</strong> and use it as your
                live personal clipboard to share across all your devices.
              </p>
            </MDBContainer>

            <MDBBtn rounded className="col-6 mb-4 btn-animated" size="lg">
              <MDBIcon fas icon="arrow-right" className="me-2" />
              Get your CLIP
            </MDBBtn>
          </form>

          {/* Feature highlights */}
          <MDBRow className="mt-5 fade-in-up-delay">
            <MDBCol md="4" className="text-center mb-3">
              <div className="feature-card">
                <MDBIcon fas icon="share-alt" className="feature-icon" />
                <p className="mb-0 fw-bold">Share</p>
                <small className="text-muted">Across devices</small>
              </div>
            </MDBCol>
            <MDBCol md="4" className="text-center mb-3">
              <div className="feature-card">
                <MDBIcon fas icon="sync" className="feature-icon" />
                <p className="mb-0 fw-bold">Real-time</p>
                <small className="text-muted">Instant sync</small>
              </div>
            </MDBCol>
            <MDBCol md="4" className="text-center mb-3">
              <div className="feature-card">
                <MDBIcon fas icon="paperclip" className="feature-icon" />
                <p className="mb-0 fw-bold">Attach</p>
                <small className="text-muted">Files & media</small>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </div>
  );
}

export default Board;
