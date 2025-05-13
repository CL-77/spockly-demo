import React from "react";
import { Typography } from "@mui/material";

export default function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index} style={{ flex: 1, padding: "16px" }}>
      {value === index && <Typography>{children}</Typography>}
    </div>
  );
}
