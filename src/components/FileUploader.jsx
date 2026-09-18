const FileUploader = ({ onFileSelect, onWarning }) => {
  const handleChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const fileName = file.name.toLowerCase();

    if (!fileName.endsWith(".jsonl")) {
      onWarning({
        title: "Invalid File",
        message: "Please select a valid .jsonl file.",
      });

      event.target.value = "";
      return;
    }

    if (file.size === 0) {
      onWarning({
        title: "Empty File",
        message: "The selected file is empty. Please select a file containing JSON Lines records.",
      });

      event.target.value = "";
      return;
    }

    onWarning(null);
    onFileSelect(file);

    // Allow selecting the same file again
    event.target.value = "";
  };

  return (
    <div className="file-uploader">
      <label htmlFor="log-file">
        Select Log File
      </label>

      <input
        id="log-file"
        type="file"
        accept=".jsonl"
        onChange={handleChange}
      />
    </div>
  );
};

export default FileUploader;