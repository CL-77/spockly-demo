import React, { useEffect, useRef, useState } from "react";
import { WebR } from "@r-wasm/webr";
import {
  Box,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { darkTheme, lightTheme } from "./../appTheme";
import PackageLoadingDialog from "./PackageLoadingDialog";

const webR = new WebR();
const CANVAS_SIZE = 650;

const WebRRunner = ({ code, isDarkMode, webRRef }) => {
  const canvasRef = useRef(null);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const [textOutput, setTextOutput] = useState("");
  const [sfPackageReady, setSfPackageReady] = useState(false);
  const [sfSetupInProgress, setSfSetupInProgress] = useState(false);  
  const [webRReady, setWebRReady] = useState(false);
  const [showLoadingDialog, setShowLoadingDialog] = useState(false);
  const [currentPackage, setCurrentPackage] = useState("");
  const [packagesReady, setPackagesReady] = useState(false);

  const installAndLoadPackages = async () => {
    const packages = ["jsonlite", "sp", "gstat"];
  
    for (const pkg of packages) {
      setCurrentPackage(pkg);
      try {
        await webR.installPackages([pkg]);
        await webR.evalRVoid(`suppressMessages(library(${pkg}))`);
      } catch (err) {
        console.error(`Error installing/loading ${pkg}:`, err);
      }
    }
    setPackagesReady(true);
    setCurrentPackage("");
    setCurrentPackage("Done!");

    setTimeout(() => {
      setShowLoadingDialog(false);
      setCurrentPackage("");
    }, 2000);
    
  };  

  const setupSfPackage = async () => {
    if (sfPackageReady || sfSetupInProgress || !webRReady) return;
    setSfSetupInProgress(true);
    try {
      console.log("Setting up minimal units database...");

      // Create minimal XML database as a replacement for udunits2
      await webR.evalRVoid(`
        minimal_xml_lines <- c(
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<unit-system>',
          '  <unit>',
          '    <def>1</def>',
          '    <name><singular>meter</singular><plural>meters</plural></name>',
          '    <symbol>m</symbol>',
          '  </unit>',
          '  <unit>',
          '    <def>1</def>',
          '    <name><singular>kilogram</singular><plural>kilograms</plural></name>',
          '    <symbol>kg</symbol>',
          '  </unit>',
          '  <unit>',
          '    <def>1</def>',
          '    <name><singular>second</singular><plural>seconds</plural></name>',
          '    <symbol>s</symbol>',
          '  </unit>',
          '  <unit>',
          '    <def>1</def>',
          '    <name><singular>degree</singular><plural>degrees</plural></name>',
          '    <symbol>deg</symbol>',
          '  </unit>',
          '  <unit>',
          '    <def>1</def>',
          '    <name><singular>radian</singular><plural>radians</plural></name>',
          '    <symbol>rad</symbol>',
          '  </unit>',
          '  <unit>',
          '    <def>m^2</def>',
          '    <name><singular>square meter</singular><plural>square meters</plural></name>',
          '    <symbol>m2</symbol>',
          '  </unit>',
          '  <unit>',
          '    <def>1000 m</def>',
          '    <name><singular>kilometer</singular><plural>kilometers</plural></name>',
          '    <symbol>km</symbol>',
          '  </unit>',
          '</unit-system>'
        )
        minimal_xml <- paste(minimal_xml_lines, collapse = "\\n")
        writeLines(minimal_xml, "/home/web_user/minimal_udunits.xml")
        Sys.setenv(UDUNITS2_XML_PATH = "/home/web_user/minimal_udunits.xml")
      `);

      await webR.evalRVoid(`
        options(units.database.path = "/home/web_user/minimal_udunits.xml")
        .onLoad_units_patched <- function(libname, pkgname) {
          Sys.setenv(UDUNITS2_XML_PATH = "/home/web_user/minimal_udunits.xml")
          return(invisible(NULL))
        }

        suppressMessages(suppressWarnings({
          tryCatch({
            library(units)
          }, error = function(e) {
            tryCatch({
              loadNamespace("units")
              library.dynam("units", "units")
            }, error = function(e2) {})
          })
        }))
      `);

      await webR.installPackages(["sf"]);
      await webR.evalRVoid(`suppressMessages(library(sf))`);
      setSfPackageReady(true);
    } catch (err) {
      console.error("Error setting up sf:", err);
    } finally {
      setSfSetupInProgress(false);
    }
  };

  useEffect(() => {
    const initWebR = async () => {
      try {
        await webR.init();
        setWebRReady(true);
        if (webRRef) webRRef.current = webR;
  
        await installAndLoadPackages();  // install and load packages in background
        await setupSfPackage();          // same for sf
      } catch (err) {
        console.error("WebR init failed:", err);
        setTextOutput(`Error initializing WebR: ${err.message}`);
      }
    };
    initWebR();
  }, []);
  

  useEffect(() => {
    if (webRReady && !sfPackageReady) {
      setupSfPackage();
    }
  }, [webRReady, sfPackageReady]);

  const runCode = async () => {
    setTextOutput("");

    // Check if packages are ready
    const stillInstalling = !packagesReady;
    // if packages are noch ready show dialog
    if (stillInstalling) {
      setShowLoadingDialog(true);
      while (!packagesReady) {
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      setShowLoadingDialog(false);
    }
    
    // Fallback: ensure currentPackage is cleared
    setCurrentPackage("");

    try {
      await setupSfPackage();
      await webR.evalRVoid("options(device=webr::canvas)");
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      (async () => {
        for (;;) {
          const output = await webR.read();
          switch (output.type) {
            case "canvas":
              if (output.data.event === "canvasImage") {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(
                  output.data.image,
                  0,
                  0,
                  canvas.width - 10,
                  canvas.height - 10
                );
              } else if (output.data.event === "canvasNewPage") {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, canvas.width, canvas.height);
              }
              break;
            case "stdout":
            case "stderr":
              if (output.data) {
                setTextOutput((prev) => prev + output.data);
              }
              break;
            default:
              console.log(output);
          }
        }
      })();

      let result;
      try {
        result = await webR.evalR(code);
        if (result) {
          const values = await result.toArray();
          const filtered = values.filter(
            (val) =>
              val &&
              val.toString().trim() !== "" &&
              !val.toString().includes("R is a collaborative project") &&
              !val.toString().includes("Type ") &&
              !val.toString().includes("Copyright") &&
              !val.toString().includes("R version") &&
              val.toString() !== "NULL"
          );
          if (filtered.length > 0) {
            setTextOutput(
              (prev) => prev + (prev ? "\n" : "") + filtered.join("\n")
            );
          }
        }
      } catch (err) {
        try {
          await webR.evalRVoid(code);
        } catch (voidErr) {
          setTextOutput(`Error: ${voidErr.message}`);
        }
      }
    } catch (err) {
      console.error("WebR Error:", err);
      setTextOutput(`Error: ${err.message}`);
    }
  };

  return (
    <Box sx={{ height: "100%", borderRadius: "5px", zIndex: 1 }}>
      <Stack direction="row-reverse" sx={{ paddingY: 1 }}>
        <Tooltip title="Run R Code">
          <IconButton
            onClick={runCode}
            sx={{
              bgcolor: "#33bfff",
              color: theme.palette.primary.contrastText,
              "&:hover": {
                bgcolor: "#00b0ff",
              },
            }}
          >
            <PlayArrow />
          </IconButton>
        </Tooltip>
      </Stack>
      <Box
        sx={{
          position: "relative",
          borderRadius: "5px",
          height: CANVAS_SIZE,
          bgcolor: theme.palette.background.paper,
          zIndex: 1,
          overflow: "auto",
        }}
      >
        {textOutput && (
          <Box
            sx={{
              fontFamily: "monospace",
              fontSize: "14px",
              whiteSpace: "pre-wrap",
              margin: 4,
            }}
          >
            {textOutput}
          </Box>
        )}
        <Box sx={{ marginX: 4 }}>
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE * window.devicePixelRatio}
            height={CANVAS_SIZE * window.devicePixelRatio}
            style={{
              width: CANVAS_SIZE + "px",
              height: CANVAS_SIZE + "px",
              display: "block",
            }}
          />
          <PackageLoadingDialog
            open={showLoadingDialog}
            currentPackage={currentPackage}
            onClose={() => setShowLoadingDialog(false)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default WebRRunner;


