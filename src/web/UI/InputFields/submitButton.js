export default function Button({ type = "submit", className = "" }) {
  return (
    <div className={`react-form-container submit-button ${className}`}>
      <input type={type} />
    </div>
  );
}
