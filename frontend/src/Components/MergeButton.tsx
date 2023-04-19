import { Box, Button } from "@mui/material";
import CallMergeIcon from "@mui/icons-material/CallMerge";
import { toast } from "react-toastify";

interface MergeButtonProps {
  uploadedFiles: File[];
}

function MergeButton({ uploadedFiles }: MergeButtonProps) {
  const handleMerge = async () => {
    const formData = new FormData();

    // append uploaded files to form data
    for (let i = 0; i < uploadedFiles.length; i++) {
      formData.append("files[]", uploadedFiles[i]);
    }

    try {
      const response = await fetch("/merge-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // create blob from response and download file
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "merged.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      toast.error(`Error merging PDFs: ${error}`);
    }
  };

  return (
    <Box
      sx={{
        margin: 8,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<CallMergeIcon />}
        onClick={handleMerge}
      >
        Merge PDFs
      </Button>
    </Box>
  );
}

export default MergeButton;
