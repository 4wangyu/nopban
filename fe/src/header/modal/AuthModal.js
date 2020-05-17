import React from "react";
import Modal from "react-bootstrap/Modal";
import "./modal.css";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";

const AuthModal = (props) => {
  const [tab, setTab] = React.useState("signin");

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <button className="close" onClick={props.onHide}>
          X
        </button>
      </Modal.Header>
      <Modal.Body>
        <ul className="tabs">
          <li
            className={"list-item " + (tab === "signin" ? "active" : "")}
            onClick={() => setTab("signin")}
          >
            登录
          </li>
          <li
            className={"list-item " + (tab === "signup" ? "active" : "")}
            onClick={() => setTab("signup")}
          >
            注册
          </li>
        </ul>
        {tab === "signin" ? (
          <SignIn></SignIn>
        ) : (
          <SignUp toSignIn={() => setTab("signin")}></SignUp>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;
