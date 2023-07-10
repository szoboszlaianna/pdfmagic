import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack5";
interface PdfPagePreviewProps {
  file: File;
  pageNumber: number;
  onDocumentLoadSuccess?: (pdf: pdfjs.PDFDocumentProxy) => void;
  width?: number;
}

function PdfPagePreview({
  file,
  pageNumber,
  onDocumentLoadSuccess,
  width = 160,
}: PdfPagePreviewProps) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  return (
    <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
      <div style={{ position: "relative" }}>
        <Page
          pageNumber={pageNumber}
          width={width}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </div>
    </Document>
  );
}

export default PdfPagePreview;
