// src/components/FullPageSpinner.tsx
import React from "react";
import { CircularProgress, Fade, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const SpinnerContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  width: "100%",
  backgroundColor: theme.palette.background.default,
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 9999,
}));

interface FullPageSpinnerProps {
  message?: string;
  show?: boolean;
}

export const FullPageSpinner: React.FC<FullPageSpinnerProps> = ({
  message = "Loading...",
  show = true,
}) => {
  return (
    // ✅ No sx prop on Fade
    <Fade in={show} timeout={300} unmountOnExit>
      <SpinnerContainer>
        <CircularProgress size={60} thickness={4} color="primary" />
        {message && (
          <Typography
            variant="h6"
            sx={{
              mt: 3,
              color: "text.secondary",
              fontWeight: 500,
            }}
          >
            {message}
          </Typography>
        )}
      </SpinnerContainer>
    </Fade>
  );
};

export default FullPageSpinner;
