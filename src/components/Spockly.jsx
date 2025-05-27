import { useState, useRef } from "react";
import BlocklyComponent from "./BlocklyComponent";
import CodeDisplay from "./CodeDisplay";
import {Card, Box, Grid } from "@mui/material";
import { darkTheme, lightTheme } from "./../appTheme";
import WebRRunner from "./WebRRunner";
import FileUploadManager from "./FileUploadManager";

function SPOCKLY({isDarkMode}) {
  const [code, setCode] = useState("");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const webRRef = useRef(null);
  const workspaceRef = useRef(null);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const handleUploadClick = () => {
    setUploadDialogOpen(true);
  };

  const handleUploadClose = () => {
    setUploadDialogOpen(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Grid
        container
        sx={{
          flexGrow: 1,
          height: "100vh",
        }}
      >
        <Grid size={6} sx={{ height: "100%" }}>
          <Card
            sx={{
              m: 2,
              p: 2,
              borderRadius: "16px",
              backgroundColor: theme.palette.primary.main,
              height: "85%",
              boxShadow: 3,
            }}
          >
            <BlocklyComponent 
              setCode={setCode} 
              isDarkMode={isDarkMode} 
              onUploadClick={handleUploadClick}
              workspaceRef={workspaceRef}
            />
          </Card>
        </Grid>

        <Grid
          size={6}
          sx={{
            height: "100%",
            overflowY: "auto",
          }}
        >
          <Card
            sx={{
              m: 2,
              p: 2,
              borderRadius: "16px",
              backgroundColor: theme.palette.primary.main,
              height: "85%",
              boxShadow: 3,
              position: "relative",
            }}
          >
            <Box sx={{ height: "50%", p: 2 }}>
              <CodeDisplay 
                code={code} 
                setCode={setCode}
                isDarkMode={isDarkMode} 
                workspaceRef={workspaceRef}
              />
            </Box>
            <Box sx={{ height: "50%", p: 2 }}>
              <WebRRunner 
                code={code} 
                isDarkMode={isDarkMode} 
                webRRef={webRRef}
              />
            </Box>
          </Card>
        </Grid>
      </Grid>

      <FileUploadManager
        webRInstance={webRRef.current}
        isDarkMode={isDarkMode}
        open={uploadDialogOpen}
        onClose={handleUploadClose}
      />
    </Box>
  );
}

export default SPOCKLY;