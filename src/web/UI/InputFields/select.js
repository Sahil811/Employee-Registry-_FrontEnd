import React from "react";
import "./index.scss";

const Select = React.forwardRef(
  (
    { onChange, onBlur, name, label, optionsList, error, className = "" },
    ref
  ) => {
    return (
      <div className={`react-form-container select ${className}`}>
        <label>{label}</label>
        <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
          {optionsList.map((option, index) => (
            <option value={option} key={index}>
              {option}
            </option>
          ))}
        </select>
        {error && <span className="error">{error}</span>}
      </div>
    );
  }
);
export default Select;
