import { Card, Box, CardContent, Typography, CardActions } from "@mui/material";
import { useState } from "react";
import { pdfjs } from "react-pdf";
import PageView from "./PageView";
import PdfTooltip from "./PdfTooltip";
import PreviewModal from "./PreviewModal";

interface PageCardProps {
  file: File;
  pageNumber: number;
  onDocumentLoadSuccess?: (pdf: pdfjs.PDFDocumentProxy) => void;
  hovering: boolean;
  handleDelete?: () => void;
}

function PageCard({
  file,
  pageNumber,
  onDocumentLoadSuccess,
  hovering,
  handleDelete,
}: PageCardProps) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Card
        sx={{
          maxWidth: 250,
          backgroundColor: "rgba(255,141,84, 0.6)",
          borderRadius: 5,
          border: hovering ? "1px solid #FFF" : "none",
          opacity: hovering ? 1 : 0.8,
        }}
      >
        <CardContent
          sx={{ position: "relative", width: 160, opacity: hovering ? 0.8 : 1 }}
        >
          {hovering && (
            <Box
              sx={{
                position: "absolute",
                width: 160,
                top: 10,
                zIndex: 99,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <PdfTooltip
                handleDelete={handleDelete}
                openPreviewModal={() => setOpenModal(true)}
              />
            </Box>
          )}
          <PageView
            key={pageNumber}
            file={file}
            pageNumber={pageNumber}
            onDocumentLoadSuccess={onDocumentLoadSuccess}
          />
          {/* <Typography variant="body2" color="text.secondary">
            {file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}
          </Typography> */}
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Page {pageNumber}
          </Typography>
        </CardActions>
      </Card>
      <PreviewModal
        pageNumber={pageNumber}
        closePreviewModal={() => setOpenModal(false)}
        file={file}
        openPreview={openModal}
      />
    </>
  );
}

export default PageCard;
