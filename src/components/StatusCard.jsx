const StatusCard = ({ type = "warning", title, message }) => {
  return (
    <div className={`status-card ${type}`}>
      <div className="status-icon">
        {type === "warning" ? "⚠" : "✓"}
      </div>

      <div className="status-content">
        <h3>{title}</h3>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default StatusCard;