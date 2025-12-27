const Field = ({ label, value }) => {
  return (
    <div className="glass p-4 rounded-xl border border-white/10">
      <span className="text-gray-400 text-sm block mb-1">{label}</span>
      <span className="font-semibold text-lg">{value}</span>
    </div>
  );
};

export default Field;
