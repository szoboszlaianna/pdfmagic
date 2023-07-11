import { Box, CardContent, Typography, CardActions } from "@mui/material";
import { useState } from "react";
import { pdfjs } from "react-pdf";
import PageView from "./PageView";
import PdfTooltip from "./PdfTooltip";
import PreviewModal from "./PreviewModal";
import StyledCard from "./StyledCard";

interface PageCardProps {
  file: File;
  pageNumber: number;
  onDocumentLoadSuccess?: (pdf: pdfjs.PDFDocumentProxy) => void;
  hovering: boolean;
  handleDelete?: () => void;
  numPages?: number; //given for files
}

function PageCard({
  file,
  pageNumber,
  onDocumentLoadSuccess,
  hovering,
  handleDelete,
  numPages,
}: PageCardProps) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <StyledCard>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            position: "relative",
          }}
        >
          <CardContent sx={{ flexGrow: 1 }}>
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
            {numPages ? (
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
        </Box>
      </StyledCard>
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
