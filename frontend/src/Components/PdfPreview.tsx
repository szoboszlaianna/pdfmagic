import { pdfjs } from "react-pdf/dist/esm/entry.webpack5";
import { useCallback, useState } from "react";
import { Box, Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import PageView from "./PageView";
import PreviewModal from "./PreviewModal";
import PdfTooltip from "./PdfTooltip";

interface PdfPreviewProps {
  file: File;
  onFileDelete: (file: File) => void;
  hovering: boolean;
}

function PdfPreview({ file, onFileDelete, hovering }: PdfPreviewProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [openPreview, setOpenPreview] = useState(false);

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const changePage = useCallback(
    (offset: number) =>
      setPageNumber((prevPageNumber) => (prevPageNumber || 1) + offset),
    []
  );

  const previousPage = useCallback(() => changePage(-1), [changePage]);

  const nextPage = useCallback(() => changePage(1), [changePage]);

  const deleteFile = () => {
    onFileDelete(file);
  };

  const openPreviewModal = () => {
    setOpenPreview(true);
  };

  const closePreviewModal = () => {
    setOpenPreview(false);
  };

  return (
    <>
      {hovering && (
        <PdfTooltip
          handleDelete={deleteFile}
          openPreviewModal={openPreviewModal}
        />
      )}
      <PageView
        file={file}
        onDocumentLoadSuccess={onDocumentLoadSuccess}
        pageNumber={pageNumber}
      />
      {numPages && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Button
            disabled={pageNumber <= 1}
            onClick={previousPage}
            type="button"
            startIcon={<ArrowBackIosNewIcon />}
          />
          <span>{`Page ${pageNumber || (numPages ? 1 : "--")} of ${
            numPages || "--"
          }`}</span>
          <Button
            startIcon={<ArrowForwardIosIcon />}
            disabled={pageNumber >= numPages}
            onClick={nextPage}
            type="button"
          />
          <PreviewModal
            file={file}
            openPreview={openPreview}
            closePreviewModal={closePreviewModal}
            pageNumber={pageNumber}
          />
        </Box>
      )}
    </>
  );
}

export default PdfPreview;
