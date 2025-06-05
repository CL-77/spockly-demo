import { useEffect, useState, useRef } from "react";
import BlocklyComponent from "./BlocklyComponent";
import CodeDisplay from "./CodeDisplay";
import { Card, Box, Grid } from "@mui/material";
import { darkTheme, lightTheme } from "./../appTheme";
import CodeOutput from "./CodeOutput";
import main from './init.js';
import PlottingOutput from "./PlottingDisplay.jsx";
// import FileUploadManager from "./FileUploadManager";

function SPOCKLY({ isDarkMode }) {
  const [code, setCode] = useState("Generated Python code will appear here...");
  const [plot, setPlot] = useState("");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const workspaceRef = useRef(null);
  const theme = isDarkMode ? darkTheme : lightTheme;
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
              borderRadius: "16px",
              backgroundColor: theme.palette.primary.main,
              height: "85%",
              boxShadow: 3,
            }}
          >
            <BlocklyComponent 
              setCode={ setCode } 
              isDarkMode={ isDarkMode } 
              // onUploadClick={ handleUploadClick }
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
              boxShadow: 3,
              position: "relative",
            }}
          >
            <Box sx={{ height: "45%", p: 2 }}>
              <CodeDisplay 
                code={ code } 
                setCode={ setCode }
                isDarkMode={ isDarkMode } 
                workspaceRef={ workspaceRef }
              />
            </Box>
            <Box sx={{ height: "45%", p: 2 }}>
              <CodeOutput 
                setPlot={ setPlot } 
                code={ code } 
                isDarkMode={ isDarkMode }
              />
            </Box>
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

export default SPOCKLY;