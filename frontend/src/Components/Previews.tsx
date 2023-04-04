import PdfPreview from "./PdfPreview";
import { Box } from "@mui/material";

interface PdfPreviewProps {
  uploadedFiles: FileList;
}

function Previews({ uploadedFiles }: PdfPreviewProps) {
  console.log(uploadedFiles);

  return (
    <div>
      {Array.from(uploadedFiles).map((file) => (
        <div key={file.name}>
          <PdfPreview file={file} />
        </div>
      ))}
    </div>
  );
}

export default Previews;
