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

const WebRRunner = ({ code, isDarkMode, webRRef, setCurrentPackage }) => {
  const canvasRef = useRef(null);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const [textOutput, setTextOutput] = useState("");
  const [sfPackageReady, setSfPackageReady] = useState(false);
  const [sfSetupInProgress, setSfSetupInProgress] = useState(false);
  const [webRReady, setWebRReady] = useState(false);
  const [showLoadingDialog, setShowLoadingDialog] = useState(false);
  const [currentPackageInternal, setCurrentPackageInternal] = useState("");
  const [packagesReady, setPackagesReady] = useState(false);

  const downloadFile = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportPlotAsPNG = (filename) => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.toBlob((blob) => {
        if (blob) {
          downloadFile(blob, filename);
          setTextOutput(prev => prev + `\nPlot exported as ${filename}`);
        }
      }, 'image/png');
    }
  };

  const exportDataAsCSV = async (filename, dataVarName) => {
    try {
      // Wait for WebR to be ready
      if (!webRReady || !packagesReady) {
        setTextOutput(prev => prev + `\nWaiting for WebR to be ready...`);
        return;
      }

      const webRForCSV = webRRef?.current || webR;
      
      const result = await webRForCSV.evalR(`
        if (exists("${dataVarName}")) {
          write.csv(${dataVarName}, file = "", row.names = FALSE)
        } else {
          "Error: Variable '${dataVarName}' not found"
        }
      `);
      
      const csvContent = await result.toString();
      
      if (csvContent.includes("Error:")) {
        setTextOutput(prev => prev + `\n${csvContent}`);
        return;
      }
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      downloadFile(blob, filename);
      setTextOutput(prev => prev + `\nCSV exported as ${filename}`);
    } catch (err) {
      console.error("Error exporting CSV:", err);
      setTextOutput(prev => prev + `\nError exporting CSV: ${err.message}`);
    }
  };

  const exportWorkspace = async (filename) => {
    try {
      // Wait for WebR to be ready
      if (!webRReady || !packagesReady) {
        setTextOutput(prev => prev + `\nWaiting for WebR to be ready...`);
        return;
      }

      const webRForWorkspace = webRRef?.current || webR;
      
      const result = await webRForWorkspace.evalR(`
        temp_file <- tempfile()
        save.image(file = temp_file)
        readBin(temp_file, "raw", file.info(temp_file)$size)
      `);
      
      const workspaceData = await result.toTypedArray();
      const blob = new Blob([workspaceData], { type: 'application/octet-stream' });
      downloadFile(blob, filename);
      setTextOutput(prev => prev + `\nWorkspace saved as ${filename}`);
    } catch (err) {
      console.error("Error exporting workspace:", err);
      setTextOutput(prev => prev + `\nError exporting workspace: ${err.message}`);
    }
  };

  const processExportCommands = async (code) => {
    const lines = code.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Detect PNG export pattern
      if (line.match(/png\s*\(\s*["']([^"']+)["']\s*\)/)) {
        const match = line.match(/png\s*\(\s*["']([^"']+)["']\s*\)/);
        const filename = match[1];
        setTimeout(() => exportPlotAsPNG(filename), 1000);
      }
      
      // Detect CSV export pattern
      if (line.match(/write\.csv\s*\(\s*([^,]+)\s*,\s*file\s*=\s*["']([^"']+)["']/)) {
        const match = line.match(/write\.csv\s*\(\s*([^,]+)\s*,\s*file\s*=\s*["']([^"']+)["']/);
        const dataVar = match[1].trim();
        const filename = match[2];
        setTimeout(() => exportDataAsCSV(filename, dataVar), 600);
      }
      
      // Detect workspace save pattern
      if (line.match(/save\.image\s*\(\s*file\s*=\s*["']([^"']+)["']/)) {
        const match = line.match(/save\.image\s*\(\s*file\s*=\s*["']([^"']+)["']/);
        const filename = match[1];
        setTimeout(() => exportWorkspace(filename), 600);
      }
    }
  };

  const cleanCodeForExecution = (code) => {
    return code
      .replace(/png\s*\([^)]+\)/g, '')
      .replace(/dev\.off\s*\(\s*\)/g, '')
      .replace(/write\.csv\s*\([^)]+\)/g, '')
      .replace(/save\.image\s*\([^)]+\)/g, '');
  };

  const installAndLoadPackages = async () => {
    const packages = ["jsonlite", "sp", "gstat"];
    for (const pkg of packages) {
      setCurrentPackageInternal(pkg);
      setCurrentPackage(pkg);
      try {
        await webR.installPackages([pkg]);
        await webR.evalRVoid(`suppressMessages(library(${pkg}))`);
      } catch (err) {
        console.error(`Error installing/loading ${pkg}:`, err);
      }
    }
    setPackagesReady(true);
    setCurrentPackageInternal("Done!");
    setCurrentPackage("Done!");
    setTimeout(() => {
      setShowLoadingDialog(false);
      setCurrentPackageInternal("");
      setCurrentPackage("");
    }, 2000);
  };

  const setupSfPackage = async () => {
    if (sfPackageReady || sfSetupInProgress || !webRReady) return;
    setSfSetupInProgress(true);
    try {
      await webR.evalRVoid(`
        local_udunits_files <- c(
          "udunits2-prefixes.xml",
          "udunits2-base.xml",
          "udunits2-derived.xml",
          "udunits2-accepted.xml",
          "udunits2-common.xml"
        )
        for (file in local_udunits_files) {
          file_path <- paste0("/units/", file)
          content <- readLines(file_path)
          writeLines(content, paste0("/home/web_user/", file))
        }
        udunits_xml_content <- c(
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<unit-system>',
          '  <import>udunits2-prefixes.xml</import>',
          '  <import>udunits2-base.xml</import>',
          '  <import>udunits2-derived.xml</import>',
          '  <import>udunits2-accepted.xml</import>',
          '  <import>udunits2-common.xml</import>',
          '</unit-system>'
        )
        writeLines(udunits_xml_content, "/home/web_user/udunits2.xml")
        Sys.setenv(UDUNITS2_XML_PATH = "/home/web_user/udunits2.xml")
      `);
      await webR.evalRVoid(`
        options(units.database.path = "/home/web_user/udunits2.xml")
        .onLoad_units_patched <- function(libname, pkgname) {
          Sys.setenv(UDUNITS2_XML_PATH = "/home/web_user/udunits2.xml")
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

  const runCodeWithSfWorkaround = async (code) => {
    const webRForSf = webRRef?.current || webR;
    
    if (
      code.includes('library("sf")') ||
      code.includes("library(sf)") ||
      code.includes("sf::")
    ) {
      const lines = code.split("\n");
      let modifiedCode = "";
      let sfInstallLine = "";
      let sfLibraryLine = "";
      for (const line of lines) {
        if (line.includes('webr::install("sf")')) {
          sfInstallLine = line;
        } else if (
          line.includes('library("sf")') ||
          line.includes("library(sf)")
        ) {
          sfLibraryLine = line;
        } else {
          modifiedCode += line + "\n";
        }
      }
      if (sfInstallLine) {
        await webRForSf.evalRVoid(sfInstallLine);
      }
      await webRForSf.evalRVoid(`
        Sys.setenv(UDUNITS2_XML_PATH = "/home/web_user/udunits2.xml")
        sf_loaded <- FALSE
        suppressMessages(suppressWarnings({
          tryCatch({
            library(sf)
            sf_loaded <- TRUE
            message("SF package loaded successfully")
          }, error = function(e) {
            tryCatch({
              loadNamespace("sf")
              attachNamespace("sf")
              sf_loaded <- TRUE
              message("SF package loaded with workaround")
            }, error = function(e2) {
              tryCatch({
                library.dynam("sf", "sf")
                sf_loaded <- TRUE
                message("SF package partially loaded")
              }, error = function(e3) {
                message(paste("SF loading failed:", e3$message))
              })
            })
          })
        }))
      `);
      if (modifiedCode.trim()) {
        return await webRForSf.evalR(modifiedCode);
      }
    } else {
      return await webRForSf.evalR(code);
    }
  };

  useEffect(() => {
    const initWebR = async () => {
      try {
        await webR.init();
        setWebRReady(true);
        if (webRRef) webRRef.current = webR;
        await installAndLoadPackages();
        await setupSfPackage();
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
    const stillInstalling = !packagesReady;
    if (stillInstalling) {
      setShowLoadingDialog(true);
      while (!packagesReady) {
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      setShowLoadingDialog(false);
    }
    setCurrentPackageInternal("");
    setCurrentPackage("");
    try {
      await setupSfPackage();
      const webRForCanvas = webRRef?.current || webR;
      await webRForCanvas.evalRVoid("options(device=webr::canvas)");
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

      await processExportCommands(code);

      const cleanedCode = cleanCodeForExecution(code);
      const webRForExecution = webRRef?.current || webR;

      let result;
      try {
        if (
          cleanedCode.includes("sf::") ||
          cleanedCode.includes('library("sf")') ||
          cleanedCode.includes("library(sf)")
        ) {
          result = await runCodeWithSfWorkaround(cleanedCode);
        } else {
          result = await webRForExecution.evalR(cleanedCode);
        }
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
          await webRForExecution.evalRVoid(cleanedCode);
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
            currentPackage={currentPackageInternal}
            onClose={() => setShowLoadingDialog(false)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default WebRRunner;