import { useRef } from "react";
import { Box, Fab, Stack, Typography } from "@mui/material";
import { darkTheme, lightTheme } from "./../appTheme";
import { PlayArrow } from "@mui/icons-material";
import { ContentPaste } from '@mui/icons-material';
import { m } from "framer-motion";

const CodeDisplay = ({ code, isDarkMode }) => {
  const theme = isDarkMode ? darkTheme : lightTheme;
  const codeRef = useRef(null);
  document.addEventListener(
  "keydown",
  (ev) => {
    const keyName = ev.key;
    if (keyName === "Control") {
      return;
    }
    if ((ev.ctrlKey || ev.metaKey) && !ev.altKey && keyName === 'c' && !window.getSelection().toString()) {
        ev.preventDefault();
        navigator.clipboard.writeText(code)
          .then(() => {
            codeRef.current.innerText = 'Code Copied!';
            setTimeout(() => codeRef.current.innerText = 'Copy Code', 1500);
          })
          .catch((e) => console.error('The code could not be copied. ' + e));
      }
      if ((ev.ctrlKey || ev.metaKey) && !ev.altKey && keyName === 'Enter') {
        ev.preventDefault();
        window.generateCode();
      }
    },
    false,
  );

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
          sx={{
            left: 20,
            width: "120px",
            bgcolor: "#00c853",
            color: theme.palette.primary.light,
            "&:hover": {
              bgcolor: "#05A255",
            },
            boxShadow: "none",
          }}
          onClick={ window.generateCode }
        >
          <Box display="flex" alignItems="center" gap={ 0.5 }>
            <PlayArrow fontSize="small" />
            <Typography fontWeight="bold">Generate</Typography>
          </Box>
        </Fab>
        <Box display="flex" alignItems="center" gap={ 0.5 }>
          <Typography sx={{ fontSize: "0.9em", marginLeft: "30px", color: "#BBB" }}>Ctrl + Enter</Typography>
        </Box>
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
      </Stack>

      <Box
        sx={{
          position: "relative",
          borderRadius: "5px",
          width: "100%",
          height: "75%",
          bgcolor: theme.palette.background.paper,
          zIndex: 1,
          overflow: "auto",
        }}
      >
        <Typography
          fontWeight="bold"
          sx={{
            color: theme.palette.primary.contrastText,
            paddingBottom: "10px",
            paddingTop: "5px",
            padding: "20px",
            whiteSpace: 'pre',
          }}
        >
        { code || "Generated Python code will appear here..."}
        </Typography>
      </Box>
    </Box>
  );
};

export default CodeDisplay;
