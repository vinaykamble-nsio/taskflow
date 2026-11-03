export const Input = ({ title, type, placeholder, value, onChange }) => {
  return (
    <label>
      {title}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};
