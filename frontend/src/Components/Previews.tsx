import { Box } from "@mui/material";
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
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {Array.from(uploadedFiles).map((file) => (
        <PdfPreview
          file={file}
          key={file.name}
          onFileDelete={handleFileDelete}
        />
      ))}
    </Box>
  );
}

export default Previews;
