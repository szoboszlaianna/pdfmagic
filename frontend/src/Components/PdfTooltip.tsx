import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ZoomInIcon from "@mui/icons-material/ZoomIn";

interface TooltipProps {
  handleDelete?: () => void;
  openPreviewModal: () => void;
}

function PdfTooltip({ handleDelete, openPreviewModal }: TooltipProps) {
  return (
    <>
      {handleDelete && (
        <Tooltip title="Delete file">
          <IconButton
            size="large"
            onClick={handleDelete}
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
      <Tooltip title="Preview">
        <IconButton
          size="large"
          onClick={openPreviewModal}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 2,
          }}
        >
          <ZoomInIcon fontSize="medium" />
        </IconButton>
      </Tooltip>
    </>
  );
}

export default PdfTooltip;
