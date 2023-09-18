import { Box, Button } from "@mui/material";
import { useState } from "react";
import PdfPagesPreview from "../components/PdfPagesPreview";
import UploadCard from "../components/UploadCard";

function PdfReorder() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [pageOrder, setPageOrder] = useState<number[]>([0]);

  function handleUploadComplete(files: File[]): void {
    setUploadedFiles(files);
  }

  function handleReorder() {
    const formData = new FormData();
    formData.append("file", uploadedFiles[0]);
    pageOrder.forEach((index) => {
      formData.append("indexes", String(index));
    });
    // Send a POST request to the /remove endpoint
    fetch("/reorder", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to reorder pages");
        }
        return response.blob();
      })
      .then((blob) => {
        // Create a temporary URL for the downloaded file
        const url = URL.createObjectURL(blob);

        // Create a link element and trigger the download
        const link = document.createElement("a");
        link.href = url;
        link.download = "sorted_pages.pdf";
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
            <PdfPagesPreview
              file={uploadedFiles[0]}
              pageOrder={pageOrder}
              setPageOrder={setPageOrder}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleReorder}
            >
              Save
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}

export default PdfReorder;
