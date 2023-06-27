import { Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import PdfPreview from "./PdfPreview";

interface PdfPreviewProps {
  uploadedFiles: File[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  onDelete: (file: File) => void;
}

function Previews({
  uploadedFiles,
  onDelete,
  setUploadedFiles,
}: PdfPreviewProps) {
  const [files, setFiles] = useState(uploadedFiles);
  const [hovering, setHovering] = useState<number | null>(null);

  useEffect(() => {
    setFiles(uploadedFiles);
  }, [uploadedFiles]);

  const handleFileDelete = useCallback(
    (fileToDelete: File) => {
      onDelete(fileToDelete);
    },
    [onDelete]
  );

  const handleDragStart = useCallback(
    (event: React.DragEvent<HTMLDivElement>, index: number) => {
      event.dataTransfer.setData("text/plain", index.toString());
    },
    []
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    },
    []
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>, index: number) => {
      event.preventDefault();
      const sourceIndex = Number(event.dataTransfer.getData("text/plain"));
      const updatedFiles = [...files];
      const [draggedFile] = updatedFiles.splice(sourceIndex, 1);
      updatedFiles.splice(index, 0, draggedFile);
      setUploadedFiles(updatedFiles);
    },
    [files]
  );

  return (
    <Grid container sx={{ marginTop: 8 }} spacing={2} justifyContent="center">
      {files.map((file, index) => (
        <Grid
          item
          draggable
          xs={8}
          sm={5}
          md={3}
          sx={{
            cursor: index === hovering ? "grab" : "",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: 2,
            padding: 1,
            position: "relative",
            height: 300,
            justifyContent: "center",
            backgroundColor: "rgba(255,141,84, 0.6)",
            borderRadius: 5,
            border: index === hovering ? "2px solid #FFF" : "none",
            opacity: index === hovering ? 1 : 0.8,
          }}
          key={file.name}
          onDragStart={(event) => handleDragStart(event, index)}
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, index)}
          onMouseEnter={() => setHovering(index)}
          onMouseLeave={() => setHovering(null)}
        >
          <PdfPreview
            file={file}
            onFileDelete={handleFileDelete}
            hovering={index === hovering}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default Previews;
