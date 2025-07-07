import {
  Box,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import * as Blockly from "blockly";
import { darkTheme, lightTheme } from "../appTheme";
import { Download } from "@mui/icons-material";
import { useEffect, useState } from "react";
import blockDescriptions from "../data/blockExplantions";

const WINDOW_SIZE = 550;

const BlockExplantions = ({ isDarkMode, workspaceRef }) => {
  const [currentBlock, setCurrentBlock] = useState(null);
  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    const workspace = workspaceRef.current;
    if (!workspace) return;

    const handleChange = (event) => {
      if (event.type === Blockly.Events.SELECTED) {
        const block = workspace.getBlockById(event.newElementId);
        setCurrentBlock(block);
      }
    };

    workspace.addChangeListener(handleChange);

    return () => workspace.removeChangeListener(handleChange);
  }, [workspaceRef]);

  return (
    <Box>
      <Stack direction="row-reverse" sx={{ paddingY: 1 }}>
        <Box
          sx={{
            height: "100%",
            zIndex: 1,
          }}
        >
          <Stack direction="row" gap={1}>
            <Tooltip title="Download Code as R file">
              <IconButton
                id="downloadCodeButton"
                sx={{
                  backgroundColor: theme.palette.primary.light,
                  "&:hover": {
                    bgcolor: isDarkMode ? "#835ACC" : "#CCAD33",
                  },
                }}
              >
                <Download />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
      </Stack>
      <Box
        sx={{
          position: "relative",
          borderRadius: "5px",
          height: WINDOW_SIZE,
          bgcolor: theme.palette.background.paper,
          zIndex: 1,
        }}
      >
        <Typography
          sx={{
            color: isDarkMode ? "#FFFFFA" : "#000000",
            padding: 3,
            fontSize: "0.8rem",
            whiteSpace: "pre-wrap",
            fontFamily: "monospace",
          }}
        >
          <Box>
            <Typography variant="h6">Information about the block</Typography>
            <Divider
              sx={{ backgroundColor: theme.palette.primary.main, height: 2 }}
            />
            {currentBlock ? (
              <>
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                  Block-type: <strong>{currentBlock.type}</strong>
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {blockDescriptions[currentBlock.type] ||
                    "Für diesen Blocktyp ist noch keine Beschreibung vorhanden."}
                </Typography>
              </>
            ) : (
              <Typography variant="subtitle1" sx={{ mt: 1 }}>
                Select a block to display a detailed description.
              </Typography>
            )}
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};

export default BlockExplantions;
