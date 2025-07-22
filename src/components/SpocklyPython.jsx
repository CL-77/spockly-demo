import { Box, Typography } from "@mui/material";

export default function SpocklyPython({ isDarkMode }) {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: isDarkMode ? "#121212" : "#fafafa",
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        Work in Progress
      </Typography>
    </Box>
  );
}
