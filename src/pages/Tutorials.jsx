import { Box, Tab, Tabs, Typography, useTheme } from "@mui/material";
import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import TabPanel from "../components/TabPanel";
import TutorialIntroduction from "./tutorials/TutorialIntroduction";
import TutorialWhy from "./tutorials/TutorialWhy";
import TutorialWho from "./tutorials/TutorialWho";
import TutorialHow from "./tutorials/TutorialHow";
import TutorialExample from "./tutorials/TutorialExample";

const tutorialRoutes = [
  { path: "introduction", label: "Introduction" },
  { path: "why", label: "Why use SPOCKLY?" },
  { path: "who", label: "Who is it for?" },
  { path: "how", label: "How to use SPOCKLY?" },
  { path: "example", label: "Example Use Case" },
];

const Tutorials = () => {
  const [value, setValue] = React.useState(0);
  const location = useLocation();
  const theme = useTheme();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Typography
        variant="h2"
        textAlign="center"
        fontWeight="bold"
        sx={{ color: theme.palette.primary.contrastText }}
      >
        Tutorials
      </Typography>
      <Box sx={{ display: "flex", paddingLeft: 20 }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider", minWidth: 200 }}
        >
          <Tab label="Introduction"></Tab>
          <Tab label="Why use SPOCKLY?"></Tab>
          <Tab label="Who is it for?"></Tab>
          <Tab label="How to use SPOCKLY?"></Tab>
          <Tab label="Example Use Case"></Tab>
        </Tabs>
        <Box
          sx={{
            color: theme.palette.primary.contrastText,
            flexGrow: 1,
            paddingLeft: 2,
          }}
        >
          <TabPanel value={value} index={0}>
            {" "}
            <TutorialIntroduction />
          </TabPanel>
          <TabPanel value={value} index={1}>
            {" "}
            <TutorialWhy />
          </TabPanel>
          <TabPanel value={value} index={2}>
            {" "}
            <TutorialWho />
          </TabPanel>
          <TabPanel value={value} index={3}>
            {" "}
            <TutorialHow />
          </TabPanel>
          <TabPanel value={value} index={4}>
            {" "}
            <TutorialExample />
          </TabPanel>
        </Box>
      </Box>
    </div>
  );
};

export default Tutorials;
