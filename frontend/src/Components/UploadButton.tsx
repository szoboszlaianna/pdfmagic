import { Button, Grid } from "@mui/material";
import React, { useRef } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface FileUploadButtonProps {
  onFilesSelected: (files: FileList | null) => void;
}

const UploadButton = ({ onFilesSelected }: FileUploadButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          startIcon={<CloudUploadIcon />}
          onClick={handleButtonClick}
        >
          Upload Files
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          multiple
          accept="application/pdf"
        />
      </Grid>
    </Grid>
  );
};

export default UploadButton;
