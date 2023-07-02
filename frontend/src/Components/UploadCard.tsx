import { Card, CardHeader, CardContent } from "@mui/material";
import DragAndDrop from "./DragAndDrop";
import { toast } from "react-toastify";

type UploadCardProps = {
  onUploadComplete: (files: File[]) => void;
  multiple?: boolean;
};

const UploadCard = ({ onUploadComplete, multiple }: UploadCardProps) => {
  function handleFilesSelected(files: File[] | null): void {
    const formData: FormData = new FormData();

    if (!files || files.length === 0) {
      // Handle no files selected
      return;
    }

    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }

    fetch("/upload_files", {
      method: "POST",
      body: formData,
    })
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error("Error uploading files");
        }
        return response.json();
      })
      .then((data: any) => {
        onUploadComplete(files);
      })
      .catch((error: Error) => {
        console.error(error);
        toast.error("Error uploading files");
        // Handle errors
      });
  }

  return (
    <Card sx={{ minWidth: 275, maxWidth: "sm" }} elevation={3}>
      <CardHeader title="Upload Files" />
      <CardContent
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <DragAndDrop
          onFilesSelected={handleFilesSelected}
          multiple={multiple}
        />
      </CardContent>
    </Card>
  );
};

export default UploadCard;
