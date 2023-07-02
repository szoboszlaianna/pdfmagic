import { Box, Button, IconButton, Modal } from "@mui/material";
import { Page, Document } from "react-pdf";
import CloseIcon from "@mui/icons-material/Close";

interface ModalProps {
  file: File;
  openPreview: boolean;
  closePreviewModal: () => void;
  pageNumber: number;
}

function PreviewModal({
  openPreview,
  file,
  closePreviewModal,
  pageNumber,
}: ModalProps) {
  return (
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
        <Document file={file}>
          <Page scale={2} pageNumber={pageNumber} />
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
  );
}

export default PreviewModal;
