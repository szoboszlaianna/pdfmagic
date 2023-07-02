import { Document } from "react-pdf/dist/esm/entry.webpack5";
import { useState } from "react";
import PageView from "./PageView";
import PdfTooltip from "./PdfTooltip";
import { Grid } from "@mui/material";
import PreviewModal from "./PreviewModal";

interface PdfPreviewProps {
  file: File;
  onDelete: (file: File) => void;
}

function PdfPagesPreview({ file, onDelete }: PdfPreviewProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [hovering, setHovering] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const handleDelete = () => {
    onDelete(file);
  };
  function handleOpenModal(index: number) {
    setPageNumber(index + 1);
    setOpenModal(true);
  }
  return (
    <>
      <Grid container sx={{ marginTop: 8 }} spacing={2} justifyContent="center">
        {Array.from(new Array(numPages), (el, index) => {
          return (
            <Grid
              key={index}
              item
              xs={8}
              sm={5}
              md={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: 2,
                padding: 1,
                position: "relative",
                height: 400,
                justifyContent: "center",
                backgroundColor: "rgba(255,141,84, 0.6)",
                borderRadius: 5,
                border: index == hovering ? "2px solid #FFF" : "none",
                opacity: index == hovering ? 1 : 0.8,
              }}
              onMouseEnter={() => setHovering(index)}
              onMouseLeave={() => setHovering(null)}
            >
              {hovering === index && (
                <PdfTooltip
                  handleDelete={handleDelete}
                  openPreviewModal={() => handleOpenModal(index)}
                />
              )}
              <PageView
                key={index}
                file={file}
                pageNumber={index + 1}
                onDocumentLoadSuccess={onDocumentLoadSuccess}
              />
            </Grid>
          );
        })}
      </Grid>
      <PreviewModal
        pageNumber={pageNumber}
        closePreviewModal={() => setOpenModal(false)}
        file={file}
        openPreview={openModal}
      />
    </>
  );
}

export default PdfPagesPreview;
