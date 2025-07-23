import React, { useState } from "react";
import {
  Box,
  Button,
  Link,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from "@mui/material";
import Draggable from "react-draggable";
import ReactMarkdown from "react-markdown";
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

const CO2Tutorial = ({
  open,
  onClose,
  step,
  nextStep,
  prevStep,
  tutorialData,
}) => {
  const theme = useTheme();
  const [language, setLanguage] = useState("en");

  const handleChangeLanguage = (_event, newLanguage) => {
    if (newLanguage !== null) {
      setLanguage(newLanguage);
    }
  };

  return (
    <>
      <DraggableResizableWindow
        open={open}
        onClose={onClose}
        title={tutorialData[language][step].title}
      >
        <Box sx={{ px: 1 }}>
          <Stack
            direction="row-reverse"
            sx={{
              paddingTop: "1vh",
              justifyContent: "space-between",
            }}
          >
            <ToggleButtonGroup
              value={language}
              exclusive
              onChange={handleChangeLanguage}
            >
              <ToggleButton value="de">DE</ToggleButton>
              <ToggleButton value="en">EN</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
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
              py: "2vh",
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
                {language === "de" ? "Weiter" : "Next"}
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
                {language === "de" ? "Schließen" : "Close"}
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
                {language === "de" ? "Zurück" : "Back"}
              </Button>
            )}
          </Stack>
        </Box>
      </DraggableResizableWindow>
    </>
  );
};

export default CO2Tutorial;
