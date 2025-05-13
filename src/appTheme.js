// src/theme.js
import { blue, lightBlue } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: lightBlue[700],
      contrastText: "#000000",
      light: "#fff",
    },
    secondary: {
      main: lightBlue[900],
      contrastText: "#fff",
    },
    background: {
      default: "#f5f5f5",
      paper: "#EEEAEA",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#15134C",
      contrastText: "#fff",
      dark: "#15134C",
      light: "#fff",
    },
    secondary: {
      dark:lightBlue[900],
      main: lightBlue[800],
      contrastText: "#fff",
    },
    background: {
      default: "#202A7C",
      paper: "#262626",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: lightBlue[700],
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          "&.Mui-selected": {
            color: lightBlue[700], 
            fontWeight: "bold", 
          },
        },
      },
    },
  },
});
