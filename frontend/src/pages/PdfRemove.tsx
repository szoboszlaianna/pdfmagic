import { Box, Button } from "@mui/material";
import { useState } from "react";
import PdfDeletePagesPreview from "../components/PdfDeletePagesPreview";
import UploadCard from "../components/UploadCard";

function PdfRemove() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [deletedPages, setDeletedPages] = useState<number[]>([]);

  function handleUploadComplete(files: File[]): void {
    setUploadedFiles(files);
  }

  function handleFileDelete(): void {
    setUploadedFiles([]);
    setDeletedPages([]);
  }

  function handleRemove() {
    // Create an array of page indexes to remove

    // Create a FormData object and append the file and indexes
    const formData = new FormData();
    formData.append("file", uploadedFiles[0]);
    deletedPages.forEach((index) => {
      formData.append("indexes", String(index));
    });

    // Send a POST request to the /remove endpoint
    fetch("/remove", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to remove pages");
        }
        return response.blob();
      })
      .then((blob) => {
        // Create a temporary URL for the downloaded file
        const url = URL.createObjectURL(blob);

        // Create a link element and trigger the download
        const link = document.createElement("a");
        link.href = url;
        link.download = "updated.pdf";
        link.click();

        // Clean up the temporary URL
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <Box>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <UploadCard onUploadComplete={handleUploadComplete} />
        {uploadedFiles.length > 0 && (
          <>
            <PdfDeletePagesPreview
              file={uploadedFiles[0]}
              deletedPages={deletedPages}
              setDeletedPages={setDeletedPages}
              onFileDelete={handleFileDelete}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleRemove}
            >
              Save
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}

export default PdfRemove;
