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
  CircularProgress,
  Chip
} from '@mui/material';
import { CheckCircle, Error, InsertDriveFile, Map } from '@mui/icons-material';

const FileUploadManager = ({ webRInstance, isDarkMode, open, onClose }) => {
  const [uploadStatus, setUploadStatus] = useState(null);
  const [fileName, setFileName] = useState('');
  const [filePath, setFilePath] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [fileType, setFileType] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setFileName(file.name);
    
    // Determine file type
    const extension = file.name.toLowerCase().split('.').pop();
    setFileType(extension);
    
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
    setFileType('');
    onClose();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fileName);
  };

  const getFileIcon = () => {
    return fileType === 'geojson' ? <Map /> : <InsertDriveFile />;
  };

  const getFileTypeChip = () => {
    if (fileType === 'csv') {
      return <Chip label="CSV" size="small" color="primary" />;
    } else if (fileType === 'geojson') {
      return <Chip label="GeoJSON" size="small" color="secondary" />;
    }
	else if (fileType === 'tif'){
	  return <Chip label="Raster" size="small" color="secondary" />;
	}
    return null;
  };

  const getUsageInstructions = () => {
    if (fileType === 'csv') {
      return "Use this filename in your load_csv block:";
    } else if (fileType === 'geojson') {
      return "Use this filename in your load_geojson block:";
    }
	else if (fileType === 'tif') {
	  return "Use this filename in your load_raster block:";
	}
    return "Use this filename in your blocks:";
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
        Upload Data File
      </DialogTitle>
      
      <DialogContent>
        {!uploadStatus && !isUploading && (
          <Box>
            <Typography variant="body1" sx={{ mb: 2, color: isDarkMode ? '#ffffff' : '#000000' }}>
              Select a CSV, TIF or GeoJSON file to upload to WebR:
            </Typography>
            <input
              accept=".csv, .geojson, .tif"
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
                Choose Data File
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
            <Box display="flex" alignItems="center" gap={1} sx={{ mt: 1, mb: 2 }}>
              {getFileIcon()}
              <Typography variant="body2">
                File uploaded successfully to WebR filesystem.
              </Typography>
              {getFileTypeChip()}
            </Box>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
              {getUsageInstructions()}
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