import React, { useRef, useState } from "react";
import { Button, Grid } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface DragAndDropProps {
  onFilesSelected: (files: FileList | null) => void;
}

const DragAndDrop = ({ onFilesSelected }: DragAndDropProps) => {
  const [highlight, setHighlight] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setHighlight(true);
  };

  const handleDragLeave = () => {
    setHighlight(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setHighlight(false);
    const files = event.dataTransfer.files;
    onFilesSelected(files);
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onFilesSelected(event.target.files);
    }
  };

  return (
    <Grid
      alignItems="center"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      sx={{
        border: "2px dashed",
        borderColor: highlight ? "primary.main" : "grey.400",
        borderRadius: "8px",
        padding: "16px",
        cursor: "pointer",
        "&:hover": {
          borderColor: "primary.main",
        },
      }}
    >
      <Grid item xs={12}>
        Drag and drop your PDF files here or{" "}
        <Button
          onClick={handleButtonClick}
          variant="contained"
          color="secondary"
          startIcon={<CloudUploadIcon />}
        >
          Browse files
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept=".pdf"
          multiple
        />
      </Grid>
      <Grid item xs={12}>
        <small>Only PDF files are allowed</small>
      </Grid>
    </Grid>
  );
};

export default DragAndDrop;