import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack5";
import { useCallback, useState } from "react";
import { Box, Button, IconButton, Tooltip, Modal } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DeleteIcon from "@mui/icons-material/Delete";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import CloseIcon from "@mui/icons-material/Close";

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
        <>
          <Tooltip title="Delete file">
            <IconButton
              size="large"
              onClick={deleteFile}
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                zIndex: 2,
              }}
            >
              <DeleteIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Preview">
            <IconButton
              size="large"
              onClick={openPreviewModal}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 2,
              }}
            >
              <ZoomInIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
        </>
      )}
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        <div style={{ position: "relative" }}>
          <Page
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            scale={0.9}
            width={250}
          />
        </div>
      </Document>
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
        </Box>
      )}
      <Modal open={openPreview} onClose={closePreviewModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            boxShadow: 24,
            padding: "24px",
            maxHeight: "90vh",
            overflow: "auto",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: "12px",
              right: "12px",
              zIndex: 1,
            }}
            onClick={closePreviewModal}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} scale={2} />
          </Document>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "16px",
            }}
          >
            <Button onClick={closePreviewModal} type="button">
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default PdfPreview;
