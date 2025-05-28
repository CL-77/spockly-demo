import { useEffect, useState } from "react";
import BlocklyComponent from "./BlocklyComponent";
import CodeDisplay from "./CodeDisplay";
import {Card, Box, Grid } from "@mui/material";
import { darkTheme, lightTheme } from "./../appTheme";
import CodeOutput from "./CodeOutput";
import main from './init.js';

function SPOCKLY({ isDarkMode }) {
  const [code, setCode] = useState("");
  const theme = isDarkMode ? darkTheme : lightTheme;
  const [isLoading, setIsLoading] = useState(true);
  const [output, setOutput] = useState("Loading Pyodide...");
  useEffect(() => {
    const firstRun = async () => {
        const code =
        `import pyodide_js
await pyodide_js.loadPackage(['pandas', 'geopandas', 'requests', 'numpy', 'shapely'])
`;
        const result = await main(code);
        setOutput(result);
        console.info('Pyodide is ready!');
        setIsLoading(false);
    }
    firstRun();
  }, []);
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
            <BlocklyComponent setCode={ setCode } isDarkMode={ isDarkMode } />
          </Card>
        </Grid>

        <Grid
          size={ 6 }
          sx={{
            height: "100%",
            overflow: "scroll",
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
            <Box sx={{ height: "50%" }}>
              <CodeDisplay code={ code } isDarkMode={ isDarkMode } />
            </Box>
            <Box sx={{ height: "50%" }}>
              <CodeOutput code={ code } isDarkMode={ isDarkMode } />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SPOCKLY;
