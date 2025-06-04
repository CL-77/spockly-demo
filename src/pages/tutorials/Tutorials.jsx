import {
  Box,
  Tab,
  Tabs,
  Typography,
  useTheme,
  Button
} from "@mui/material";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useLocation } from "react-router-dom";
import TabPanel from "../../components/TabPanel";
import tutorialData from "../../data/tutorialData.json";

const Tutorials = ({ isDarkMode }) => {
  const [value, setValue] = useState(0);
  const [isGerman, setIsGerman] = useState(false);
  const location = useLocation();
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "calc(100vh - 64px)", position: "relative" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 250,
          borderRight: 1,
          borderColor: "divider",
          paddingTop: 4,
          paddingLeft: 2,
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            marginBottom: 2,
            paddingLeft: 1,
            color: isDarkMode ? "#FFFFFF" : "#000000",
          }}
        >
          Tutorials
        </Typography>
        <Button
          variant="outlined"
          sx={{
            mb: 2,
            mr: 1,
            color: isDarkMode ? "#B58FFF" : theme.palette.primary.main,
            borderColor: isDarkMode ? "#B58FFF" : theme.palette.primary.main,
            "&:hover": {
              borderColor: isDarkMode ? "#D0A8FF" : theme.palette.primary.dark,
              backgroundColor: isDarkMode ? "rgba(181, 143, 255, 0.08)" : "rgba(0, 0, 0, 0.04)",
            },
          }}
          onClick={() => setIsGerman((prev) => !prev)}
        >
          {isGerman ? "Switch to English" : "Zur deutschen Version"}
        </Button>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
              backgroundColor: isDarkMode
                ? "#B58FFF"
                : theme.palette.primary.main,
              width: "3px",
            },
          }}
          sx={{
            ".MuiTab-root": {
              alignItems: "flex-start",
              textAlign: "left",
              fontSize: "1rem",
              fontWeight: 500,
              opacity: 1,
              textTransform: "none",
              color: isDarkMode ? "#DDD" : "#333",
              paddingY: 1,
              justifyContent: "flex-start",
              minHeight: "auto",
            },
            ".Mui-selected": {
              fontWeight: 600,
              color: theme.palette.primary.main,
            },
          }}
        >
          {tutorialData.map((tut, index) => (
            <Tab key={index} label={isGerman ? tut.headline_de : tut.headline} />
          ))}
        </Tabs>
      </Box>

      {/* Content */}
      <Box
        sx={{
          color: isDarkMode ? "#FFFFFA" : "#000000",
          flexGrow: 1,
          padding: 4,
        }}
      >
        {tutorialData.map((tut, index) => (
          <TabPanel key={index} value={value} index={index}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {isGerman ? tut.headline_de : tut.headline}
            </Typography>
            <ReactMarkdown>{isGerman ? tut.description_de : tut.description}</ReactMarkdown>
          </TabPanel>
        ))}
      </Box>
    </Box>
  );
};

export default Tutorials;
