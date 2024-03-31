import React from "react";
import Loading from "../Loading";

const InputField = ({ "data-loading": isLoading, ...props }) => {
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {props.label != null ? <small>{props.label}</small> : <></>}
          <input
            className={`form-control form-control-sm ${props.className}`}
            {...props}
          ></input>
          {props.error != null ? (
            <small className="text-danger">{props.error}</small>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export default InputField;
