import React from "react";
import "./index.scss";
import Backdrop from "../Backdrop";

const Modal = (props) => {
  return (
    <div>
      <Backdrop show={props.show} clicked={props.modalHandler} />
      <div
        className={"Modal"}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </div>
  );
};

export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
