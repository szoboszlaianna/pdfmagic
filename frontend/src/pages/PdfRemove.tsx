import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import PdfPagesPreview from "../components/PdfPagesPreview";
import Previews from "../components/Previews";
import UploadCard from "../components/UploadCard";

function PdfRemove() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  function handleUploadComplete(files: File[]): void {
    setUploadedFiles((prevUploadedFiles: File[]) => [
      ...prevUploadedFiles,
      ...files,
    ]);
  }

  function handleFileDelete(fileToDelete: File): void {
    const newList = uploadedFiles.filter((file: File) => file !== fileToDelete);
    setUploadedFiles(newList);
  }

  function handleRemove() {
    console.log("remove");
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
              onDelete={handleFileDelete}
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
