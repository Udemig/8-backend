const ListField = ({ label, values }) => {
  return (
    <div className="glass p-5 rounded-xl border border-white/10">
      <h3 className="text-gray-400 text-sm mb-3">{label}</h3>

      <div className="flex gap-2 flex-wrap">
        {values.map((item, index) => (
          <span
            key={index}
            className="glass px-4 py-2 rounded-full font-medium text-purple-300 border border-purple-500/30"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ListField;
