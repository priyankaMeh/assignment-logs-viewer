function FilterBar({
  events,
  selectedEvent,
  sortDirection,
  onEventChange,
  onSortChange,
}) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="event-filter">
          Filter by Event
        </label>

        <select
          id="event-filter"
          value={selectedEvent}
          onChange={(event) =>
            onEventChange(event.target.value)
          }
        >
          <option value="all">
            All Events
          </option>

          {events.map((event) => (
            <option key={event} value={event}>
              {event}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="timestamp-sort">
          Sort by Timestamp
        </label>

        <select
          id="timestamp-sort"
          value={sortDirection}
          onChange={(event) =>
            onSortChange(event.target.value)
          }
        >
          <option value="none">
            No Sorting
          </option>

          <option value="asc">
            Timestamp: Ascending
          </option>

          <option value="desc">
            Timestamp: Descending
          </option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;