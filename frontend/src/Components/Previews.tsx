import { Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import PageCard from "./PageCard";
import PageUploadCard from "./PageUploadCard";
import { pdfjs } from "react-pdf";

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
  const [numPages, setNumPages] = useState(0);

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

  const handleFileUpload = (files: File[]) => {
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  return (
    <Grid container sx={{ marginTop: 8 }} spacing={2} justifyContent="center">
      {files.map((file, index) => (
        <Grid
          item
          draggable
          sx={{
            cursor: index === hovering ? "grab" : "",
          }}
          key={index}
          onDragStart={(event) => handleDragStart(event, index)}
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, index)}
          onMouseEnter={() => setHovering(index)}
          onMouseLeave={() => setHovering(null)}
        >
          <PageCard
            file={file}
            pageNumber={1}
            numPages={numPages}
            hovering={index === hovering}
            handleDelete={() => handleFileDelete(file)}
            onDocumentLoadSuccess={(pdf: pdfjs.PDFDocumentProxy) =>
              setNumPages(pdf.numPages)
            }
          />
        </Grid>
      ))}
      <Grid item>
        <PageUploadCard onUploadComplete={handleFileUpload} multiple />
      </Grid>
    </Grid>
  );
}

export default Previews;
