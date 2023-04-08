import { Button } from "@mui/material";
import CallMergeIcon from "@mui/icons-material/CallMerge";

interface MergeButtonProps {
  uploadedFiles: FileList;
}

function MergeButton({ uploadedFiles }: MergeButtonProps) {
  const handleMerge = async () => {
    const formData = new FormData();

    // append uploaded files to form data
    for (let i = 0; i < uploadedFiles.length; i++) {
      formData.append("files[]", uploadedFiles.item(i)!);
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
      console.error("Error merging PDFs:", error);
    }
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      startIcon={<CallMergeIcon />}
      onClick={handleMerge}
    >
      Merge PDFs
    </Button>
  );
}

export default MergeButton;
