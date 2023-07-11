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
      <Tooltip title="Preview">
        <IconButton onClick={openPreviewModal}>
          <ZoomInIcon fontSize="medium" />
        </IconButton>
      </Tooltip>
      {handleDelete && (
        <Tooltip title="Delete file">
          <IconButton onClick={handleDelete}>
            <DeleteIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
}

export default PdfTooltip;
