import React, { useState } from "react";
import { Box, Button, Link, Paper, Stack, useTheme } from "@mui/material";
import Draggable from "react-draggable";
import ReactMarkdown from "react-markdown";
import co2Tutorial from "../data/co2Tutorial";
import DraggableResizableWindow from "./DraggableResizableWindow";

function PaperComponent(props) {
  const nodeRef = React.useRef(null);
  return (
    <Draggable
      nodeRef={nodeRef}
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} ref={nodeRef} />
    </Draggable>
  );
}

const CO2Tutorial = ({ open, onClose, step, nextStep, prevStep }) => {
  const theme = useTheme();
  const [language, setLanguage] = useState("en");
  const [tutorialData, setTutorialData] = useState(co2Tutorial);

  const handleChangeLanguage = (_event, newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <>
      <DraggableResizableWindow
        open={open}
        onClose={onClose}
        title={tutorialData[language][step].title}
      >
        <Box sx={{ px: 1 }}>
          <ReactMarkdown
            components={{
              a: ({ node, ...props }) => (
                <Link {...props} target="_blank" rel="noopener noreferrer" />
              ),
            }}
          >
            {tutorialData[language][step].content}
          </ReactMarkdown>
          <Stack
            direction="row-reverse"
            sx={{
              py:"1vh",
              justifyContent: "space-between",
            }}
          >
            {step < tutorialData[language].length - 1 ? (
              <Button
                onClick={nextStep}
                sx={{
                  borderRadius: 2,
                  background: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                }}
              >
                Weiter
              </Button>
            ) : (
              <Button
                onClick={onClose}
                sx={{
                  borderRadius: 2,
                  background: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                }}
              >
                Schließen
              </Button>
            )}
            {step > 0 && (
              <Button
                onClick={prevStep}
                sx={{
                  borderRadius: 2,
                  background: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                }}
              >
                Zurück
              </Button>
            )}
          </Stack>
        </Box>
      </DraggableResizableWindow>
    </>
  );
};

export default CO2Tutorial;
