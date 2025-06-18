import React, { useEffect, useState, useRef } from "react";
import { Box, Fab, Stack, Typography } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { darkTheme, lightTheme } from "./../appTheme";
import { ContentPaste } from '@mui/icons-material';
import main from './init.js';
import { pyodideWorker } from "./workerApi.mjs";
import { asyncRun } from "./workerApi.mjs";

const CodeOutput = ({ code, isDarkMode, setPlot }) => {
    const [output, setOutput] = useState("Loading Pyodide...");
    const [isLoading, setIsLoading] = useState(true);
    const theme = isDarkMode ? darkTheme : lightTheme;

    const runCode = async () => {
      console.log('Running code...');
      setOutput("Running...");
      if(~code.indexOf('plt.') || ~code.indexOf('df_interp.plot')) {
        code = `
import io
import base64
import js

class Dud:
    def __init__(self, *args, **kwargs) -> None:
        return
    
    def __getattr__(self, __name: str):
        return Dud

js.document = Dud()

${code}

bytes_io = io.BytesIO()
plt.savefig(bytes_io, format='jpg')
bytes_io.seek(0)
base64_encoded_spectrogram = base64.b64encode(bytes_io.read())
print(base64_encoded_spectrogram.decode('utf-8'))`
      }
      const result = await main(code);
      const saveMap = !~code.indexOf('###DISPLAYONLY###');
      var fileName;
      try {
        fileName = code.split("m.save('")[1].split(".html')")[0];
      } catch {
        fileName = 'map';
      }
      const foliumHandler = async (code, fileName) => {
        if(~code.indexOf("m.save('")) {
          let txt = await asyncRun(`
            with open('${fileName}.html', 'rt') as fh:
                txt = fh.read()
            txt
`, {});
          const blob = new Blob([txt.result], {type : 'text/html'});
          let url = window.URL.createObjectURL(blob);
          window.open(url);
          if (saveMap) {
            var a = document.createElement("a");
            a.href = url;
            a.download = fileName;
            a.click();
          }
          window.URL.revokeObjectURL(url); // Preventing memory leaks
        }
      }
      foliumHandler(code, fileName);
      setOutput(result);
      if (typeof result === "string" && result.length > 100 && /^[A-Za-z0-9+/=\s]+$/.test(result)) {
        try {
          setPlot(result);
        } catch {
          setPlot("");
        }
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
      </Stack>

      <Box
        sx={{
          position: "relative",
          borderRadius: "5px",
          width: "100%",
          height: "80%",
          bgcolor: theme.palette.background.paper,
          zIndex: 1,
          overflow: "auto",
        }}
      >
        <Typography
          fontWeight="bold"
          sx={{
            color: isDarkMode ? "#FFFFFA" : "#000000",
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