import { useMemo, useState } from "react";

import FileUploader from "./components/FileUploader";
import FilterBar from "./components/FilterBar";
import LogTable from "./components/LogTable";
import StatusMessage from "./components/StatusMessage";

import { useNdjsonParser } from "./hooks/useNdjsonParser";
import { sortRecords } from "./utils/sortRecords";
import StatusCard from "./components/StatusCard";
import EventDetailsModal from "./components/EventDetailsModal";

import "./App.css";

function App() {
  const {
    records,
    errors,
    isLoading,
    fileName,
    parseFile,
  } = useNdjsonParser();

  const [selectedEvent, setSelectedEvent] =
    useState("all");

  const [sortDirection, setSortDirection] =
    useState("none");
  const [warning, setWarning] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleViewDetails = (record) => {
    setSelectedRecord(record);
  };

  const handleCloseDetails = () => {
    setSelectedRecord(null);
  };

  /*
   * Extract unique event types
   * from the parsed records.
   */
  const events = useMemo(() => {
    const eventSet = new Set();

    records.forEach((record) => {
      if (record.event_type) {
        eventSet.add(record.event_type);
      }
    });

    return [...eventSet].sort();
  }, [records]);

  /*
   * Filter records by event_type.
   */
  const filteredRecords = useMemo(() => {
    if (selectedEvent === "all") {
      return records;
    }

    return records.filter(
      (record) =>
        record.event_type === selectedEvent
    );
  }, [records, selectedEvent]);

  /*
   * Sort filtered records by timestamp.
   */
  const displayedRecords = useMemo(() => {
    return sortRecords(
      filteredRecords,
      sortDirection
    );
  }, [filteredRecords, sortDirection]);

  /*
   * Reset filters when a new file is selected.
   */
  const handleFileSelect = (file) => {
    setSelectedEvent("all");
    setSortDirection("none");

    parseFile(file);
  };

  return (
    
    <div className="app">
      <header className="app-header">
        <h1>Suricata Log Viewer</h1>

        <p>
          Upload and analyze NDJSON log files
        </p>
      </header>

      <main className="container">
        <section className="upload-section">
          <FileUploader
            onFileSelect={handleFileSelect}
            onWarning={setWarning}
          />

          {isLoading && (
            <p className="loading">
              Reading and validating file...
            </p>
          )}
        </section>

        {warning ? (
          <StatusCard
            type="warning"
            title={warning.title}
            message={warning.message}
          />
        ) : (
          <>
            {records.length > 0 && (
              <FilterBar
                events={events}
                selectedEvent={selectedEvent}
                sortDirection={sortDirection}
                onEventChange={setSelectedEvent}
                onSortChange={setSortDirection}
              />
            )}

            <div className="record-summary">
              Showing <strong>{displayedRecords.length}</strong> of{" "}
              <strong>{records.length}</strong> records
            </div>

            <LogTable
              records={displayedRecords}
              onViewDetails={handleViewDetails}
            />
          </>
        )}
      
        <EventDetailsModal
          record={selectedRecord}
          onClose={handleCloseDetails}
        />
      </main>
    </div>
  );
}

export default App;