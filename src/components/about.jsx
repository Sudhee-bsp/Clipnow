import { useState, React, useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import {
  getDatabase,
  ref,
  onValue,
} from "firebase/database";

import "./about.css";

const Aboutpage = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const db = getDatabase();

    onValue(ref(db, "/Tempusers/"), async (snapshot) => {
      if (snapshot.exists()) {
        await setCount(snapshot.size);
      }
    });
  }, []);

  return (
    <MDBContainer className="mt-3">
      <div className="about fade-in-up">
        <h3 className="about_heading mb-3">
          <MDBIcon fas icon="info-circle" className="me-2" />
          About Clipnow
        </h3>

        <p className="about_content">
          A simple personal clipboard to save and share links, images, and text across your devices.
        </p>

        {/* Feature Cards */}
        <MDBRow className="mt-3 mb-3">
          <MDBCol md="4" className="mb-2">
            <div className="feature-card text-center py-3">
              <MDBIcon fas icon="edit" className="feature-icon" />
              <h6 className="mb-1">Create</h6>
              <small className="text-muted">Enter unique CLIP-ID</small>
            </div>
          </MDBCol>
          <MDBCol md="4" className="mb-2">
            <div className="feature-card text-center py-3">
              <MDBIcon fas icon="share-alt" className="feature-icon" />
              <h6 className="mb-1">Share</h6>
              <small className="text-muted">Access from any device</small>
            </div>
          </MDBCol>
          <MDBCol md="4" className="mb-2">
            <div className="feature-card text-center py-3">
              <MDBIcon fas icon="paperclip" className="feature-icon" />
              <h6 className="mb-1">Attach</h6>
              <small className="text-muted">Upload files & media</small>
            </div>
          </MDBCol>
        </MDBRow>

        <div className="slogan-box text-center p-2 mb-3">
          <p className="mb-0 fst-italic">
            <MDBIcon fas icon="quote-left" className="me-1 text-primary" size="sm" />
            Create, Share, get it DONE.
            <MDBIcon fas icon="quote-right" className="ms-1 text-primary" size="sm" />
          </p>
        </div>

        <div className="d-flex justify-content-center align-items-center gap-4">
          <span>Built with 💙 for CODE</span>
          <div className="stats-box text-center px-4 py-2">
            <MDBIcon fas icon="chart-line" className="me-2" />
            <span className="counter">{count}+</span>
            <small className="ms-1">clips</small>
          </div>
        </div>
      </div>
    </MDBContainer>
  );
};

export default Aboutpage;
