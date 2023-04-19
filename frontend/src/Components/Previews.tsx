import { Box, Grid } from "@mui/material";
import { useCallback } from "react";
import PdfPreview from "./PdfPreview";

interface PdfPreviewProps {
  uploadedFiles: File[];
  onDelete: (file: File) => void;
}

function Previews({ uploadedFiles, onDelete }: PdfPreviewProps) {
  const handleFileDelete = useCallback(
    (fileToDelete: File) => {
      onDelete(fileToDelete);
    },
    [onDelete]
  );

  return (
    <Grid container sx={{ marginTop: 8 }} spacing={2} justifyContent="center">
      {Array.from(uploadedFiles).map((file) => (
        <PdfPreview
          file={file}
          key={file.name}
          onFileDelete={handleFileDelete}
        />
      ))}
    </Grid>
  );
}

export default Previews;
