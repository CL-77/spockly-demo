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
            <Box
              onDragOver={(e) => e.preventDefault()}
              onDrop={async (e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (!file) return;
              
                const allowedExtensions = ['csv', 'geojson', 'tif'];
                const extension = file.name.toLowerCase().split('.').pop();
              
                if (!allowedExtensions.includes(extension)) {
                  setFileName(file.name);
                  setUploadStatus('invalidtype');
                  return;
                }
              
                await handleFileUpload({ target: { files: [file] } });
              }}                           
              sx={{
                border: '2px dashed #aaa',
                borderRadius: 2,
                p: 2,
                mb: 2,
                textAlign: 'center',
                backgroundColor: isDarkMode ? '#3a3a3a' : '#fafafa',
                color: isDarkMode ? '#ccc' : '#666',
                cursor: 'pointer'
              }}
            >
              <Typography variant="body2">
                Drag & drop your CSV, GeoJSON or TIF file here or{" "}
                <label htmlFor="file-upload" style={{ color: '#1976d2', cursor: 'pointer', textDecoration: 'underline' }}>
                  choose a data file
                </label>.
              </Typography>
              <input
                accept=".csv, .geojson, .tif"
                style={{ display: 'none' }}
                id="file-upload"
                type="file"
                onChange={handleFileUpload}
              />
            </Box>
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
          <Box sx={{ bgcolor: '#e8f5e9', p: 3, borderRadius: 2, mb: 2 }}>
            <Box display="flex" alignItems="center" gap={1} sx={{ mb: 2 }}>
              <CheckCircle color="success" />
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                File uploaded successfully
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} sx={{ mb: 1 }}>
              {getFileIcon()}
              <Typography variant="body2">
                {fileName}
              </Typography>
              {getFileTypeChip()}
            </Box>

            <Box mt={3}>
              <Box display="flex" alignItems="center" gap={1} sx={{ mb: 1 }}>
                <InsertDriveFile color="primary" />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Next: Use the file in your analysis
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Use the block <strong>{(() => {
                  const match = getUsageInstructions().match(/load_\w+/);
                  return match ? match[0] : "load_block";
                })()}</strong> from the <strong>Load Data</strong> category. 
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Then paste the filename below into the block:
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
            </Box>
          </Box>
        )}

        {uploadStatus === 'invalidtype' && (
          <Alert severity="warning" icon={<Error />}>
            <AlertTitle>Unsupported File Format</AlertTitle>
            <Typography variant="body2">
              The file <strong>{fileName}</strong> is not supported.<br />
              Please upload a CSV, GeoJSON or TIF file.
            </Typography>
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