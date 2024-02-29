import React from "react";

function Spinner(props) {
  return (
    <div className="row justify-content-center align-items-center">
      <div className={`spinner-border text-primary ${props.className}`}>
        <span className="sr-only">{props.title}</span>
      </div>
    </div>
  );
}

export default Spinner;
