// This component displays a dialog showing a list of uploaded files.
// The list is fetched from the WebR virtual file system when the dialog opens.
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const CheckUploadedDataDialog = ({ open, onClose }) => {
  const [files, setFiles] = useState([]);

  // Fetch the list of files from WebR's file system when the dialog is opened
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const result = await webR.evalR(`list.files("/home/web_user")`);
        const jsResult = await result.toJs();
        const fileList = jsResult?.values || [];
        setFiles(fileList);
      } catch (error) {
        console.error("Error when retrieving the files:", error);
      }
    };

    if (open) {
      fetchFiles();
    }
  }, [open]);

  // Render the dialog with a title, close button, and list of uploaded files
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          borderRadius: "12px",
          padding: "16px",
          minWidth: "280px",
        },
        elevation: 4,
      }}
    >
      {/* Close icon in the top-right corner of the dialog */}
      <IconButton
        onClick={onClose}
        style={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "#888",
        }}
        size="small"
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.2rem" }}>
        Uploaded Files
      </DialogTitle>
      <DialogContent>
        <List>
          {files.map((file, index) => (
            // Display each file name as a centered list item
            <ListItem
              key={index}
              style={{
                justifyContent: "center",
                fontSize: "1.1rem",
                paddingTop: 4,
                paddingBottom: 4,
              }}
            >
              <ListItemText
                primary={file}
                primaryTypographyProps={{ style: { textAlign: "center" } }}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default CheckUploadedDataDialog;