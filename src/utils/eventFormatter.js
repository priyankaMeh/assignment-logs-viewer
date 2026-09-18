const formatLabel = (key) =>
  key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return timestamp;
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(date);
};

const formatEndpoint = (ip, port) => {
  if (!ip) {
    return "N/A";
  }

  return port ? `${ip}:${port}` : ip;
};

const getSeverity = (record) => {
  const severity = Number(record.severity);

  if (severity === 1) {
    return {
      label: "High",
      className: "high",
    };
  }

  if (severity === 2) {
    return {
      label: "Medium",
      className: "medium",
    };
  }

  if (severity === 3) {
    return {
      label: "Low",
      className: "low",
    };
  }

  if (record.severity) {
    const value = String(record.severity).toLowerCase();

    if (["critical", "high"].includes(value)) {
      return {
        label: "High",
        className: "high",
      };
    }

    if (value === "medium") {
      return {
        label: "Medium",
        className: "medium",
      };
    }

    if (value === "low") {
      return {
        label: "Low",
        className: "low",
      };
    }
  }

  return {
    label: "Info",
    className: "info",
  };
};

const getEventSummary = (record) => {
  const eventType = String(record.event_type || "event").toLowerCase();

  const source = formatEndpoint(record.src_ip, record.src_port);
  const destination = formatEndpoint(
    record.dest_ip,
    record.dest_port
  );

  const summaries = {
    alert: `Security alert detected from ${source} to ${destination}.`,

    dns: record.query
      ? `DNS query for ${record.query} was observed.`
      : `DNS activity was observed from ${source}.`,

    http: record.hostname
      ? `HTTP activity involving ${record.hostname} was observed.`
      : `HTTP traffic was observed from ${source}.`,

    tls: record.sni
      ? `TLS connection to ${record.sni} was observed.`
      : `TLS traffic was observed from ${source}.`,

    ssh: `SSH traffic was observed from ${source} to ${destination}.`,

    flow: `Network flow was recorded from ${source} to ${destination}.`,

    stats: "Suricata statistics were recorded.",

    fileinfo: "File information was detected in network traffic.",
  };

  return (
    summaries[eventType] ||
    `${formatLabel(record.event_type || "Network event")} was detected.`
  );
};

const isSimpleValue = (value) =>
  value === null ||
  value === undefined ||
  ["string", "number", "boolean"].includes(typeof value);

const formatValue = (value) => {
  if (value === null || value === undefined) {
    return "N/A";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (typeof value === "number") {
    return value.toLocaleString("en-IN");
  }

  return String(value);
};

const getDetailFields = (record) => {
  const excludedFields = new Set([
    "timestamp",
    "event_type",
  ]);

  return Object.entries(record)
    .filter(
      ([key, value]) =>
        !excludedFields.has(key) &&
        isSimpleValue(value)
    )
    .map(([key, value]) => ({
      label: formatLabel(key),
      value: formatValue(value),
    }));
};

const formatEvent = (record) => ({
  timestamp: formatTimestamp(record.timestamp),
  eventType: formatLabel(record.event_type),
  source: formatEndpoint(record.src_ip, record.src_port),
  destination: formatEndpoint(
    record.dest_ip,
    record.dest_port
  ),
  severity: getSeverity(record),
  summary: getEventSummary(record),
  details: getDetailFields(record),
});

export {
  formatEvent,
};