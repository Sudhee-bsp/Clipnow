import NewIndex from "../ImageUpload/newindex";

import {
  MDBInput,
  MDBBtn,
  MDBCol,
  MDBRow,
  MDBContainer,
  MDBCollapse,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useState, React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getDatabase,
  ref,
  set,
  child,
  onValue,
  remove,
} from "firebase/database";
import moment from "moment";
import "./temp.css";
import Pattern from "url-knife";
import Linkify from "linkify-react";
import Toastify from "toastify-js";

function Temp() {
  const [clipid, setClipid] = useState("");
  const [message, setMessage] = useState("");
  const [tempidexist, setTempidexist] = useState(false);
  const [status, setStatus] = useState("");

  const [clipurl, setClipurl] = useState("");
  const [disperr, setDisperr] = useState(false);
  const [time, setTime] = useState(Date.now());

  const [knife, setKnife] = useState("");
  const [copyTextStatus, setCopyTextStatus] = useState("Copy");
  const [toastShow, setToastShow] = useState("");
  const navigate = useNavigate();

  const setmessage = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf("/") + 1);
    setClipid(id);
    setClipurl(window.location.href);
    const db = getDatabase();
    onValue(ref(db, "/Tempusers/" + id), async (snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        await setClipid(snapshot.val().clipid);
        await setMessage(snapshot.val().message);
        await setTime(snapshot.val().time);
        await setToastShow(snapshot.val().toastInfo);
        if (snapshot.val().status == "deleted") {
          remove(ref(db, "/Tempusers/" + id));
          setTempidexist(false);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
        var sample2 = Pattern.TextArea.extractAllUrls(snapshot.val().message, {
          ip_v4: true,
          ip_v6: true,
          localhost: true,
          intranet: false,
        });
        // await setMsgUrl(sample2);
        // console.log(sample2);
        var str = "";
        sample2.map((key, index) => {
          str = str + sample2[index].value.url + " ";
        });
        setKnife(str);

        if (toastShow === "just_updated") {
          console.log(toastShow);
          console.log("inside");
          Toastify({
            text: "CLIP Updated!",
            duration: 5000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "#474bff",
              background:
                "-webkit-linear-gradient(0deg, #474bff 0%, #bc48ff 100%)",
              background: "linear-gradient(0deg, #474bff 0%, #bc48ff 100%)",
            },
          }).showToast();
        }

        setTimeout(async () => {
          setTempidexist(true);
          if (status === "deleted") {
            console.log("deleted");
            setMessage("");
            remove(ref(db, "/Tempusers/" + id));
            setTempidexist(false);
            Window.location.href = "/";
          }
        }, 2000);
      } else {
        // refresh page
        // alert('Sorry, this clip is not available anymore');
        // window.location.href = '/';
      }
    });
  }, [toastShow]);

  const dateFormatUTC = (date) => {
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    var hours = date.getHours();
    if (hours < 10) hours = "0" + hours;

    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    if (hours < 10) hours = "0" + hours;

    //var monthName = months[date.getMonth()];
    var timeOfDay = hours < 12 ? "AM" : "PM";

    return (
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds +
      timeOfDay
    );
  };

  const createClipart = (e) => {
    e.preventDefault();
    //upload the id and message to realtime database
    const dbRef = ref(getDatabase());
    const pctime = dateFormatUTC(new Date());
    console.log(pctime);

    if (clipid !== "") {
      set(child(dbRef, `Tempusers/${clipid}`), {
        clipid: clipid,
        message: message,
        status: "created",
        toastInfo: "just_created",
        time: pctime,
      });
      //   alert("Your clipart has been created");
      // if (message !== "") {
      setClipurl(window.location.href);
      // }

      Toastify({
        text: "Your CLIP has been created",
        duration: 5000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
    } else {
      alert("Please enter your clipid");
      const url = window.location.href;
      const id = url.substring(url.lastIndexOf("/") + 1);
      setClipid(id);
    }
  };

  // ------------------- Updating the CLIP data ------------
  const updateClipart = (e) => {
    e.preventDefault();
    //upload the id and message to realtime database
    const dbRef = ref(getDatabase());
    const pctime = dateFormatUTC(new Date());
    console.log(pctime);

    if (clipid !== "") {
      set(child(dbRef, `Tempusers/${clipid}`), {
        clipid: clipid,
        message: message,
        status: "created",
        toastInfo: "just_updated",
        time: pctime,
      });
      //   alert("Your clipart has been created");
      // if (message !== "") {
      setClipurl(window.location.href);
      // }
    } else {
      alert("Please enter your clipid");
      const url = window.location.href;
      const id = url.substring(url.lastIndexOf("/") + 1);
      setClipid(id);
    }
  };

  // ------------------- Deleting the CLIP data ------------
  const deleteClipart = (e) => {
    e.preventDefault();
    const dbRef = ref(getDatabase());
    if (clipid !== "") {
      set(child(dbRef, `Tempusers/${clipid}`), {
        clipid: clipid,
        message: "",
        status: "deleted",
        time: new Date().toLocaleString(),
      });
      //   alert("Your clipart has been deleted");

      deleteToast();

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      alert("Please enter your clipid");
      const url = window.location.href;
      const id = url.substring(url.lastIndexOf("/") + 1);
      setClipid(id);
    }
  };

  const deleteToast = () => {
    Toastify({
      text: "CLIP deleted successfully !",
      duration: 2000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#E21717",
      },
    }).showToast();
  };

  const displayError = (e) => {
    e.preventDefault();
    setDisperr(true);
  };

  const [showShow, setShowShow] = useState(false);
  // const toggleShow = () => setShowShow(!showShow);
  const toggleShow = () => {
    setTimeout(() => {
      setShowShow(!showShow);
    }, 1000);
  };

  const copyMessage = (getMessage) => {
    navigator.clipboard.writeText(getMessage);
    setCopyTextStatus("COPIED!");
    setTimeout(() => {
      setCopyTextStatus("COPY");
    }, 3000);
  };

  return (
    <div className="container mt-4 mb-6">
      {/* <h4 className="text_center">
        <Link to="/">CLIPNOW</Link>
      </h4> */}
      <h5 className="text_center">
        Here's your CLIP ready! {tempidexist ? "Created." : "Create it."}{" "}
      </h5>
      <div>
        <MDBRow className="d-flex justify-content-center mt-5">
          <MDBCol md="12">
            <MDBInput
              id="clipid"
              wrapperClass={disperr ? "mb-0" : "mb-4"}
              label="Your CLIP-ID"
              value={clipid}
              onDoubleClick={displayError}
              readonly
            />
            {disperr && (
              <MDBContainer className="disperr mb-4 text-start fst-italic">
                Clip-ID cannot be changed
              </MDBContainer>
            )}

            <MDBInput
              className="cliptextarea"
              wrapperClass="mb-4"
              textarea
              id="message"
              rows={8}
              label="Message"
              value={message}
              onChange={setmessage}
            >
              <MDBBtn
                className="copy_btn"
                size="sm"
                onClick={() => copyMessage(message)}
              >
                <i className="far fa-copy"></i> <small>{copyTextStatus}</small>
              </MDBBtn>
            </MDBInput>
            {tempidexist ? (
              <div>
                <span>
                  {clipurl && (
                    <p className="fst-italic fw-bold">
                      Share this Clip-URL to access your data:
                      <a href={clipurl} target="_blank" rel="noreferrer">
                        {clipurl}
                      </a>
                    </p>
                  )}
                </span>
                <span>
                  {knife && (
                    <Linkify tagName="p" options={{ target: "_blank" }}>
                      <span>URL's found: </span>
                      {knife}
                    </Linkify>
                  )}
                </span>
                <MDBContainer className="mt-4 mb-4">
                  <MDBBtn
                    outline
                    rounded
                    color="secondary"
                    onClick={toggleShow}
                  >
                    Attach Files
                  </MDBBtn>

                  {/* ----------------------------- ATTACH FILES Component here------------------------ */}

                  <MDBCollapse show={showShow}>
                    <NewIndex />
                  </MDBCollapse>

                  {/* ----------------------------- ATTACH FILES Component ends------------------------ */}
                </MDBContainer>
                <MDBBtn type="submit" className="mb-4" onClick={updateClipart}>
                  Update
                </MDBBtn>
                &emsp;
                <MDBBtn type="submit" className="mb-4" onClick={deleteClipart}>
                  Delete Clip
                </MDBBtn>
                {time && (
                  <p>
                    Last updated:{" "}
                    {moment(time, "DD/MM/YYYY HH:mm:ss Z").fromNow()}{" "}
                  </p>
                )}
              </div>
            ) : (
              <MDBBtn type="submit" className="mb-4" onClick={createClipart}>
                Create Clip
              </MDBBtn>
            )}
          </MDBCol>
        </MDBRow>
      </div>
    </div>
  );
}

export default Temp;
