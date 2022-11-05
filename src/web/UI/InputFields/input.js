import "./index.scss";

const Input = ({
  label,
  name,
  className = "",
  error,
  register,
  placeholder = "",
}) => {
  return (
    <div className={`react-form-container ${className}`}>
      <label>{label}</label>
      <input placeholder={placeholder} {...register(name)} />
      {error && <span className="error">{error}</span>}
    </div>
  );
};
export default Input;
