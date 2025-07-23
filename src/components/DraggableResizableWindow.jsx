import { Clear } from "@mui/icons-material";
import {
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";

const DraggableResizableWindow = ({
  open,
  onClose,
  title,
  children,
  language,
  changeLanguage,
}) => {
  const theme = useTheme();
  const nodeRef = useRef(null);
  const [size, setSize] = useState({ width: "80vh", height: "90vh" });
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const handleResize = (e) => {
    setSize({
      width: e.target.offsetWidth,
      height: e.target.offsetHeight,
    });
  };

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const numericWidth =
      typeof size.width === "string" && size.width.endsWith("vh")
        ? (parseFloat(size.width) / 100) * screenHeight
        : size.width;
    const numericHeight =
      typeof size.height === "string" && size.height.endsWith("vh")
        ? (parseFloat(size.height) / 100) * screenHeight
        : size.height;

    setPosition({
      left: (screenWidth - numericWidth) / 2,
      top: (screenHeight - numericHeight) / 2,
    });
  }, []);

  if (!open) return null;

  return (
    <Draggable nodeRef={nodeRef} handle=".handle" cancel={".content"} sx={{}}>
      <div
        ref={nodeRef}
        style={{
          position: "fixed",
          top: position.top,
          left: position.left,
          maxHeight: "80vh",
          maxWidth: "90vh",
          background: theme.palette.background.paper,
          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
          resize: "both",
          overflow: "auto",
          zIndex: 1300,
          borderRadius: 10,
          display: "flex",
          flexDirection: "column",
        }}
        onResize={handleResize}
      >
        <div
          className="handle"
          style={{
            cursor: "move",
            padding: "8px 12px",
            background: theme.palette.primary.main,
            color: "white",
            userSelect: "none",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        >
          <Typography variant="h5" sx={{ p: 1 }}>
            {title}
          </Typography>
          <Button
            onClick={onClose}
            style={{
              color: "white",
              fontSize: 16,
              cursor: "pointer",
            }}
            aria-label="Close"
          >
            <Clear />
          </Button>
        </div>
        <div
          className="content"
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
            paddingLeft: "2vh",
            paddingRight: "2vh",
            paddingTop: "1vh",
            paddingBottom: "1vh",
          }}
        >
          {children}
        </div>
      </div>
    </Draggable>
  );
};

export default DraggableResizableWindow;
