import "./index.scss";

const Textarea = ({
  label,
  name,
  className = "",
  error,
  register,
  rows,
  cols,
  placeholder,
}) => {
  return (
    <div className={`react-form-container textarea ${className}`}>
      <label>{label}</label>
      <textarea
        placeholder={placeholder}
        rows={rows}
        cols={cols}
        {...register(name)}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
};
export default Textarea;
