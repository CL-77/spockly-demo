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
import { writeFile } from './workerApi.mjs';

globalThis.files = [];
globalThis.fileColumns = [];

const FileUploadManager = ({ workspaceRef, isDarkMode, open, onClose }) => {
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

    const extension = file.name.toLowerCase().split('.').pop();
    setFileType(extension);
    const targetPath = file.name;
    try {
      if (extension === "csv") {
        const fileData = await file.text();
        await writeFile(targetPath, fileData);
        globalThis.fileColumns.push('---');
        globalThis.fileColumns.push(...fileData.split('\n')[0].split(','));
      } else if(extension === "json" || extension === "geojson") {
        const fileData = await file.text();
        await writeFile(targetPath, fileData);
      } else if (extension === "tif") {
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        await writeFile(targetPath, uint8Array);
      } else {
        setUploadStatus('invalidtype');
        return;
      }

      setFilePath(targetPath);
      setUploadStatus('success');
      globalThis.files.push(file.name);
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
    return fileType === 'geojson' || fileType === 'json' ? <Map /> : <InsertDriveFile />;
  };

  const getFileTypeChip = () => {
    if (fileType === 'csv') {
      return <Chip label="CSV" size="small" color="primary" />;
    } else if (fileType === 'geojson' || fileType === 'json') {
      return <Chip label="GeoJSON" size="small" color="secondary" />;
    }
	else if (fileType === 'tif' || fileType === 'tiff'){
	  return <Chip label="Raster" size="small" color="secondary" />;
	}
    return null;
  };

  const getUsageInstructions = () => {
    if (fileType === 'csv') {
      return "Use this filename in your load_csv block:";
    } else if (fileType === 'geojson' || fileType === 'json') {
      return "Use this filename in your load_json block:";
    }
	else if (fileType === 'tif' || fileType === 'tiff') {
	  return "Use this filename in your load_raster block:";
	}
    return "Use this filename in your blocks:";
  };

  return (
    <Dialog 
      open={ open } 
      onClose={ handleClose }
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
        { !uploadStatus && !isUploading && (
          <Box>
            <Typography variant="body1" sx={{ mb: 2, color: isDarkMode ? '#ffffff' : '#000000' }}>
              Select a CSV, TIF or GeoJSON file to upload to Pyodide:
            </Typography>
            <Box
              onDragOver={(e) => e.preventDefault()}
              onDrop={async (e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (!file) return;
              
                const allowedExtensions = ['csv', 'geojson', 'tif', 'json', 'tiff'];
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
                Drag & drop your CSV, GeoJSON or TIF file here or{ " " }
                <label htmlFor="file-upload" style={{ color: '#1976d2', cursor: 'pointer', textDecoration: 'underline' }}>
                  choose a data file
                </label>.
              </Typography>
              <input
                accept=".csv, .geojson, .tif, .json, .tiff"
                style={{ display: 'none' }}
                id="file-upload"
                type="file"
                onChange={ handleFileUpload }
              />
            </Box>
          </Box>
        ) }

         { isUploading && (
          <Box display="flex" alignItems="center" gap={ 2 }>
            <CircularProgress size={ 24 } />
            <Typography sx={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
              Uploading { fileName }...
            </Typography>
          </Box>
        ) }

        { uploadStatus === 'success' && (
          <Alert 
            severity="success" 
            icon={ <CheckCircle /> }
            sx={{ mb: 2 }}
          >
            <AlertTitle>Upload Successful!</AlertTitle>
            <Box display="flex" alignItems="center" gap={ 1 } sx={{ mt: 1, mb: 2 }}>
              { getFileIcon() }
              <Typography variant="body2">
                File uploaded successfully to Pyodide filesystem.
              </Typography>
              { getFileTypeChip() }
            </Box>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
              { getUsageInstructions() }
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
                { fileName }
              </Typography>
              <Button 
                size="small" 
                onClick={ copyToClipboard }
                sx={{ ml: 1 }}
              >
                Copy
              </Button>
            </Box>
          </Alert>
        ) }

        { uploadStatus === 'invalidtype' && (
          <Alert severity="warning" icon={ <Error /> }>
            <AlertTitle>Unsupported File Format</AlertTitle>
            <Typography variant="body2">
              The file <strong>{ fileName }</strong> is not supported.<br />
              Please upload a CSV, GeoJSON or TIF file.
            </Typography>
          </Alert>
) }
        { uploadStatus === 'error' && (
          <Alert 
            severity="error" 
            icon={ <Error /> }
          >
            <AlertTitle>Upload Failed!</AlertTitle>
            <Typography variant="body2">
              There was an error uploading the file. Please try again.
            </Typography>
          </Alert>
        ) }
      </DialogContent>

       <DialogActions>
         <Button 
          onClick={ handleClose }
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