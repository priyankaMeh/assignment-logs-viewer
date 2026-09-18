import { formatEvent } from "../utils/eventFormatter";

const EventCard = ({ record, onViewDetails }) => {
  const event = formatEvent(record);

  return (
    <article className={`event-card ${event.severity.className}`}>
      <div className="event-card-header">
        <div>
          <span
            className={`severity-badge ${event.severity.className}`}
          >
            {event.severity.label}
          </span>

          <span className="event-type">
            {event.eventType}
          </span>
        </div>

        <span className="event-timestamp">
          {event.timestamp}
        </span>
      </div>

      <div className="event-fields">
        <div className="event-field">
          <span>Event Type</span>
          <strong>{event.eventType}</strong>
        </div>

        <div className="event-field">
          <span>Source</span>
          <strong>{event.source}</strong>
        </div>

        <div className="event-field">
          <span>Destination</span>
          <strong>{event.destination}</strong>
        </div>

        <div className="event-field summary-field">
          <span>Summary</span>
          <strong>{event.summary}</strong>
        </div>
      </div>

      <div className="event-card-footer">
        <button
          type="button"
          className="details-button"
          onClick={() => onViewDetails(record)}
        >
          View Details
        </button>
      </div>
    </article>
  );
};

export default EventCard;