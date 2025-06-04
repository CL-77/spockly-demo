import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Alert, 
  AlertTitle, 
  Typography,
  Box,
  CircularProgress
} from '@mui/material';
import { CheckCircle, Error } from '@mui/icons-material';

const FileUploadManager = ({ webRInstance, isDarkMode, open, onClose }) => {
  const [uploadStatus, setUploadStatus] = useState(null);
  const [fileName, setFileName] = useState('');
  const [filePath, setFilePath] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setFileName(file.name);
    
    try {
      // Convert file to ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      
      // Define the path in WebR filesystem
      const targetPath = `/home/web_user/${file.name}`;
      
      // Write file to WebR filesystem
      await webRInstance.FS.writeFile(targetPath, uint8Array);
      
      setFilePath(targetPath);
      setUploadStatus('success');
    } catch (error) {
      console.error('File upload failed:', error);
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setUploadStatus(null);
    setFileName('');
    setFilePath('');
    setIsUploading(false);
    onClose();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fileName);
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          bgcolor: isDarkMode ? '#2d2d2d' : '#ffffff',
        }
      }}
    >
      <DialogTitle sx={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
        Upload CSV File
      </DialogTitle>
      
      <DialogContent>
        {!uploadStatus && !isUploading && (
          <Box>
            <Typography variant="body1" sx={{ mb: 2, color: isDarkMode ? '#ffffff' : '#000000' }}>
              Select a CSV file to upload to WebR:
            </Typography>
            <input
              accept=".csv"
              style={{ display: 'none' }}
              id="file-upload"
              type="file"
              onChange={handleFileUpload}
            />
            <label htmlFor="file-upload">
              <Button
                variant="contained"
                component="span"
                sx={{
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 'bold'
                }}
              >
                Choose CSV File
              </Button>
            </label>
          </Box>
        )}

        {isUploading && (
          <Box display="flex" alignItems="center" gap={2}>
            <CircularProgress size={24} />
            <Typography sx={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
              Uploading {fileName}...
            </Typography>
          </Box>
        )}

        {uploadStatus === 'success' && (
          <Alert 
            severity="success" 
            icon={<CheckCircle />}
            sx={{ mb: 2 }}
          >
            <AlertTitle>Upload Successful!</AlertTitle>
            <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
              File uploaded successfully to WebR filesystem.
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
              Use this filename in your load_csv block:
            </Typography>
            <Box 
              sx={{ 
                bgcolor: '#f5f5f5', 
                p: 1, 
                borderRadius: 1, 
                fontFamily: 'monospace',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography variant="body2" sx={{ color: '#000' }}>
                {fileName}
              </Typography>
              <Button 
                size="small" 
                onClick={copyToClipboard}
                sx={{ ml: 1 }}
              >
                Copy
              </Button>
            </Box>
          </Alert>
        )}

        {uploadStatus === 'error' && (
          <Alert 
            severity="error" 
            icon={<Error />}
          >
            <AlertTitle>Upload Failed!</AlertTitle>
            <Typography variant="body2">
              There was an error uploading the file. Please try again.
            </Typography>
          </Alert>
        )}
      </DialogContent>

      <DialogActions>
        <Button 
          onClick={handleClose}
          sx={{ 
            textTransform: 'none',
            fontWeight: 'bold'
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FileUploadManager;