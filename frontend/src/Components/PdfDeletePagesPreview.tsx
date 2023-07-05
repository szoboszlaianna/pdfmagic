import { useEffect, useState } from "react";
import PageView from "./PageView";
import PdfTooltip from "./PdfTooltip";
import { Grid } from "@mui/material";
import PreviewModal from "./PreviewModal";

interface PdfPreviewProps {
  file: File;
  deletedPages: number[];
  setDeletedPages: React.Dispatch<React.SetStateAction<number[]>>;
  onFileDelete: () => void;
}

function PdfDeletePagesPreview({
  file,
  deletedPages,
  setDeletedPages,
  onFileDelete,
}: PdfPreviewProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [hovering, setHovering] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    if (deletedPages.length > 0 && deletedPages.length === numPages) {
      onFileDelete();
    }
  }, [numPages, deletedPages]);

  const handleDelete = (pageIndex: number) => {
    setDeletedPages((prevDeletedPages) => [...prevDeletedPages, pageIndex]);
  };

  function handleOpenModal(index: number) {
    setPageNumber(index + 1);
    setOpenModal(true);
  }

  return (
    <>
      <Grid container sx={{ marginTop: 8 }} spacing={2} justifyContent="center">
        {Array.from(new Array(numPages), (el, index) => {
          if (deletedPages.includes(index)) {
            return null; // Skip rendering the deleted page
          }
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
                  handleDelete={() => handleDelete(index)}
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

export default PdfDeletePagesPreview;
