import { useState, useRef } from "react";
import BlocklyComponent from "./BlocklyComponent";
import CodeDisplay from "./CodeDisplay";
import { Card, Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import { darkTheme, lightTheme } from "./../appTheme";
import WebRRunner from "./WebRRunner";
import FileUploadManager from "./FileUploadManager";

function TabPanel({ children, value, index }) {
  return (
    <div
      hidden={value !== index}
      role="tabpanel"
      style={{
        height: "100%",
        display: value === index ? "flex" : "none",
        flexDirection: "column",
      }}
    >
      <Box sx={{ flex: 1, height: "100%" }}>{children}</Box>
    </div>
  );
}

export default function SPOCKLY({ isDarkMode }) {
  const [code, setCode] = useState("Generated R code will appear here...");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [value, setValue] = useState(0);
  const webRRef = useRef(null);
  const workspaceRef = useRef(null);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

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
              borderRadius: 4,
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
              position: "relative",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              sx={{
                padding: 1,
                backgroundColor: theme.palette.background.default,
                borderRadius: 4,
              }}
            >
              <Tab
                label="Code"
                sx={{
                  fontWeight: "bold",
                  color: isDarkMode ? "lightgrey" : "darkgrey",
                }}
              />
              <Tab
                label="Output"
                sx={{
                  fontWeight: "bold",
                  color: isDarkMode ? "lightgrey" : "darkgrey",
                }}
              />
            </Tabs>
            <TabPanel value={value} index={0}>
              <Box sx={{ height: "60%", p: 1 }}>
                <CodeDisplay
                  code={code}
                  setCode={setCode}
                  isDarkMode={isDarkMode}
                  workspaceRef={workspaceRef}
                />
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Box sx={{ height: "60%", p: 1 }}>
                <WebRRunner
                  code={code}
                  isDarkMode={isDarkMode}
                  webRRef={webRRef}
                />
              </Box>
            </TabPanel>
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
