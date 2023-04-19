import { Box, Container } from "@mui/material";
import { useState } from "react";
import "./App.css";
import MergeButton from "./components/MergeButton";
import Navbar from "./components/Navbar";
import Previews from "./components/Previews";
import UploadCard from "./components/UploadCard";

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
      <Container sx={{ marginTop: "2rem" }}>
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
              <Previews
                uploadedFiles={uploadedFiles}
                onDelete={handleFileDelete}
              />
              <MergeButton uploadedFiles={uploadedFiles} />
            </>
          )}
        </Box>
      </Container>
    </>
  );
}

export default App;
