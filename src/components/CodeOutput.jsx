import React, { useEffect, useState, useRef } from "react";
import { Box, Fab, Stack, Typography } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { darkTheme, lightTheme } from "./../appTheme";
import { ContentPaste } from '@mui/icons-material';
import main from './init.js';
import { pyodideWorker } from "./workerApi.mjs";

const CodeOutput = ({ code, isDarkMode, setPlot }) => {
    const [output, setOutput] = useState("Loading Pyodide...");
    const [isLoading, setIsLoading] = useState(true);
    const theme = isDarkMode ? darkTheme : lightTheme;
    // const refCode = useRef(null);

    const runCode = async () => {
      console.log('Running code...');
      setOutput("Running...");
      const result = await main(code);
      setOutput(result);
      console.log(typeof result, result.length, /^[A-Za-z0-9+/=\s]+$/.test(result));
      if (typeof result === "string" && result.length > 100 && /^[A-Za-z0-9+/=\s]+$/.test(result)) {
        console.info('%cRESULT IS A PLOT', 'color: #089d08; font-weight: bold; background-color: #FFF; font-size: 1.5em;');
        setPlot(result);
      } else {
        setPlot("");
      }
    }
    useEffect(() => {
        pyodideWorker.addEventListener("message", (event) => {
            if (event.data && event.data.ready) {
                setOutput('No output');
                setIsLoading(false);
            }
        });
    }, []);
    useEffect(() => {
        const findInfo = () => {
            const cslInfo = console.info;
            console.info = function(message) {
                onInfo(message);
            };

            function onInfo(message){
                cslInfo(message);
                if (message === 'Pyodide is ready!') {
                    try {
                        document.getElementsByClassName('Mui-disabled')[0].classList.remove('Mui-disabled');
                    } catch {}
                    document.getElementById('toast').style.color = '#089d08';
                    document.querySelector('#toast p').innerHTML = 'Libraries loaded!';
                    document.getElementById('toast').style.animation = 'slideOut 5s ease-in-out';
                    setTimeout(() => document.getElementById('toast').style.display = 'none', 4950);
                    document.addEventListener(
                        "keydown",
                        (ev) => {
                        const keyName = ev.key;
                            if (keyName === "Control") {
                            return;
                        }
                            if ((ev.ctrlKey || ev.metaKey) && ev.altKey && keyName === 'Enter') {
                            ev.preventDefault();
                            runCode();
                        }
                        },
                        false,
                  );
                }
            }
        };
        findInfo();
    });

// document.addEventListener(
//   "keydown",
//   (ev) => {
//     const keyName = ev.key;
//     if (keyName === "Control") {
//         return;
//     }
//     if ((ev.ctrlKey || ev.metaKey) && ev.altKey && keyName === 'c') {
//         ev.preventDefault();
//         navigator.clipboard.writeText(output)
//             .then(() => {
//                 refCode.current.innerText = 'Output Copied!';
//                 setTimeout(() => refCode.current.innerText = 'Copy Output', 1500);
//             })
//             .catch((e) => console.error('The output could not be copied. ' + e));
//     }
//   },
//   false,
// );

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
          Output
        </Typography>

        <Fab
          size="small"
          variant="extended"
          sx={{
            left: 20,
            width: "200px",
            bgcolor: "#33bfff",
            color: theme.palette.primary.contrastText,
            "&:hover": {
              bgcolor: "#00b0ff",
            },
            boxShadow: "none",
          }}
          onClick={ runCode }
          disabled={ isLoading }
        >
          <Box display="flex" alignItems="center" gap={ 0.5 }>
            <PlayArrow fontSize="small" />
            <Typography fontWeight="bold">Run Python Code</Typography>
          </Box>
        </Fab>
        <Box display="flex" alignItems="center" gap={ 0.5 }>
          <Typography sx={{ fontSize: "0.9em", marginLeft: "30px", color: "#BBB" }}>Ctrl + Alt + Enter</Typography>  
        </Box>
        {/* { ~document.location.href.indexOf('https') || ~document.location.href.indexOf('localhost') ? (
          <>
        <Box display="flex" marginLeft="auto" alignItems="center" gap={ 0.5 }>
          <Typography sx={{ fontSize: "0.9em", marginRight: "10px", color: "#BBB" }}>Ctrl + Alt + C</Typography>  
        </Box>
        <Fab 
          size="small"
          variant="extended"
          sx={{
            width: "160px",
            bgcolor: "#f58a42",
            color: theme.palette.primary.light,
            "&:hover": {
              bgcolor: "#d77a3c",
            },
            boxShadow: "none",
          }}
          onClick={
            () => navigator.clipboard.writeText(output)
              .catch((e) => console.error('The output could not be copied. ' + e))
              .then(refCode.current.innerText = 'Output Copied!')
              .then(setTimeout(() => refCode.current.innerText = 'Copy Output', 1500))
          }
          >
          <Box display="flex" alignItems="center" gap={ 0.5 }>
            <ContentPaste fontSize="small" />
            <Typography ref={ refCode } fontWeight="bold">Copy Output</Typography>
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
          overflow: "auto",
        }}
      >
        <Typography
          fontWeight="bold"
          sx={{
            color: theme.palette.primary.contrastText,
            paddingBottom: "10px",
            padding: "20px",
            whiteSpace: "pre-wrap",
          }}
        >
          { output || 'No output' }
        </Typography>
      </Box>
    </Box>
    );
};

export default CodeOutput;