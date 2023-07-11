import { Box } from "@mui/material";
import { useState } from "react";
import MergeButton from "../components/MergeButton";
import Previews from "../components/Previews";
import UploadCard from "../components/UploadCard";

function PdfMerge() {
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

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {uploadedFiles.length === 0 && (
        <UploadCard onUploadComplete={handleUploadComplete} multiple />
      )}
      {uploadedFiles.length > 0 && (
        <>
          <Previews
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
            onDelete={handleFileDelete}
          />
          <MergeButton uploadedFiles={uploadedFiles} />
        </>
      )}
    </Box>
  );
}

export default PdfMerge;
