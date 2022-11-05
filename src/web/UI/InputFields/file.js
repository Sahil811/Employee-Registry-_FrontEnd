import "./index.scss";

const File = ({ label, name, className = "", error, register }) => {
  return (
    <div className={`react-form-container file ${className}`}>
      <label>{label}</label>
      <input type={"file"} {...register(name)} />
      {error && <span className="error">{error}</span>}
    </div>
  );
};
export default File;
