import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import { useCallback, useState } from "react";
import { Box, Button, Grid, IconButton, Tooltip } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DeleteIcon from "@mui/icons-material/Delete";

interface PdfPreviewProps {
  file: File;
  onFileDelete: (file: File) => void;
}

function PdfPreview({ file, onFileDelete }: PdfPreviewProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [hovering, setHovering] = useState(false);

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

  return (
    <Grid
      item
      draggable
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
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
        height: 300,
        justifyContent: "center",
        backgroundColor: "rgba(255,141,84, 0.6)",
        borderRadius: 5,
      }}
    >
      {hovering && (
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
      )}
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        <div style={{ position: "relative" }}>
          <Page
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            scale={0.8}
            width={200}
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
    </Grid>
  );
}

export default PdfPreview;
