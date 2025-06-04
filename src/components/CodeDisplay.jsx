import { useRef } from "react";
import {
  Alert,
  Box,
  Fab,
  IconButton,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ContentCopyRounded,
  Download,
  Fullscreen,
  PlayArrow,
  RestartAlt,
  ContentPaste
} from "@mui/icons-material";
import * as Blockly from "blockly/core";
import { useState } from "react";
import FullCodeViewDialog from "./FullCodeViewDialog";
import DownloadCodeDialog from "./DownloadCodeDialog";
import { m } from "framer-motion";
import { pythonGenerator } from "blockly/python";

const CodeDisplay = ({ code, setCode, workspaceRef, isDarkMode }) => {
  const theme = useTheme();
  const [openFullCodeViewDialog, setOpenFullCodeViewDialog] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [openDownloadDialog, setOpenDownloadDialog] = useState(false);

  const handleOpenFullCodeView = () => setOpenFullCodeViewDialog(true);
  const handleCloseFullCodeView = () => setOpenFullCodeViewDialog(false);

  const handleOpenDownloadDialog = () => setOpenDownloadDialog(true);
  const handleCloseDownloadDialog = () => setOpenDownloadDialog(false);

  const handleGenerateCode = () => globalThis.generateCode();

  const handleResetCode = () => {
    setCode("Generated Python code will appear here...");
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopySuccess(true);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };
  // const codeRef = useRef(null);
  // document.addEventListener(
  // "keydown",
  // (ev) => {
  //   const keyName = ev.key;
  //   if (keyName === "Control") {
  //     return;
  //   }
  //   if ((ev.ctrlKey || ev.metaKey) && !ev.altKey && keyName === 'c' && !window.getSelection().toString()) {
  //       ev.preventDefault();
  //       navigator.clipboard.writeText(code)
  //         .then(() => {
  //           codeRef.current.innerText = 'Code Copied!';
  //           setTimeout(() => codeRef.current.innerText = 'Copy Code', 1500);
  //         })
  //         .catch((e) => console.error('The code could not be copied. ' + e));
  //     }
  //     if ((ev.ctrlKey || ev.metaKey) && !ev.altKey && keyName === 'Enter') {
  //       ev.preventDefault();
  //       window.generateCode();
  //     }
  //   },
  //   false,
  // );

  return (
    <Box
      sx={{
        top: 20,
        left: 20,
        height: "100%",
        borderRadius: "5px",
        zIndex: 1,
      }}
    >
      <Snackbar
        open={ copySuccess }
        autoHideDuration={2000}
        onClose={ () => setCopySuccess(false) }
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Code copied to clipboard!
        </Alert>
      </Snackbar>
      <Stack direction="row">
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            color: theme.palette.primary.light,
            paddingBottom: "15px",
          }}
        >
          Code
        </Typography>

        <Fab
          size="small"
          variant="extended"
          onClick={ handleGenerateCode }
          sx={{
            left: 20,
            width: "120px",
            bgcolor: "#00c853",
            color: theme.palette.primary.contrastText,
            "&:hover": {
              bgcolor: "#05A255",
            },
            boxShadow: "none",
          }}
        >
          <Box display="flex" alignItems="center" gap={ 0.5 }>
            <PlayArrow fontSize="small" />
            <Typography fontWeight="bold">Generate</Typography>
          </Box>
        </Fab>
        <Box display="flex" alignItems="center" gap={ 0.5 }>
          <Typography sx={{ fontSize: "0.9em", marginLeft: "30px", color: "#BBB" }}>Ctrl + Enter</Typography>
        </Box>
        {/* { ~document.location.href.indexOf('https') || ~document.location.href.indexOf('localhost') ? (
          <>
        <Box display="flex" marginLeft="auto" alignItems="center" gap={ 0.5 }>
          <Typography sx={{ fontSize: "0.9em", marginRight: "10px", color: "#BBB" }}>Ctrl + C</Typography>  
        </Box>
        <Fab 
          size="small"
          variant="extended"
          sx={{
            width: "150px",
            bgcolor: "#f58a42",
            color: theme.palette.primary.light,
            "&:hover": {
              bgcolor: "#d77a3c",
            },
            boxShadow: "none",
          }}
          onClick={
            () => navigator.clipboard.writeText(code)
              .then(codeRef.current.innerText = 'Code Copied!')
              .then(setTimeout(() => codeRef.current.innerText = 'Copy Code', 1500))
              .catch((e) => console.error('The code could not be copied. ' + e))
          }
          >
          <Box display="flex" alignItems="center" gap={ 0.5 }>
            <ContentPaste fontSize="small" />
            <Typography ref={ codeRef } fontWeight="bold">Copy Code</Typography>
          </Box>
        </Fab>
        </>
        ) : null } */}
      </Stack>

      <Box
        sx={{
          position: "relative",
          borderRadius: "5px",
          width: "100%",
          height: "75%",
          bgcolor: theme.palette.background.paper,
          zIndex: 1,
          overflowY: "auto",
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Typography
            fontWeight="bold"
            sx={{
              color: isDarkMode ? "#FFFFFA" : "#000000",
              paddingBottom: "10px",
              paddingTop: "5px",
              paddingRight: "10px",
              padding: "20px",
              whiteSpace: "pre",
              fontFamily: "monospace",
            }}
          >
            { code || "Generated Python code will appear here..." }
          </Typography>
          <Box
            sx={{
              position: "relative",
              width: "20%",
              height: "75%",
              zIndex: 1,
              overflowY: "auto",
              padding: "20px",
            }}
          >
            <Stack
              direction="row"
              sx={{
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Tooltip title="Download Code as Python file">
                <IconButton onClick={ handleOpenDownloadDialog }>
                  <Download />
                </IconButton>
              </Tooltip>
              <Tooltip title="Copy Code">
                <IconButton onClick={ handleCopyCode }>
                  <ContentCopyRounded />
                </IconButton>
              </Tooltip>
              <Tooltip title="Reset Code">
                <IconButton onClick={ handleResetCode }>
                  <RestartAlt />
                </IconButton>
              </Tooltip>
              <Tooltip title="Full Code View">
                <IconButton onClick={ handleOpenFullCodeView }>
                  <Fullscreen />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>
        </Stack>
      </Box>
      <FullCodeViewDialog
        code={ code }
        openFullCodeViewDialog={ openFullCodeViewDialog }
        handleOpenDownloadDialog={ handleOpenDownloadDialog }
        handleCopyCode={ handleCopyCode }
        handleCloseFullCodeView={handleCloseFullCodeView }
        isDarkMode={ isDarkMode }
      />
      <DownloadCodeDialog
        code={ code }
        openDownloadDialog={ openDownloadDialog }
        handleCloseDownloadDialog={ handleCloseDownloadDialog }
      />
    </Box>
  );
};

export default CodeDisplay;
