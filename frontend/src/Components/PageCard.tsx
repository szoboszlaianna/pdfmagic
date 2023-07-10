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
  isFile?: boolean; //true if page is a whole file
}

function PageCard({
  file,
  pageNumber,
  onDocumentLoadSuccess,
  hovering,
  handleDelete,
  isFile,
}: PageCardProps) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Card
        sx={{
          maxWidth: 250,
          backgroundColor: "rgba(255,141,84, 0.6)",
          borderRadius: 5,
          height: "100%",
          position: "relative",
          overflow: "hidden",
          "&:hover": {
            "&:after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.3)", // Adjust the color as needed
            },
          },
        }}
      >
        <CardContent
          sx={{
            position: "relative",
            width: 160,
          }}
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
        </CardContent>
        <CardActions
          sx={{
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          {isFile ? (
            <Typography variant="body2" color="text.secondary">
              {file.name.length > 20
                ? `${file.name.slice(0, 20)}...`
                : file.name}
            </Typography>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Page {pageNumber}
            </Typography>
          )}
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
