import { Box } from "@mui/material";
import PdfPreview from "./PdfPreview";

interface PdfPreviewProps {
  uploadedFiles: FileList;
}

function Previews({ uploadedFiles }: PdfPreviewProps) {
  console.log(uploadedFiles);

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
        <PdfPreview file={file} key={file.name} />
      ))}
    </Box>
  );
}

export default Previews;
