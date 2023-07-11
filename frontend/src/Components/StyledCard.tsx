import { Card } from "@mui/material";
import { ReactNode } from "react";

interface StyledCardProps {
  children: ReactNode;
}
function StyledCard({ children }: StyledCardProps) {
  return (
    <Card
      sx={{
        maxWidth: 250,
        backgroundColor: "rgba(255,141,84, 0.6)",
        borderRadius: 5,
        height: "100%",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
          "&:after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)", // Adjust the color as needed
          },
        },
      }}
    >
      {children}
    </Card>
  );
}

export default StyledCard;
