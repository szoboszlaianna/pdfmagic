import { Box, Container } from "@mui/material";
import { useState } from "react";
import "./App.css";
import MergeButton from "./Components/MergeButton";
import Navbar from "./Components/Navbar";
import Previews from "./Components/Previews";
import UploadCard from "./Components/UploadCard";

function App() {
  // useEffect(() => {
  //   axios.get("/hello")
  // }, [])

  const [uploadedFiles, setUploadedFiles] = useState<FileList | null>(null);

  function handleUploadComplete(files: FileList): void {
    setUploadedFiles(files);
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
        {uploadedFiles && (
          <>
            <Previews uploadedFiles={uploadedFiles} />
            <MergeButton uploadedFiles={uploadedFiles} />
          </>
        )}
      </Container>
    </>
  );
}

export default App;
