import { Box, IconButton, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PageView from "./PageView";

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
            fontSize: "10px",
            position: "absolute",
            top: "2px",
            right: "2px",
            zIndex: 1,
          }}
          onClick={closePreviewModal}
        >
          <CloseIcon />
        </IconButton>
        <PageView pageNumber={pageNumber} width={400} file={file} />
      </Box>
    </Modal>
  );
}

export default PreviewModal;
