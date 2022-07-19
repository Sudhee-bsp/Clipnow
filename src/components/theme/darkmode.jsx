import React, { useEffect } from "react";
import useDarkMode from "use-dark-mode";

import "./styles.scss";

const Toggle = ({ checked, onChange }) => (
  <span className="toggle-control">
    <input
      className="dmcheck"
      type="checkbox"
      checked={checked}
      onChange={onChange}
      id="dmcheck"
    />
    <label htmlFor="dmcheck" />
  </span>
);

const DarkModeToggle = () => {
  const darkMode = useDarkMode(false);

  useEffect(() => {
    if (darkMode.value) {
      localStorage.setItem("clipDarkMode", "true");
    } else {
      localStorage.setItem("clipDarkMode", "false");
    }
    console.log(darkMode.value);
  }, [darkMode.value]);

  return (
    <div className="dark-mode-toggle">
      <button type="button" onClick={darkMode.disable}>
        ☀
      </button>
      <Toggle checked={darkMode.value} onChange={darkMode.toggle} />
      <button type="button" onClick={darkMode.enable}>
        ☾
      </button>
    </div>
  );
};

export default DarkModeToggle;
