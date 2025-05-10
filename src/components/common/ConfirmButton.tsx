import { Button } from "@mui/material";

interface ConfirmButtonProps {
  onClick: () => void;
  label: string;
}

export const ConfirmButton = ({ onClick, label }: ConfirmButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      sx={{
        backgroundColor: "#F3737E",
        "&:hover": {
          backgroundColor: "#e25761",
        },
        fontFamily: "'Baloo 2', sans-serif",
      }}
    >
      {label}
    </Button>
  );
};