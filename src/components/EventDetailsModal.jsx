import { useEffect } from "react";
import { formatEvent } from "../utils/eventFormatter";

const EventDetailsModal = ({ record, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [onClose]);

  if (!record) {
    return null;
  }

  const event = formatEvent(record);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={handleBackdropClick}
    >
      <div
        className="event-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-details-title"
      >
        <div className="modal-header">
          <div>
            <span
              className={`severity-badge ${event.severity.className}`}
            >
              {event.severity.label}
            </span>

            <h2 id="event-details-title">
              {event.eventType} Details
            </h2>
          </div>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close details"
          >
            ×
          </button>
        </div>

        <div className="modal-content">
          <div className="details-grid">
            <div className="detail-item">
              <span>Timestamp</span>
              <strong>{event.timestamp}</strong>
            </div>

            <div className="detail-item">
              <span>Event Type</span>
              <strong>{event.eventType}</strong>
            </div>

            <div className="detail-item">
              <span>Severity</span>
              <strong>{event.severity.label}</strong>
            </div>

            <div className="detail-item">
              <span>Source</span>
              <strong>{event.source}</strong>
            </div>

            <div className="detail-item">
              <span>Destination</span>
              <strong>{event.destination}</strong>
            </div>

            <div className="detail-item detail-summary">
              <span>Summary</span>
              <strong>{event.summary}</strong>
            </div>
          </div>

          {event.details.length > 0 && (
            <section className="additional-details">
              <h3>Event Information</h3>

              <div className="details-list">
                {event.details.map(({ label, value }) => (
                  <div
                    className="detail-item"
                    key={label}
                  >
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="close-button"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;