import React, { useRef, useState } from "react";
import {
  Box,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import StyledCard from "./StyledCard";
import AddIcon from "@mui/icons-material/Add";

interface PageUploadCardProps {
  onUploadComplete: (files: File[]) => void;
  multiple: boolean;
}

function PageUploadCard({ onUploadComplete, multiple }: PageUploadCardProps) {
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
    const files: File[] = Array.from(event.dataTransfer.files);
    handleFilesSelected(files);
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files: File[] = Array.from(event.target.files || []);
    handleFilesSelected(files);
  };

  const handleFilesSelected = (files: File[]) => {
    if (!files || files.length === 0) {
      // Handle no files selected
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });

    fetch("/upload_files", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error uploading files");
        }
        return response.json();
      })
      .then(() => {
        onUploadComplete(files);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error uploading files");
      });
  };

  return (
    <StyledCard>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          position: "relative",
          alignItems: "center",
        }}
      >
        <CardContent
          sx={{
            flexGrow: 1,
          }}
        >
          <Box
            alignItems="center"
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 2,
              border: "2px dashed",
              borderColor: highlight ? "primary.main" : "grey.400",
              borderRadius: "8px",
              cursor: "pointer",
              width: 160,
              height: "100%",
              position: "relative",
              flexGrow: 2,
              "&:hover": {
                borderColor: "primary.main",
              },
            }}
          >
            <IconButton onClick={handleButtonClick} size="large">
              <AddIcon fontSize="large" color="inherit" />
            </IconButton>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept=".pdf"
              multiple={multiple}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Typography variant="body2" color="text.secondary" align="center">
            Add file
          </Typography>
        </CardActions>
      </Box>
    </StyledCard>
  );
}

export default PageUploadCard;
