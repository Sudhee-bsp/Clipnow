import { useState, React, useEffect } from "react";

import {
  getDatabase,
  ref,
  set,
  child,
  onValue,
  remove,
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
  });

  return (
    <div>
      <div class="about">
        <h1 class="about_heading">About Clipnow</h1>
        <p class="about_content">
          Clipnow is a simple and easy-to-use personal clipboard that allows you
          to clip and save links, images, and text from the web. It is a great
          way to save content that you want to read, share or reference later.
        </p>
        <p class="paragraph">
          To use Clipnow, simply enter a unique alphanumeric text{" "}
          <b>
            <i>("clipID")</i>
          </b>{" "}
          and create it then use the textarea to save your content, and then
          after created you can attach any media files (currently supporting
          jpg, png, gif, pdf, docs, xls).{" "}
          <i>Any kind of video formats are not supported</i>, to restrict the
          database usage. You can delete or update your clip anytime on any
          device.
          <br />
          <br />
          <b>
            <i>Create, Share, get it DONE.</i>
          </b>
        </p>
        <p class="paragraph"></p>
        <br />
        <p class="paragraph">Built with 💙 for CODE</p>

        <p class="paragraph">
          <i>
            So far, Clipnow created <b>{count} +</b> & counting
          </i>
        </p>
      </div>
    </div>
  );
};

export default Aboutpage;
