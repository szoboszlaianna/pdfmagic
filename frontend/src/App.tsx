import { Box, Container } from "@mui/material";
import { useState } from "react";
import "./App.css";
import MergeButton from "./Components/MergeButton";
import Navbar from "./Components/Navbar";
import Previews from "./Components/Previews";
import UploadCard from "./Components/UploadCard";

function App() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  function handleUploadComplete(files: File[]): void {
    setUploadedFiles((prevUploadedFiles: File[]) => [
      ...prevUploadedFiles,
      ...files,
    ]);
  }

  function handleFileDelete(fileToDelete: File): void {
    setUploadedFiles((prevUploadedFiles: File[]) =>
      prevUploadedFiles.filter((file) => file !== fileToDelete)
    );
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ marginTop: "2rem" }}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <UploadCard onUploadComplete={handleUploadComplete} />
        </Box>
        {uploadedFiles.length > 0 && (
          <>
            <Previews
              uploadedFiles={uploadedFiles}
              onDelete={handleFileDelete}
            />
            <MergeButton uploadedFiles={uploadedFiles} />
          </>
        )}
      </Container>
    </>
  );
}

export default App;
