import React from "react";
import Toast from "react-bootstrap/Toast";
import "./toast.css";

const ToastBox = (props) => {
  const { show, setShow, message, type } = props;
  return (
    <div>
      <Toast
        onClose={() => setShow(false)}
        show={show}
        className={type}
        delay={3000}
        autohide
      >
        <Toast.Header>{message}</Toast.Header>
      </Toast>
    </div>
  );
};

export default ToastBox;
