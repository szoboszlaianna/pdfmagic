import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import { useState } from "react";

interface PdfPreviewProps {
  file: File;
}

function PdfPreview({ file }: PdfPreviewProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  console.log(file);

  return (
    <div>
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} renderTextLayer={false} />
      </Document>
      <p>Number of pages: {numPages}</p>
    </div>
  );
}

export default PdfPreview;
