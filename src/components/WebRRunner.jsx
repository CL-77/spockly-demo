import React, { useEffect, useRef, useState } from "react";
import { WebR } from "@r-wasm/webr";
import { Box, Fab, Stack, Typography, Divider, CircularProgress } from "@mui/material";
import { PlayArrow, Clear } from "@mui/icons-material";
import { darkTheme, lightTheme } from "./../appTheme";

const webR = new WebR();

const WebRRunner = ({ code, isDarkMode, webRRef }) => {
  const canvasRef = useRef(null);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const [textOutput, setTextOutput] = useState("");
  const [hasCanvas, setHasCanvas] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Init WebR and set up canvas device
  useEffect(() => {
    let isMounted = true;
    const initWebR = async () => {
      try {
        await webR.init();
        await webR.evalRVoid('options(device=webr::canvas)');
        if (webRRef) webRRef.current = webR;
        handleCanvasOutput();
      } catch (err) {
        setTextOutput(`Error initializing WebR: ${err.message}`);
      }
    };
    initWebR();
    return () => { isMounted = false; };
    // eslint-disable-next-line
  }, []);

  // Canvas output handler
  const handleCanvasOutput = async () => {
    while (true) {
      try {
        const output = await webR.read();
        if (output.type === 'canvas') {
          if (output.data.event === 'canvasImage') {
            const canvas = canvasRef.current;
            if (canvas && output.data.image) {
              const ctx = canvas.getContext('2d');
              // Optional: Clear before drawing
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(output.data.image, 0, 0, canvas.width, canvas.height);
              setHasCanvas(true);
            }
          } else if (output.data.event === 'canvasNewPage') {
            const canvas = canvasRef.current;
            if (canvas) {
              const ctx = canvas.getContext('2d');
              ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
          }
        }
      } catch (err) {
        // Restart handler on error
        setTimeout(handleCanvasOutput, 1000);
        break;
      }
    }
  };

  // Output reset
  const clearOutput = () => {
    setTextOutput("");
    setHasCanvas(false);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  // R code execution
  const runCode = async () => {
    if (!code.trim()) {
      setTextOutput("No code to execute");
      return;
    }
    setIsLoading(true);
    setTextOutput("");
    // Optional: Clear graphics before each run
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    try {
      // Always set device before running code
      await webR.evalRVoid('options(device=webr::canvas)');
      // Try text output first
      let result;
      try {
        result = await webR.evalR(code);
        const values = await result.toArray();
        const filtered = values.filter(val =>
          val && val.toString().trim() !== '' &&
          !val.toString().includes('R is a collaborative project') &&
          !val.toString().includes('Type ') &&
          !val.toString().includes('Copyright') &&
          !val.toString().includes('R version') &&
          val.toString() !== 'NULL'
        );
        if (filtered.length > 0) setTextOutput(filtered.join("\n"));
      } catch (err) {
        // If error, try as graphics-only command
        try {
          await webR.evalRVoid(code);
        } catch (voidErr) {
          setTextOutput(`Error: ${voidErr.message}`);
        }
      }
    } catch (err) {
      setTextOutput(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{
      height: "500px", // Setze eine feste Höhe für den Container
      overflowY: "auto", // Ermögliche vertikales Scrollen
      borderRadius: "5px",
      zIndex: 1
    }}>
      <Stack direction="row" spacing={1}>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ color: theme.palette.primary.contrastText, pb: "15px" }}
        >
          Output
        </Typography>

        <Fab
          size="small"
          variant="extended"
          disabled={isLoading}
          sx={{
            width: "140px",
            bgcolor: isLoading ? "#666" : "#33bfff",
            color: theme.palette.primary.contrastText,
            "&:hover": {
              bgcolor: isLoading ? "#666" : "#00b0ff",
            },
            boxShadow: "none",
          }}
          onClick={runCode}
        >
          <Box display="flex" alignItems="center" gap={0.5}>
            <PlayArrow fontSize="small" />
            <Typography fontWeight="bold">
              {isLoading ? "Running..." : "Run R Code"}
            </Typography>
          </Box>
        </Fab>

        <Fab
          size="small"
          variant="extended"
          sx={{
            width: "100px",
            bgcolor: "#ff6b6b",
            color: "white",
            "&:hover": {
              bgcolor: "#ff5252",
            },
            boxShadow: "none",
          }}
          onClick={clearOutput}
        >
          <Box display="flex" alignItems="center" gap={0.5}>
            <Clear fontSize="small" />
            <Typography fontWeight="bold">Clear</Typography>
          </Box>
        </Fab>
      </Stack>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ mb: 2, minHeight: 60, color: theme.palette.text.primary, background: theme.palette.background.paper, p: 1, borderRadius: 1, fontFamily: "monospace", fontSize: 16 }}>
        {textOutput}
      </Box>
      <Box sx={{ mt: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <canvas ref={canvasRef} width={400} height={300} style={{ border: "1px solid #888", background: "#fff", display: hasCanvas ? "block" : "none" }} />
        {!hasCanvas && <Typography variant="body2" sx={{ color: "#aaa" }}></Typography>}
      </Box>
    </Box>
  );
};

export default WebRRunner;
