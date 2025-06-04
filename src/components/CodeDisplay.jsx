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
} from "@mui/icons-material";
import * as Blockly from "blockly/core";
import { useState } from "react";
import FullCodeViewDialog from "./FullCodeViewDialog";
import DownloadCodeDialog from "./DownloadCodeDialog";

const CodeDisplay = ({ code, setCode, workspaceRef, isDarkMode }) => {
  const theme = useTheme();
  const [openFullCodeViewDialog, setOpenFullCodeViewDialog] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [openDownloadDialog, setOpenDownloadDialog] = useState(false);

  const handleOpenFullCodeView = () => setOpenFullCodeViewDialog(true);
  const handleCloseFullCodeView = () => setOpenFullCodeViewDialog(false);

  const handleOpenDownloadDialog = () => setOpenDownloadDialog(true);
  const handleCloseDownloadDialog = () => setOpenDownloadDialog(false);

  const handleGenerateCode = () => {
    if (!workspaceRef.current) {
      console.error("Blockly workspace is not initialized.");
      return;
    }

    let rCode = Blockly.Generator.R.workspaceToCode(workspaceRef.current);
    if (rCode && rCode.trim() !== "") {
      const formattedRCode = Blockly.Generator.R.formatCode(rCode);
      setCode(formattedRCode);
    } else {
      setCode("No R code could be generated from the current workspace.");
    }
  };

  const handleResetCode = () => {
    setCode("Generated R code will appear here...");
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopySuccess(true);
    } catch (err) {
      console.error("Copy failed:", err);
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
        zIndex: 1,
      }}
    >
      <Snackbar
        open={copySuccess}
        autoHideDuration={2000}
        onClose={() => setCopySuccess(false)}
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
            color: theme.palette.primary.contrastText,
            paddingBottom: "15px",
          }}
        >
          Code
        </Typography>

        <Fab
          size="small"
          variant="extended"
          onClick={handleGenerateCode}
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
          <Box display="flex" alignItems="center" gap={0.5}>
            <PlayArrow fontSize="small" />
            <Typography fontWeight="bold">Generate</Typography>
          </Box>
        </Fab>
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
              padding: "20px",
              whiteSpace: "pre-wrap",
              fontFamily: "monospace",
            }}
          >
            {code}
          </Typography>
          <Box
            sx={{
              position: "relative",
              width: "22%",
              height: "75%",
              zIndex: 1,
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
              <Tooltip title="Download Code as R file">
                <IconButton onClick={handleOpenDownloadDialog}>
                  <Download />
                </IconButton>
              </Tooltip>
              <Tooltip title="Copy Code">
                <IconButton onClick={handleCopyCode}>
                  <ContentCopyRounded />
                </IconButton>
              </Tooltip>
              <Tooltip title="Reset Code">
                <IconButton onClick={handleResetCode}>
                  <RestartAlt />
                </IconButton>
              </Tooltip>
              <Tooltip title="Full Code View">
                <IconButton onClick={handleOpenFullCodeView}>
                  <Fullscreen />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>
        </Stack>
      </Box>
      <FullCodeViewDialog
        code={code}
        openFullCodeViewDialog={openFullCodeViewDialog}
        handleOpenDownloadDialog={handleOpenDownloadDialog}
        handleCopyCode={handleCopyCode}
        handleCloseFullCodeView={handleCloseFullCodeView}
        isDarkMode={isDarkMode}
      />
      <DownloadCodeDialog
        code={code}
        openDownloadDialog={openDownloadDialog}
        handleCloseDownloadDialog={handleCloseDownloadDialog}
      />
    </Box>
  );
};

export default CodeDisplay;
