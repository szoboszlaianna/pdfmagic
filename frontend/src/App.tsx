import { Container } from "@mui/material";
import { useState } from "react";
import "./App.css";
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
      <Container maxWidth="sm" sx={{ marginTop: "2rem" }}>
        <UploadCard onUploadComplete={handleUploadComplete} />
        {uploadedFiles && <Previews uploadedFiles={uploadedFiles} />}
      </Container>{" "}
    </>
  );
}

export default App;
