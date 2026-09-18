function StatusMessage({
  recordsCount,
  errorsCount,
  fileName,
}) {
  return (
    <div className="status-message">
      {fileName && (
        <p>
          <strong>File:</strong> {fileName}
        </p>
      )}

      <p className="success">
        ✓ Valid records: {recordsCount}
      </p>

      {errorsCount > 0 && (
        <p className="warning">
          ⚠ Invalid records skipped: {errorsCount}
        </p>
      )}
    </div>
  );
}

export default StatusMessage;