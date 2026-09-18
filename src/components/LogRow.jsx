function LogRow({ record, index }) {
  return (
    <div className="log-row">
      <div className="log-number">
        {index + 1}
      </div>

      <div className="log-content">
        <div className="log-meta">
          <span className="event-badge">
            {record.event_type}
          </span>

          <span className="timestamp">
            {record.timestamp}
          </span>
        </div>

        <pre>
          {JSON.stringify(record, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default LogRow;