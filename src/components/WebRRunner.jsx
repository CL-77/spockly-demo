import React, { useEffect, useRef, useState } from "react";
import { WebR } from "@r-wasm/webr";
import { Box, Fab, Stack, Typography } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { darkTheme, lightTheme } from "./../appTheme";

const webR = new WebR();

const WebRRunner = ({ code, isDarkMode, webRRef }) => {
  const canvasRef = useRef(null);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const [textOutput, setTextOutput] = useState("");
  const [sfPackageReady, setSfPackageReady] = useState(false);
  const [webRReady, setWebRReady] = useState(false);

  // Setup sf package with minimal units database
  const setupSfPackage = async () => {
    if (sfPackageReady || !webRReady) return;

    try {
      console.log("Setting up minimal units database...");

      // Create minimal XML avoiding React's auto-shorting of tags
      // Using the exact structure from r-backend but with properly escaped XML
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

        units_loaded <- FALSE
        suppressMessages(suppressWarnings({
          tryCatch({
            library(units)
            units_loaded <- TRUE
          }, error = function(e) {
            message("Normal units loading failed, trying workaround...")
            tryCatch({
              loadNamespace("units")
              library.dynam("units", "units")
              units_loaded <- TRUE
            }, error = function(e2) {
              message("Units loading completely failed")
            })
          })
        }))
      `);

      console.log("Minimal units database successfully initialized.");
      setSfPackageReady(true);
    } catch (err) {
      console.error("Error setting up database:", err);
      setSfPackageReady(true);
    }
  };

  // Run code with sf workaround
  const runCodeWithSfWorkaround = async (code) => {
    if (code.includes('library("sf")') || code.includes('library(sf)') || code.includes('sf::')) {
      const lines = code.split('\n');
      let modifiedCode = '';
      let sfInstallLine = '';
      let sfLibraryLine = '';

      for (const line of lines) {
        if (line.includes('webr::install("sf")')) {
          sfInstallLine = line;
        } else if (line.includes('library("sf")') || line.includes('library(sf)')) {
          sfLibraryLine = line;
        } else {
          modifiedCode += line + '\n';
        }
      }

      if (sfInstallLine) {
        await webR.evalRVoid(sfInstallLine);
      }

      await webR.evalRVoid(`
        Sys.setenv(UDUNITS2_XML_PATH = "/home/web_user/minimal_udunits.xml")
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
        return await webR.evalR(modifiedCode);
      }
    } else {
      return await webR.evalR(code);
    }
  };

  // Initialize WebR only once when the component mounts
  useEffect(() => {
    const initWebR = async () => {
      try {
        // Initialize WebR environment
        await webR.init();
        console.log("WebR initialized");
        
        setWebRReady(true);
        
        // Make WebR instance available to parent components
        if (webRRef) {
          webRRef.current = webR;
        }
      } catch (err) {
        console.error("WebR initialization failed:", err);
        setTextOutput(`Error initializing WebR: ${err.message}`);
      }
    };
    initWebR();
  }, []); // Empty dependency array means this runs once on mount

  // Setup sf package when WebR is ready
  useEffect(() => {
    if (webRReady && !sfPackageReady) {
      setupSfPackage();
    }
  }, [webRReady, sfPackageReady]);

  // Function to run R code
  const runCode = async () => {
    // Clear previous text output
    setTextOutput("");
    
    try {
      // Setup sf package if needed
      await setupSfPackage();
      
      // Set the default graphics device to webr::canvas
      await webR.evalRVoid('options(device=webr::canvas)');

      // Handle webR output messages in an async loop
      (async () => {
        for (;;) {
          const output = await webR.read();
          switch (output.type) {
            case 'canvas':
              if (output.data.event === 'canvasImage') {
                // Add plot image data to the current canvas element
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(output.data.image, 0, 0);
              } else if (output.data.event === 'canvasNewPage') {
                // Clear the canvas for a new plot
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
              }
              break;
            case 'stdout':
            case 'stderr':
              // Capture text output
              if (output.data) {
                setTextOutput(prev => prev + output.data);
              }
              break;
            default:
              console.log(output);
          }
        }
      })();

      // Evaluate the R code with text output capture
      let result;
      try {
        if (code.includes('sf::') || code.includes('library("sf")') || code.includes('library(sf)')) {
          result = await runCodeWithSfWorkaround(code);
        } else {
          result = await webR.evalR(code);
        }

        // If we have a result, display it as text output
        if (result) {
          const values = await result.toArray();
          const filtered = values.filter(val =>
            val && val.toString().trim() !== '' &&
            !val.toString().includes('R is a collaborative project') &&
            !val.toString().includes('Type ') &&
            !val.toString().includes('Copyright') &&
            !val.toString().includes('R version') &&
            val.toString() !== 'NULL'
          );
          if (filtered.length > 0) {
            setTextOutput(prev => prev + (prev ? '\n' : '') + filtered.join("\n"));
          }
        }
      } catch (err) {
        // If evalR fails, try evalRVoid
        try {
          await webR.evalRVoid(code);
        } catch (voidErr) {
          setTextOutput(`Error: ${voidErr.message}`);
        }
      }
    } catch (err) {
      // Handle errors gracefully
      console.error("WebR Error:", err);
      setTextOutput(`Error: ${err.message}`);
    }
  };

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
            color: theme.palette.primary.contrastText,
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
            width: "140px",
            bgcolor: "#33bfff",
            color: theme.palette.primary.contrastText,
            "&:hover": {
              bgcolor: "#00b0ff",
            },
            boxShadow: "none",
          }}
          onClick={runCode}
        >
          <Box display="flex" alignItems="center" gap={0.5}>
            <PlayArrow fontSize="small" />
            <Typography fontWeight="bold">Run R Code</Typography>
          </Box>
        </Fab>
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
          padding: "10px",
        }}
      >
        {/* Text output */}
        {textOutput && (
          <Box
            sx={{
              fontFamily: "monospace",
              fontSize: "14px",
              whiteSpace: "pre-wrap",
              marginBottom: "10px",
            }}
          >
            {textOutput}
          </Box>
        )}
        
        {/* Canvas for plots */}
        <canvas
          ref={canvasRef}
          width="1008"
          height="1008"
          style={{ width: "450px", height: "450px", display: "inline-block" }}
        />
      </Box>
    </Box>
  );
};

export default WebRRunner;