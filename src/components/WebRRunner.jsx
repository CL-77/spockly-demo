import React, { useEffect, useRef } from "react";
import { Box, Fab, Stack, Typography } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { darkTheme, lightTheme } from "./../appTheme";
import { WebR } from "@r-wasm/webr";
const webR = new WebR();

const CANVAS_SIZE = 450;

const WebRRunner = ({ code, isDarkMode, webRRef }) => {
  const canvasRef = useRef(null);
  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    const startWebR = async () => {
      await webR.init();
      if (webRRef) webRRef.current = webR;
    };

    startWebR();
  }, []);

  const runCode = async () => {
    const shelter = await new webR.Shelter();
    const capture = await shelter.captureR(
      'plot(1:3, type = "b", col = "darkgreen", pch = 16, main = "Ein Testplot")'
    );
    capture.images.forEach((img) => {
      const canvas = canvasRef.current;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      canvas.appendChild(canvas);
    });
  };

  return (
    <Box
      sx={{
        height: "100%",
        borderRadius: "5px",
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          paddingBottom: 2,
        }}
      >
        <Fab
          size="small"
          variant="extended"
          sx={{
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
      </Box>
      <Box
        sx={{
          position: "relative",
          borderRadius: "5px",
          width: "100%",
          height: "100%",
          bgcolor: theme.palette.background.paper,
          zIndex: 1,
        }}
      >
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE * window.devicePixelRatio}
          height={CANVAS_SIZE * window.devicePixelRatio}
          style={{
            width: CANVAS_SIZE + "px",
            height: CANVAS_SIZE + "px",
            display: "block",
          }}
        />
      </Box>
    </Box>
  );
};

export default WebRRunner;
