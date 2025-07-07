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

  const loadJsPDF = async () => {
    if (window.jspdf) return window.jspdf;

    try {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      document.head.appendChild(script);

      return new Promise((resolve, reject) => {
        script.onload = () => resolve(window.jspdf);
        script.onerror = () => reject(new Error('Failed to load jsPDF'));
      });
    } catch (error) {
      throw new Error('Failed to load jsPDF');
    }
  };

  const exportPlotAsPDF = async (filename) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const jspdf = await loadJsPDF();
      const { jsPDF } = jspdf;

      const imgData = canvas.toDataURL('image/png');
      const widthInMM = canvas.width * 0.264583;
      const heightInMM = canvas.height * 0.264583;

      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
        unit: 'mm',
        format: [widthInMM, heightInMM]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, widthInMM, heightInMM);
      pdf.save(filename);

      setTextOutput(prev => prev + `\nPlot exported as ${filename}`);

    } catch (error) {
      console.warn('PDF export failed, falling back to PNG:', error);
      canvas.toBlob((blob) => {
        if (blob) {
          const pngFilename = filename.replace('.pdf', '.png');
          downloadFile(blob, pngFilename);
          setTextOutput(prev => prev + `\nPDF export failed, saved as PNG: ${pngFilename}`);
        }
      }, 'image/png');
    }
  };

  const exportDataAsCSV = async (filename, dataVarName) => {
    try {
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

  const handleLeafletDisplay = async (code) => {
    try {
      const webRForLeaflet = webRRef?.current || webR;

      const result = await webRForLeaflet.evalR(`
        if (exists("leaflet_map")) {
          map_data <- leaflet_map$x

          if (!is.null(map_data$options$crs)) {
            map_data$options$crs <- NULL
          }

          widget_json <- jsonlite::toJSON(map_data, auto_unbox = TRUE, digits = 16, null = "null")

          html_content <- paste0(
            '<!DOCTYPE html>\\n',
            '<html>\\n',
            '<head>\\n',
            '  <meta charset="utf-8">\\n',
            '  <title>Leaflet Map</title>\\n',
            '  <meta name="viewport" content="width=device-width, initial-scale=1.0">\\n',
            '  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />\\n',
            '  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>\\n',
            '  <style>\\n',
            '    html, body { width: 100%; height: 100%; margin: 0; padding: 0; }\\n',
            '    #map { width: 100%; height: 100%; }\\n',
            '  </style>\\n',
            '</head>\\n',
            '<body>\\n',
            '  <div id="map"></div>\\n',
            '  <script>\\n',
            '    document.addEventListener("DOMContentLoaded", function() {\\n',
            '      try {\\n',
            '        var mapData = ', widget_json, ';\\n',
            '        \\n',
            '        var map = L.map("map");\\n',
            '        \\n',
            '        if (mapData.setView && mapData.setView.length >= 2) {\\n',
            '          var coords = mapData.setView[0];\\n',
            '          var zoom = mapData.setView[1];\\n',
            '          map.setView([coords[0], coords[1]], zoom);\\n',
            '        } else {\\n',
            '          map.setView([0, 0], 2);\\n',
            '        }\\n',
            '        \\n',
            '        if (mapData.calls && Array.isArray(mapData.calls)) {\\n',
            '          mapData.calls.forEach(function(call) {\\n',
            '            try {\\n',
            '              switch(call.method) {\\n',
            '                case "addTiles":\\n',
            '                  var tileUrl = call.args[0] || "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";\\n',
            '                  var tileOptions = call.args[3] || {};\\n',
            '                  L.tileLayer(tileUrl, tileOptions).addTo(map);\\n',
            '                  break;\\n',
            '                  \\n',
            '                case "addMarkers":\\n',
            '                  if (call.args && call.args.length >= 2) {\\n',
            '                    var lat = call.args[0];\\n',
            '                    var lng = call.args[1];\\n',
            '                    if (Array.isArray(lat) && Array.isArray(lng)) {\\n',
            '                      for (var i = 0; i < lat.length; i++) {\\n',
            '                        L.marker([lat[i], lng[i]]).addTo(map);\\n',
            '                      }\\n',
            '                    } else if (typeof lat === "number" && typeof lng === "number") {\\n',
            '                      L.marker([lat, lng]).addTo(map);\\n',
            '                    }\\n',
            '                  }\\n',
            '                  break;\\n',
            '                  \\n',
            '                case "addCircles":\\n',
            '                  if (call.args && call.args.length >= 2) {\\n',
            '                    var lat = call.args[0];\\n',
            '                    var lng = call.args[1];\\n',
            '                    var options = {};\\n',
            '                    if (call.args[2]) options.radius = call.args[2];\\n',
            '                    if (call.args[3]) options.color = call.args[3];\\n',
            '                    if (call.args[4]) options.fillColor = call.args[4];\\n',
            '                    if (call.args[5]) options.fillOpacity = call.args[5];\\n',
            '                    if (Array.isArray(lat) && Array.isArray(lng)) {\\n',
            '                      for (var i = 0; i < lat.length; i++) {\\n',
            '                        L.circle([lat[i], lng[i]], options).addTo(map);\\n',
            '                      }\\n',
            '                    } else if (typeof lat === "number" && typeof lng === "number") {\\n',
            '                      L.circle([lat, lng], options).addTo(map);\\n',
            '                    }\\n',
            '                  }\\n',
            '                  break;\\n',
            '                  \\n',
            '                case "addPolygons":\\n',
            '                  if (call.args && call.args.length >= 1) {\\n',
            '                    var coords = call.args[0];\\n',
            '                    var options = call.args[1] || {};\\n',
            '                    if (coords && coords.length > 0) {\\n',
            '                      L.polygon(coords, options).addTo(map);\\n',
            '                    }\\n',
            '                  }\\n',
            '                  break;\\n',
            '              }\\n',
            '            } catch (e) {\\n',
            '              console.error("Error processing call:", call.method, e);\\n',
            '            }\\n',
            '          });\\n',
            '        }\\n',
            '        \\n',
            '      } catch (error) {\\n',
            '        console.error("Error creating map:", error);\\n',
            '        document.body.innerHTML = "<h1>Error creating map</h1><p>" + error.message + "</p>";\\n',
            '      }\\n',
            '    });\\n',
            '  </script>\\n',
            '</body>\\n',
            '</html>'
          )

          html_content
        } else {
          "No leaflet map found"
        }
      `);

      const htmlContent = await result.toString();

      if (htmlContent === "No leaflet map found") {
        setTextOutput(prev => prev + `\nNo leaflet map found`);
        return;
      }

      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);

      const newTab = window.open(url, '_blank');

      if (newTab) {
        setTextOutput(prev => prev + `\nLeaflet map opened in new tab`);

        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 1000);
      } else {
        setTextOutput(prev => prev + `\nPopup blocked - please allow popups for this site`);
      }
    } catch (err) {
      console.error("Error displaying leaflet map:", err);
      setTextOutput(prev => prev + `\nError displaying leaflet map: ${err.message}`);
    }
  };

  const processExportCommands = async (code) => {
    const lines = code.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.match(/png\s*\(\s*["']([^"']+)["']\s*\)/)) {
        const match = line.match(/png\s*\(\s*["']([^"']+)["']\s*\)/);
        const filename = match[1];
        setTimeout(() => exportPlotAsPNG(filename), 1000);
      }

      if (line.match(/pdf\s*\(\s*["']([^"']+)["']\s*\)/)) {
        const match = line.match(/pdf\s*\(\s*["']([^"']+)["']\s*\)/);
        const filename = match[1];
        setTimeout(async () => await exportPlotAsPDF(filename), 1000);
      }

      if (line.match(/write\.csv\s*\(\s*([^,]+)\s*,\s*file\s*=\s*["']([^"']+)["']/)) {
        const match = line.match(/write\.csv\s*\(\s*([^,]+)\s*,\s*file\s*=\s*["']([^"']+)["']/);
        const dataVar = match[1].trim();
        const filename = match[2];
        setTimeout(() => exportDataAsCSV(filename, dataVar), 600);
      }

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
      .replace(/pdf\s*\([^)]+\)/g, '')
      .replace(/dev\.off\s*\(\s*\)/g, '')
      .replace(/write\.csv\s*\([^)]+\)/g, '')
      .replace(/save\.image\s*\([^)]+\)/g, '')
      .replace(/htmlwidgets::saveWidget\s*\([^)]+\)/g, '');
  };

  const installAndLoadPackages = async () => {
    const packages = ["jsonlite", "sp", "gstat", "leaflet", "htmlwidgets"];
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

  const detectLeafletCode = (code) => {
    const leafletPatterns = [
      /leaflet\s*\(\s*\)/,
      /leaflet_map\s*<-/,
      /addTiles\s*\(\s*\)/,
      /addMarkers\s*\(/,
      /addCircles\s*\(/,
      /addPolygons\s*\(/,
      /setView\s*\(/,
      /fitBounds\s*\(/,
      /library\s*\(\s*leaflet\s*\)/,
      /library\s*\(\s*"leaflet"\s*\)/,
      /require\s*\(\s*leaflet\s*\)/,
      /require\s*\(\s*"leaflet"\s*\)/
    ];

    return leafletPatterns.some(pattern => pattern.test(code));
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

    const isLeafletCode = detectLeafletCode(code);

    try {
      await setupSfPackage();
      const webRForCanvas = webRRef?.current || webR;

      if (!isLeafletCode) {
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
      }
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

        if (isLeafletCode) {
          setTimeout(() => handleLeafletDisplay(cleanedCode), 1000);
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
          if (isLeafletCode) {
            setTimeout(() => handleLeafletDisplay(cleanedCode), 1000);
          }
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
