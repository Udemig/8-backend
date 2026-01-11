// HOC: Higher Order Component
// Farklı bir component veya elementi kapsayarak ona ekstra özellikler kazandıran component yapısıdır.
const Field = ({ children, label }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-stone-700">{label}</label>

      {children}
    </div>
  );
};

export default Field;
