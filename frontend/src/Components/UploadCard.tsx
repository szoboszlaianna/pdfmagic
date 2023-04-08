import { Card, CardHeader, CardContent } from "@mui/material";
import DragAndDrop from "./DragAndDrop";
import { toast } from "react-toastify";

type UploadCardProps = {
  onUploadComplete: (files: FileList) => void;
};

const UploadCard = ({ onUploadComplete }: UploadCardProps) => {
  function handleFilesSelected(files: FileList | null): void {
    const formData: FormData = new FormData();

    if (!files || files.length === 0) {
      // Handle no files selected
      return;
    }

    for (let i: number = 0; i < files.length; i++) {
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
        console.log(data);
        onUploadComplete(files);
      })
      .catch((error: Error) => {
        console.error(error);
        toast.error("Error uploading files");
        // Handle errors
      });
  }

  return (
    <Card sx={{ minWidth: 275, maxWidth: "sm" }}>
      <CardHeader title="Upload Files" />
      <CardContent
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <DragAndDrop onFilesSelected={handleFilesSelected} />
      </CardContent>
    </Card>
  );
};

export default UploadCard;
