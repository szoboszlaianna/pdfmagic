import { Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import PageCard from "./PageCard";

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
          sx={{
            cursor: index === hovering ? "grab" : "",
          }}
          key={file.name}
          onDragStart={(event) => handleDragStart(event, index)}
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, index)}
          onMouseEnter={() => setHovering(index)}
          onMouseLeave={() => setHovering(null)}
        >
          <PageCard
            file={file}
            pageNumber={index + 1}
            hovering={index === hovering}
            handleDelete={() => handleFileDelete(file)}
            isFile
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default Previews;
