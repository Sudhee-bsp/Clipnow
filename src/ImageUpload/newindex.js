// import storage from "../firebaseconfig";
import {
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  getMetadata,
} from "firebase/storage";
import { ref as sRef } from "firebase/storage";

import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBProgress,
  MDBProgressBar,
  MDBContainer,
  MDBBadge,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

import FileUpload from "../file-upload/file-upload.component";
import {
  getDatabase,
  set,
  ref,
  onValue,
  update,
  push,
  child,
} from "firebase/database";

import "./newindex.css";

function Newindex() {
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);
  const [numfiles, setNumfiles] = useState(0);
  const [status, setStatus] = useState("");
  const [numAttachments, setNumAttachments] = useState(0);
  const [metaInfo, setMetaInfo] = useState({});
  const [copy, setCopy] = useState("copy file url!");

  // setting filesurls from firebase
  const [filesurls, setFilesurls] = useState([]);

  // modal box for delete confirmation
  const [staticModal, setStaticModal] = useState(false);
  const [deleteitem, setDeleteitem] = useState();
  const [deleteitemurl, setDeleteitemurl] = useState("");
  const toggleShow = () => setStaticModal(!staticModal);

  const storage = getStorage();

  //getting clip id of an user
  const [clipid, setClipid] = useState("");

  // get files urls from firebase
  useEffect(() => {
    //getting clipid and setting clipid
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf("/") + 1);
    setClipid(id);

    const db = getDatabase();
    onValue(ref(db, "/TempusersTest/" + id), async (snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        await setFilesurls(snapshot.val().attachments);
        afterNumAttachments(filesurls);
        // getMetaInfo(filesurls);
      }
    });
  }, [numAttachments]);

  const afterNumAttachments = (filesurls) => {
    if (filesurls.length !== 0) {
      var cnt = 0;
      filesurls.map((url) => {
        if (url !== "no_file") {
          cnt++;
        }
      });
      setNumAttachments(cnt);
    }
  };

  var metaInfo2 = [];

  const getMetaInfo = (filesurls) => {
    var ind = 0;

    if (filesurls.length != 0) {
      filesurls.map((url, i) => {
        if (url !== "no_file") {
          var fileHereRef = sRef(storage, url);
          getMetadata(fileHereRef)
            .then((metadata) => {
              metaInfo2[i] = metadata.name;
            })
            .catch((error) => {
              console.log("Couldn't fetch metadata");
            });
        }
      });
      // setMetaInfo(metaInfo2);
      console.log(ind, metaInfo2);
    }
  };

  setTimeout(() => {
    afterNumAttachments(filesurls);
    // getMetaInfo(filesurls);
  }, 500);

  const updateUploadedFiles = (files) => {
    setNewUserInfo({ ...newUserInfo, profileImages: files });
  };

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
    // get number of files
    setNumfiles(e.target.files.length);
  };

  const handleUpload = () => {
    const promises = [];
    images.map((image) => {
      // const uploadTask = storage.ref(`images/${image.name}`).put(image);
      const storageRef = sRef(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      promises.push(uploadTask);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
          setStatus("(Uploading...)");
        },
        (error) => {
          console.log(error);
        },
        async () => {
          // await storage
          //   .ref("images")
          //   .child(image.name)
          //   .getDownloadURL()
          //   .then((urls) => {
          //     setUrls((prevState) => [...prevState, urls]);
          //     setFilesurls((prevState) => [...prevState, urls]);
          //     setImages([]);
          //     setNumfiles(0);
          //     setStatus("( Uploaded Successfully! )");
          //   });

          // new version of firebase storage
          await getDownloadURL(uploadTask.snapshot.ref).then((urls) => {
            setUrls((prevState) => [...prevState, urls]);
            setFilesurls((prevState) => [...prevState, urls]);
            setImages([]);
            setNumfiles(0);
            setStatus("( Uploaded Successfully! )");
          });
        }
      );
    });
    // console.log(filesurls);
    Promise.all(promises)
      .then(() => {
        console.log("All images uploaded");
      })
      .catch((err) => console.log(err));
  };

  if (urls.length !== 0) {
    const db = getDatabase();

    // update just urls in realtime firebase
    const dburls = {};
    dburls["/TempusersTest/" + clipid + "/attachments/"] = filesurls;

    update(ref(db), dburls)
      .then(() => {
        console.log("post added");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const [newUserInfo, setNewUserInfo] = useState({
    profileImages: [],
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    //logic to handle form...
  };

  const deleteurl = (urlid, url) => {
    const db = getDatabase();
    // var fileRef = storage.refFromURL(url);
    var fileRef = sRef(storage, url);

    // Delete the file using the delete() method
    // fileRef
    //   .delete()
    deleteObject(fileRef)
      .then(function () {
        // File deleted successfully
        console.log("File Deleted");
        const updates = {};
        updates["/TempusersTest/" + clipid + "/attachments/" + urlid] =
          "no_file";
        update(ref(db), updates)
          .then(() => {
            // console.log("URL deleted");
            toggleShow();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const copyText = (url, i) => {
    navigator.clipboard.writeText(url);
  };

  const downloadFile = (url) => {
    // download this url file
    window.open(url);
  };

  // code for getting file metadata
  const metaData = () => {
    // console.log(url);
    // storage
    //   .refFromURL(url)
    //   .getMetadata()
    //   .then((metadata) => {
    //     setFilename(metadata.name);
    //     setFiletype(metadata.contentType);
    //     setFilesize(metadata.size);
    //   })
    //   .catch((error) => {
    //     console.log("Couldn't fetch metadata");
    //   });
  };

  return (
    <div className="attachments ">
      <form onSubmit={handleSubmit}>
        <MDBProgress height="20">
          <MDBProgressBar
            striped
            animated
            valuemin={0}
            valuemax={100}
            width={progress}
          >
            {progress}%
          </MDBProgressBar>
        </MDBProgress>

        <FileUpload
          accept=".jpg,.png,.jpeg,.pdf,.docx,.doc,.ppt,.pptx,.xls,.xlsx,.txt,.zip,.csv"
          label="Your Files"
          multiple
          updateFilesCb={updateUploadedFiles}
          onChange={handleChange}
        />
        <span>Selected {numfiles} files: </span>
        <MDBBtn
          rounded
          className="mx-2"
          color="success"
          onClick={handleUpload}
          type="submit"
        >
          UPLOAD
        </MDBBtn>
        <br />
        <span>{status}</span>
      </form>
      <br />
      <span>
        <b>
          <i>YOU HAVE {numAttachments} ATTACHMENTS:</i>
        </b>
      </span>
      <br />
      <br />
      <br />
      <MDBContainer className="attachment_files mb-6">
        <MDBRow>
          {
            // display map of urls only if no_file
            filesurls &&
              filesurls.map((url, i) => {
                if (url !== "no_file") {
                  return (
                    <MDBCol xl="3" sm="3" key={i}>
                      <MDBBadge
                        pill
                        className="mx-2"
                        color="warning"
                        onClick={() => copyText(url, i)}
                      >
                        {copy}
                      </MDBBadge>
                      <MDBCard>
                        <MDBCardImage
                          src={url || "http://via.placeholder.com/300"}
                          alt="your-file"
                          position="top"
                        />
                        <MDBCardBody className="attachments_files">
                          <MDBBtn
                            outline
                            rounded
                            className=""
                            color="info"
                            target="_blank"
                            download
                            onClick={() => downloadFile(url)}
                          >
                            Download
                          </MDBBtn>

                          <MDBBtn
                            outline
                            rounded
                            className=""
                            color="danger"
                            // onClick={toggleShow}
                            onClick={() => {
                              setDeleteitem(i);
                              setDeleteitemurl(url);
                              setStaticModal(!staticModal);
                            }}
                          >
                            Delete File
                          </MDBBtn>
                          <MDBModal
                            staticBackdrop
                            tabIndex="-1"
                            show={staticModal}
                            setShow={setStaticModal}
                          >
                            <MDBModalDialog className="MDBModalDialog-cls">
                              <MDBModalContent className="MDBModalContent-cls">
                                <MDBModalHeader>
                                  <MDBModalTitle>
                                    Are you sure to Delete this file?
                                  </MDBModalTitle>
                                  <MDBBtn
                                    className="btn-close"
                                    color="none"
                                    onClick={toggleShow}
                                  ></MDBBtn>
                                </MDBModalHeader>
                                <MDBModalFooter>
                                  <MDBBtn
                                    className="mx-4"
                                    color="info"
                                    onClick={toggleShow}
                                  >
                                    Cancel
                                  </MDBBtn>
                                  <MDBBtn
                                    color="danger"
                                    onClick={() => {
                                      deleteurl(deleteitem, deleteitemurl);
                                    }}
                                  >
                                    Delete
                                  </MDBBtn>
                                </MDBModalFooter>
                              </MDBModalContent>
                            </MDBModalDialog>
                          </MDBModal>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  );
                }
              })
          }
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Newindex;
