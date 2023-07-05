import { Box } from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack5";
interface PdfPagePreviewProps {
  file: File;
  pageNumber: number;
  onDocumentLoadSuccess?: (pdf: pdfjs.PDFDocumentProxy) => void;
}

function PdfPagePreview({
  file,
  pageNumber,
  onDocumentLoadSuccess,
}: PdfPagePreviewProps) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  return (
    <>
      {" "}
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        <div style={{ position: "relative" }}>
          <Page
            pageNumber={pageNumber}
            scale={0.9}
            width={250}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </div>
      </Document>
    </>
  );
}

export default PdfPagePreview;
