import { useCallback, useState } from "react";
import { Grid } from "@mui/material";
import PageCard from "./PageCard";

interface PdfPreviewProps {
  file: File;
  pageOrder: number[];
  setPageOrder: React.Dispatch<React.SetStateAction<number[]>>;
}

function PdfPagesPreview({ file, pageOrder, setPageOrder }: PdfPreviewProps) {
  const [hovering, setHovering] = useState<number | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setPageOrder(Array.from(new Array(numPages), (_, index) => index));
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
    <Grid container sx={{ marginTop: 8 }} spacing={2} justifyContent="center">
      {pageOrder.map((index) => {
        return (
          <Grid
            key={index}
            item
            draggable
            sx={{ cursor: index === hovering ? "grab" : "" }}
            onMouseEnter={() => setHovering(index)}
            onMouseLeave={() => setHovering(null)}
            onDragStart={(event) => handleDragStart(event, index)}
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, index)}
          >
            <PageCard
              file={file}
              pageNumber={index + 1}
              hovering={index === hovering}
              onDocumentLoadSuccess={onDocumentLoadSuccess}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default PdfPagesPreview;
