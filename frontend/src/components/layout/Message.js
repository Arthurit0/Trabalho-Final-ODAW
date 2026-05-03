import React, { useEffect, useState } from "react";
import bus from "../../utils/bus";

import styles from "./Message.module.css";

function Message() {
  let [visibility, setVisibility] = useState(false);
  let [message, setMessage] = useState("");
  let [type, setType] = useState("");

  useEffect(() => {
    let timeoutId;

    const handleFlash = ({ message, type }) => {
      setVisibility(true);
      setMessage(message);
      setType(type);

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setVisibility(false);
      }, 5000);
    };

    bus.addListener("flash", handleFlash);

    return () => {
      clearTimeout(timeoutId);
      bus.removeListener("flash", handleFlash);
    };
  }, []);

  return (
    visibility && (
      <div
        className={`${styles.message} ${styles[type]}`}
        role="alert"
        aria-live="polite"
      >
        {message}
      </div>
    )
  );
}

export default Message;
