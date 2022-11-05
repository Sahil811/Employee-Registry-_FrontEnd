import { useState } from "react";
import "./index.scss";

// assets import eye open and close
import Icons from "../../assets/icons";

const Password = ({
  label,
  name,
  className = "",
  error,
  register,
  placeholder = "",
}) => {
  const [isHidden, setiSHidden] = useState(true);
  return (
    <div className={`react-form-container password ${className}`}>
      <label>{label}</label>
      <div className="password-field">
        <input
          type={isHidden ? "password" : "text"}
          placeholder={placeholder}
          {...register(name)}
        />
        <img
          onClick={() => setiSHidden(!isHidden)}
          src={isHidden ? Icons.view : Icons.hide}
          alt="eye-image"
        />
      </div>
      {error && <span className="error">{error}</span>}
    </div>
  );
};
export default Password;
