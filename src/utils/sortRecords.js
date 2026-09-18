export function sortRecords(records, direction) {
  if (direction === "none") {
    return records;
  }

  return [...records].sort((a, b) => {
    const timestampA = new Date(a.timestamp).getTime();
    const timestampB = new Date(b.timestamp).getTime();

    if (direction === "asc") {
      return timestampA - timestampB;
    }

    return timestampB - timestampA;
  });
}