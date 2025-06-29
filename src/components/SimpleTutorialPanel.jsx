import React, { useState, useRef, useEffect } from "react";
import { Card, Box, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ReactMarkdown from 'react-markdown';

const tutorialSteps = {
  de: [
    {
      title: "Einführung",
      content: `In diesem Tutorial lernst du, wie du die CO₂-Daten vom Vulkan Mauna Loa auf Hawaii analysieren und visualisieren kannst. Dort wird seit 1958 kontinuierlich die CO₂-Konzentration in der Atmosphäre gemessen. Diese Daten sind besonders wichtig, weil sie den langfristigen Anstieg von Treibhausgasen zeigen und damit zentrale Hinweise auf den Klimawandel geben. 

Mit Hilfe von Blockly-Blöcken wirst du lernen, wie man die Daten lädt, untersucht und visualisiert.`
    },
    {
      title: "1. CSV-Datei laden",
      content: `Öffne in der linken Toolbox die Kategorie **Load Data** und ziehe den Block **load CSV file** in den Editor.\nGib den Dateinamen **co2.csv** an.`
    },
    {
      title: "2. Vorschau anzeigen",
      content: `Nutze den Block **summary of** aus der **Data Inspection** Kategorie und ziehe den geladenen Datensatz in die Lücke, um dir die Strukur der Daten anzusehen.`
    },
    {
      title: "3. Durchschnitt berechnen",
      content: `Ziehe den Block **calculate_mean** aus der **Statistics** Kategorie in den Editor und berechne den Mittelwert der Spalte mit den CO₂-Werten.`
    },
    {
      title: "4. Visualisieren",
      content: `Zeichne ein Liniendiagramm mit **plot**. X-Achse: Monat, Y-Achse: CO₂.\n\nWas fällt dir auf? Gibt es bestimmte Jahre oder Monate mit besonders hohen Werten? Wie hat sich der Durchschnitt über die Zeit verändert?` 
    }
  ],
  en: [
    {
      title: "Introduction",
      content: `In this tutorial, you'll learn how to analyze and visualize CO₂ data collected at Mauna Loa volcano in Hawaii. Since 1958, atmospheric CO₂ levels have been measured continuously there. These measurements are especially important because they show the long-term rise in greenhouse gases and provide key evidence for climate change.

Using Blockly blocks, you'll explore how to load, inspect, and visualize the dataset.`
    },
    {
      title: "1. Load CSV File",
      content: `Open the **Load Data** category in the toolbox on the left and drag the **load CSV file** block into the editor.\nEnter the filename **co2.csv**.`
    },
    {
      title: "2. Show Preview",
      content: `Use the **summary of** block from the **Data Inspection** category and drop your dataset into it to get a structural overview.`
    },
    {
      title: "3. Calculate Mean",
      content: `Drag the **calculate_mean** block from the **Statistics** category into the editor and calculate the mean of the CO₂ column.`
    },
    {
      title: "4. Visualize",
      content: `Create a line chart using the **plot** block. X-axis: month, Y-axis: CO₂.\n\nWhat do you notice? Are there specific years or months with particularly high values? How has the average changed over time?`
    }
  ]
};

const useDraggable = () => {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let offsetX = 0;
    let offsetY = 0;
    let isDown = false;

    const onMouseDown = (e) => {
      isDown = true;
      offsetX = e.clientX - node.getBoundingClientRect().left;
      offsetY = e.clientY - node.getBoundingClientRect().top;
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e) => {
      if (!isDown) return;
      node.style.left = `${e.clientX - offsetX}px`;
      node.style.top = `${e.clientY - offsetY}px`;
    };

    const onMouseUp = () => {
      isDown = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    node.querySelector(".tutorial-header")?.addEventListener("mousedown", onMouseDown);
    return () => node.querySelector(".tutorial-header")?.removeEventListener("mousedown", onMouseDown);
  }, []);

  return ref;
};

const SimpleTutorialPanel = ({ onClose }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [lang, setLang] = useState("de");
  const steps = tutorialSteps[lang];
  const step = steps[stepIndex];
  const dragRef = useDraggable();

  return (
    <Card
      ref={dragRef}
      sx={{
        p: 2,
        m: 2,
        backgroundColor: "#fff",
        borderRadius: 4,
        boxShadow: 3,
        maxWidth: 400,
        position: "fixed",
        top: 100,
        right: 20,
        zIndex: 1000,
        cursor: "grab"
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1} className="tutorial-header">
        <Typography variant="h6">{step.title}</Typography>
        <Box>
          <Button size="small" onClick={() => setLang(lang === "de" ? "en" : "de")}>{lang === "de" ? "EN" : "DE"}</Button>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ mb: 2 }}>
        <ReactMarkdown children={step.content} />
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Button
          variant="outlined"
          onClick={() => setStepIndex(i => Math.max(0, i - 1))}
          disabled={stepIndex === 0}
        >
          {lang === "de" ? "Zurück" : "Back"}
        </Button>

        {stepIndex === steps.length - 1 ? (
          <Button
            variant="contained"
            color="success"
            onClick={onClose}
          >
            {lang === "de" ? "Fertig" : "Finish"}
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => setStepIndex(i => Math.min(steps.length - 1, i + 1))}
          >
            {lang === "de" ? "Weiter" : "Next"}
          </Button>
        )}
      </Box>
    </Card>
  );
};

export default SimpleTutorialPanel;
