const Checkbox = (
  { label, values, name, error, register, className = "" },
  ref
) => {
  return (
    <div className={`react-form-container checkbox ${className}`}>
      <label className="heading">{label}</label>
      <div className="options">
        {values.map((value) => (
          <span key={value}>
            {value}
            <input
              type="checkbox"
              {...register(name)}
              name={name}
              value={value}
            />
          </span>
        ))}
      </div>

      {error && <span className="error">{error}</span>}
    </div>
  );
};
export default Checkbox;
