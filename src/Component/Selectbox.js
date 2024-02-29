import React from "react";
import Spinner from "../views/loading";

const SelectBox = ({
  id,
  options,
  defaultValue,
  onChange,
  className,
  label,
  loading,
}) => {
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <small>{label}</small>
          <select
            className={`form-control form-control-sm ${className}`}
            id={id}
            name={id}
            placeholder={label}
            value={defaultValue}
            onChange={onChange}
            // defaultValue="DEFAULT"
          >
            <option
              key="-1"
              value="DEFAULT"
              attrb1={0}
              attrb2={0}
              selected
            >{`-- Select ${label} --`}</option>
            {options ? (
              options.length < 1 ? (
                <option disabled={true}>No Data</option>
              ) : (
                options.map((option) => (
                  <option
                    key={option.id}
                    value={option.id}
                    attrb1={option.attrb1} //attribute tambahan untuk passing data lain (contoh pada menu add trx untuk set stock dan harga)
                    attrb2={option.attrb2} //attribute tambahan untuk passing data lain (contoh pada menu add trx untuk set stock dan harga)
                  >
                    {option.id + " - " + option.value}
                  </option>
                ))
              )
            ) : (
              // ) : getCategories ? (
              //   <option disabled={true}>Error</option>
              <option disabled={true}>Error When Parsing Data</option>
            )}
          </select>
        </>
      )}
    </>
  );
};

export default SelectBox;
