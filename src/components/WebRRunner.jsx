import React, { useEffect, useRef } from "react";
import { WebR } from "@r-wasm/webr";
import { Box, Fab, Stack, Typography } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { darkTheme, lightTheme } from "./../appTheme";

const webR = new WebR();

const WebRRunner = ({ code, isDarkMode, webRRef }) => {
  const canvasRef = useRef(null);
  const theme = isDarkMode ? darkTheme : lightTheme;

  // Initialize WebR only once when the component mounts
  useEffect(() => {
    const initWebR = async () => {
      try {
        // Initialize WebR environment
        await webR.init();
        console.log("WebR initialized");
        
        // Make WebR instance available to parent components
        if (webRRef) {
          webRRef.current = webR;
        }
      } catch (err) {
        console.error("WebR initialization failed:", err);
      }
    };
    initWebR();
  }, []); // Empty dependency array means this runs once on mount

  // Function to run R code
  const runCode = async () => {
    try {
      // Set the default graphics device to webr::canvas
      await webR.evalRVoid('options(device=webr::canvas)');

      // Handle webR output messages in an async loop
      (async () => {
        for (;;) {
          const output = await webR.read();
          switch (output.type) {
            case 'canvas':
              if (output.data.event === 'canvasImage') {
                // Add plot image data to the current canvas element
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(output.data.image, 0, 0);
              } else if (output.data.event === 'canvasNewPage') {
                // Clear the canvas for a new plot
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
              }
              break;
            default:
              console.log(output);
          }
        }
      })();

      // Evaluate the R code
      await webR.evalRVoid(code);
    } catch (err) {
      // Handle errors gracefully
      console.error("WebR Error:", err);
    }
  };

  return (
    <Box
      sx={{
        top: 20,
        left: 20,
        right: 20,
        height: "100%",
        borderRadius: "5px",
        overflowY:"auto",
        zIndex: 1,
      }}
    >
      <Stack direction="row">
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            color: theme.palette.primary.contrastText,
            paddingBottom: "15px",
          }}
        >
          Output
        </Typography>

        <Fab
          size="small"
          variant="extended"
          sx={{
            left: 20,
            width: "140px",
            bgcolor: "#33bfff",
            color: theme.palette.primary.contrastText,
            "&:hover": {
              bgcolor: "#00b0ff",
            },
            boxShadow: "none",
          }}
          onClick={runCode}
        >
          <Box display="flex" alignItems="center" gap={0.5}>
            <PlayArrow fontSize="small" />
            <Typography fontWeight="bold">Run R Code</Typography>
          </Box>
        </Fab>
      </Stack>

      <Box
        sx={{
          position: "relative",
          borderRadius: "5px",
          width: "100%",
          height: "75%",
          overflowY: "auto",
          bgcolor: theme.palette.background.paper,
          zIndex: 1,
        }}
      >
        <canvas
          ref={canvasRef}
          width="1008"
          height="1008"
          style={{ width: "450px", height: "450px", display: "inline-block" }}
        />
      </Box>
    </Box>
  );
};

export default WebRRunner;