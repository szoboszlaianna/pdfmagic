import { useCallback, useEffect, useState } from "react";
import PageView from "./PageView";
import PdfTooltip from "./PdfTooltip";
import { Grid } from "@mui/material";
import PreviewModal from "./PreviewModal";

interface PdfPreviewProps {
  file: File;
}

function PdfPagesPreview({ file }: PdfPreviewProps) {
  const [pageOrder, setPageOrder] = useState<number[]>([0]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [hovering, setHovering] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setPageOrder(Array.from(new Array(numPages), (_, index) => index));
  }

  function handleOpenModal(index: number) {
    setPageNumber(index + 1);
    setOpenModal(true);
  }

  const handleDragStart = useCallback(
    (event: React.DragEvent<HTMLDivElement>, index: number) => {
      event.dataTransfer.setData("text/plain", index.toString());
    },
    []
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    },
    []
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>, index: number) => {
      event.preventDefault();
      const sourceIndex = Number(event.dataTransfer.getData("text/plain"));
      if (sourceIndex !== index) {
        const updatedPageOrder = [...pageOrder];
        const [draggedPage] = updatedPageOrder.splice(sourceIndex, 1);
        updatedPageOrder.splice(index, 0, draggedPage);
        setPageOrder(updatedPageOrder);
      }
    },
    [pageOrder]
  );
  return (
    <>
      <Grid container sx={{ marginTop: 8 }} spacing={2} justifyContent="center">
        {pageOrder.map((index) => {
          return (
            <Grid
              key={index}
              item
              xs={8}
              sm={5}
              md={2}
              draggable
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: 2,
                padding: 1,
                position: "relative",
                height: 300,
                justifyContent: "center",
                backgroundColor: "rgba(255,141,84, 0.6)",
                borderRadius: 5,
                border: index == hovering ? "2px solid #FFF" : "none",
                opacity: index == hovering ? 1 : 0.8,
              }}
              onMouseEnter={() => setHovering(index)}
              onMouseLeave={() => setHovering(null)}
              onDragStart={(event) => handleDragStart(event, index)}
              onDragOver={handleDragOver}
              onDrop={(event) => handleDrop(event, index)}
            >
              {hovering === index && (
                <PdfTooltip openPreviewModal={() => handleOpenModal(index)} />
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
