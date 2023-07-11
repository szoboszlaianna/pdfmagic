import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import PageCard from "./PageCard";

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
  const [hovering, setHovering] = useState<number | null>(null);

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

  return (
    <>
      <Grid
        container
        sx={{ marginTop: 8, marginBottom: 8 }}
        spacing={2}
        justifyContent="center"
      >
        {Array.from(new Array(numPages), (el, index) => {
          if (deletedPages.includes(index)) {
            return null; // Skip rendering the deleted page
          }
          return (
            <Grid
              item
              key={index}
              onMouseEnter={() => setHovering(index)}
              onMouseLeave={() => setHovering(null)}
            >
              <PageCard
                file={file}
                pageNumber={index + 1}
                hovering={hovering === index}
                handleDelete={() => handleDelete(index)}
                onDocumentLoadSuccess={onDocumentLoadSuccess}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

export default PdfDeletePagesPreview;
