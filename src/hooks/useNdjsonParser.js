import { useState } from "react";
import { parseNdjson } from "../utils/ndJsonParser";

export function useNdjsonParser() {
  const [records, setRecords] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  const parseFile = (file) => {
    setIsLoading(true);
    setRecords([]);
    setErrors([]);
    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const content = event.target.result;

        const result = parseNdjson(content);

        setRecords(result.records);
        setErrors(result.errors);
      } catch (error) {
        setErrors([
          {
            line: null,
            message: "Unexpected error while parsing the file",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    reader.onerror = () => {
      setErrors([
        {
          line: null,
          message: "Unable to read the selected file",
        },
      ]);

      setIsLoading(false);
    };

    reader.readAsText(file);
  };

  const reset = () => {
    setRecords([]);
    setErrors([]);
    setFileName("");
  };

  return {
    records,
    errors,
    isLoading,
    fileName,
    parseFile,
    reset,
  };
}