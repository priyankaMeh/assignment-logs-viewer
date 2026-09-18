import EventCard from "./EventCard";

const LogTable = ({ records, onViewDetails }) => {
  if (!records.length) {
    return (
      <div className="empty-state">
        No records found.
      </div>
    );
  }

  return (
    <div className="event-list">
      {records.map((record, index) => (
        <EventCard
          key={`${record.timestamp}-${index}`}
          record={record}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};

export default LogTable;