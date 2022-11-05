const Radio = ({ label, values, name, error, register, className = "" }) => {
  return (
    <div className={`react-form-container radio ${className}`}>
      <label>{label}</label>
      <div className="options">
        {values.map((value) => (
          <span key={value}>
            {value}
            <input {...register(name)} type="radio" name={name} value={value} />
          </span>
        ))}
      </div>
      {error && <span className="error">{error}</span>}
    </div>
  );
};
export default Radio;
