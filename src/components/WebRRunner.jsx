import React, { useEffect, useRef } from "react";
import { WebR } from "@r-wasm/webr";
import { Box, Fab, Stack, Typography } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { darkTheme, lightTheme } from "./../appTheme";

const webR = new WebR({});
const CANVAS_SIZE = 450;

const WebRRunner = ({ code, isDarkMode, webRRef }) => {
  const canvasRef = useRef(null);
  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/webr/webr-serviceworker.js")
        .then(() => {
          console.log("WebR Service Worker registered");
        })
        .catch(console.error);
    }
  }, []);

  useEffect(() => {
    const startWebR = async () => {
      await webR.init();
      if (webRRef) webRRef.current = webR;
    };

    startWebR();
  }, []);

  const runCode = async () => {
    try {
      const testCode =
        'plot(1:3, type = "b", col = "darkgreen", pch = 16, main = "Ein Testplot")';
      console.log(testCode);
      await webR.evalRVoid("options(device=webr::canvas)");
      await webR.evalRVoid(testCode);
      await readCanvasEvents();
    } catch (err) {
      console.error("WebR Error:", err);
    }
  };

  const readCanvasEvents = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 2;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let awaitingImage = false;

    let done = false;

    const readLoop = async () => {
      while (!done) {
        const output = await webR.read();
        if (output.type !== "canvas") continue;

        switch (output.data.event) {
          case "canvasNewPage":
            awaitingImage = true;
            break;
          case "canvasImage":
            const img = output.data.image;

            if (awaitingImage) {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              awaitingImage = false;
            }

            ctx.drawImage(img, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
            resetTimer();
            break;
        }
      }
    };

    let timeoutId;
    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        done = true;
        console.log("Canvas-Event-Timeout erreicht");
      }, 500);
    };

    resetTimer();
    await readLoop();
    clearTimeout(timeoutId);
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
