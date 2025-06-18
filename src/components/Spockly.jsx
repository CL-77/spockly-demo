import { useEffect, useState, useRef } from "react";
import BlocklyComponent from "./BlocklyComponent";
import CodeDisplay from "./CodeDisplay";
import { Card, Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import { darkTheme, lightTheme } from "./../appTheme";
import FileUploadManager from "./FileUploadManager";
import CodeOutput from "./CodeOutput"
import { MdOutlineOutput } from "react-icons/md";
import { FaCode } from "react-icons/fa6";
import PlottingOutput from "./PlottingDisplay";
import main from "./init";

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
  const [plot, setPlot] = useState("");
  const workspaceRef = useRef(null);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };
  const [isLoading, setIsLoading] = useState(true);
  const [output, setOutput] = useState("Loading Pyodide...");
  useEffect(() => {
    const firstRun = async () => {
        const code = `
import pyodide_js
await pyodide_js.loadPackage(['pandas', 'geopandas', 'requests', 'numpy', 'shapely'])
`;
        const result = await main(code);
        setOutput(result);
        console.info('Pyodide is ready!');
        setIsLoading(false);
        
    }
    firstRun();
  }, []);

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
        <Grid size={ 6 } sx={{ height: "100%" }}>
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
              setCode={ setCode }
              isDarkMode={ isDarkMode }
              onUploadClick={ handleUploadClick }
              workspaceRef={ workspaceRef }
            />
          </Card>
        </Grid>

        <Grid
          size={ 6 }
          sx={{
            height: "100%",
            overflow: "auto",
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
          value={ value }
          onChange={ handleChange }
          sx={{
            padding: 1,
            backgroundColor: theme.palette.background.default,
            borderRadius: 4,
          }}
        >
          <Tab
            label={
              <Box display="flex" alignItems="center" gap={1}>
                <FaCode /> Code
              </Box>
            }
            sx={{
              fontWeight: "bold",
              color: isDarkMode ? "lightgrey" : "darkgrey",
              textTransform: "none"
            }}
          />
          <Tab
            label={
              <Box display="flex" alignItems="center" gap={ 1 }>
                <MdOutlineOutput /> Output
              </Box>
            }
            sx={{
              fontWeight: "bold",
              color: isDarkMode ? "lightgrey" : "darkgrey",
              textTransform: "none"
            }}
          />
        </Tabs>
            <TabPanel value={ value } index={ 0 }>
              <Box sx={{ height: "60%", p: 1 }}>
                <CodeDisplay
                  code={ code }
                  setCode={ setCode }
                  isDarkMode={ isDarkMode }
                  workspaceRef={ workspaceRef }
                />
              </Box>
            </TabPanel>
            <TabPanel value={ value } index={ 1 }>
              <Box sx={{ height: "60%", p: 1 }}>
                <CodeOutput 
                setPlot={ setPlot } 
                code={ code } 
                isDarkMode={ isDarkMode }
                />
              </Box>
            </TabPanel>
          </Card>
        </Grid>
        
        <Grid
          size={ 12 }
          sx={{
            height: "150%",
          }}
        >
          <Card 
            sx={{
              m: 2,
              p: 2,
              borderRadius: "16px",
              backgroundColor: theme.palette.primary.main,
              height: "70%",
              boxShadow: 3,
              position: "relative",
              width: "95%",
            }}
          >
            <PlottingOutput plot={ plot } isDarkMode={ isDarkMode } />
          </Card>
        </Grid>
      </Grid>

      {/* <FileUploadManager
        webRInstance={ workspaceRef.current }
        isDarkMode={ isDarkMode }
        open={ uploadDialogOpen }
        onClose={ handleUploadClose }
      /> */}
    </Box>
  );
}
