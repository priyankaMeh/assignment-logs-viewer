export function parseNdjson(content) {
  const records = [];
  const errors = [];

  const lines = content.split(/\r?\n/);

  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    const trimmedLine = line.trim();

    // Ignore empty rows
    if (!trimmedLine) {
      return;
    }

    try {
      const parsed = JSON.parse(trimmedLine);

      // Every NDJSON record must be an object
      if (
        typeof parsed !== "object" ||
        parsed === null ||
        Array.isArray(parsed)
      ) {
        errors.push({
          line: lineNumber,
          message: "Record must be a JSON object",
        });

        return;
      }

      // Suricata record must contain event_type
      if (!parsed.event_type) {
        errors.push({
          line: lineNumber,
          message: "Missing event_type",
        });

        return;
      }

      // Suricata record must contain timestamp
      if (!parsed.timestamp) {
        errors.push({
          line: lineNumber,
          message: "Missing timestamp",
        });

        return;
      }

      // Make sure timestamp is valid
      const timestamp = new Date(parsed.timestamp);

      if (Number.isNaN(timestamp.getTime())) {
        errors.push({
          line: lineNumber,
          message: "Invalid timestamp",
        });

        return;
      }

      records.push(parsed);
    } catch (error) {
      errors.push({
        line: lineNumber,
        message: "Invalid JSON",
      });
    }
  });

  return {
    records,
    errors,
  };
}