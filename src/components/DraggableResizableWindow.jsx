import { Clear, ClearAll } from "@mui/icons-material";
import { Button, Typography, useTheme } from "@mui/material";
import { useState, useRef } from "react";
import Draggable from "react-draggable";

const DraggableResizableWindow = ({ open, onClose, title, children }) => {
  const theme = useTheme();
  const nodeRef = useRef(null);
  const [size, setSize] = useState({ width: "80vh", height: "90vh" });

  if (!open) return null;

  const handleResize = (e) => {
    setSize({
      width: e.target.offsetWidth,
      height: e.target.offsetHeight,
    });
  };

  return (
    <Draggable nodeRef={nodeRef} handle=".handle" cancel={".content"} sx={{}}>
      <div
        ref={nodeRef}
        style={{
          position: "fixed",
          top: 100,
          left: 100,
          width: size.width,
          height: size.height,
          background: theme.palette.background.paper,
          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
          resize: "both",
          overflow: "auto",
          zIndex: 1300,
          borderRadius: 8,
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
              background: "transparent",
              border: "none",
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
            paddingLeft: "2vh",
            paddingRight: "2vh",
            paddingTop: "1vh",
            paddingBottom: "1vh",
            overflow: "auto",
          }}
        >
          {children}
        </div>
      </div>
    </Draggable>
  );
};

export default DraggableResizableWindow;
