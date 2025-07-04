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
      content: `Öffne in der linken Toolbox die Kategorie **Load Data** und ziehe den Block **load CSV file** in den Editor.
Gehe anschließend zur Kategorie **Variables**, erstelle eine neue Variable mit dem Namen **co2** und verwende den Block **set VARIABLE to**. Setze den CSV-Block in diesen hinein.
Gib im CSV-Block den Dateinamen **co2.csv** an.`
    },
    {
      title: "2. Vorschau anzeigen",
      content: `Nutze den Block **summary of** aus der **Data Inspection** Kategorie und ziehe die Variable **co2** hinein, um dir die Struktur der Daten anzusehen.`
    },
    {
      title: "3. Durchschnitt berechnen",
      content: `Ziehe den Block **calculate_mean** aus der **Statistics** Kategorie in den Editor und verwende ihn mit der CO₂-Spalte aus **co2**, z. B. **co2$average**.`
    },
    {
      title: "4. Visualisieren",
      content: `Zeichne ein Liniendiagramm mit dem Block **plot** aus der **Visualization** Kategorie. X-Achse: **decimal_date**, Y-Achse: **average**.

Was fällt dir auf? Gibt es bestimmte Jahre oder Monate mit besonders hohen Werten? Wie hat sich der Durchschnitt über die Zeit verändert?`
    },
    {
      title: "5. Code generieren",
      content: `Klicke auf den Button **Generate Code**, um den zugehörigen R-Code zu erzeugen. Überprüfe, ob alle Blöcke korrekt verbunden sind.`
    },
    {
      title: "6. Output anzeigen",
      content: `Wechsle zum Reiter **Output** und führe den generierten Code mit dem **Play-Button** aus. Sieh dir die Ausgabe an und vergleiche sie mit deinen Erwartungen.`
    }
  ],
  en: [
    {
      title: "Introduction",
      content: `In this tutorial, you will learn how to analyze and visualize CO₂ data from the Mauna Loa volcano in Hawaii. Since 1958, atmospheric CO₂ concentrations have been continuously recorded there. These data are especially important as they reveal the long-term increase in greenhouse gases, providing key evidence for climate change.

With Blockly blocks, you will learn how to load, examine, and visualize the data.`
    },
    {
      title: "1. Load CSV File",
      content: `Open the **Load Data** category in the toolbox on the left and drag the **load CSV file** block into the editor.
Then go to the **Variables** category, create a new variable named **co2**, and use the **set VARIABLE to** block. Place the CSV block into it.
In the CSV block, enter the filename **co2.csv**.`
    },
    {
      title: "2. Show Preview",
      content: `Use the **summary of** block from the **Data Inspection** category and insert the **co2** variable to inspect the structure of the dataset.`
    },
    {
      title: "3. Calculate Mean",
      content: `Drag the **calculate_mean** block from the **Statistics** category into the editor and apply it to the CO₂ column from **co2**, e.g., **co2$average**.`
    },
    {
      title: "4. Visualize",
      content: `Use the **plot** block from the **Visualization** category to draw a line chart. X-axis: **decimal_date**, Y-axis: **average**.

What do you notice? Are there specific years or months with particularly high values? How has the average changed over time?`
    },
    {
      title: "5. Generate Code",
      content: `Click the **Generate Code** button to produce the corresponding R code. Make sure all blocks are properly connected.`
    },
    {
      title: "6. Show Output",
      content: `Switch to the **Output** tab and run the generated code using the **Play button**. Observe the results and compare them to your expectations.`
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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={ 1 } className="tutorial-header">
        <Typography variant="h6">{ step.title }</Typography>
        <Box>
          <Button size="small" onClick={ () => setLang(lang === "de" ? "en" : "de") }>{ lang === "de" ? "EN" : "DE" }</Button>
          <IconButton onClick={ onClose } size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ mb: 2 }}>
        <ReactMarkdown children={ step.content } />
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Button
          variant="outlined"
          onClick={ () => setStepIndex(i => Math.max(0, i - 1)) }
          disabled={ stepIndex === 0 }
        >
          { lang === "de" ? "Zurück" : "Back" }
        </Button>

        { stepIndex === steps.length - 1 ? (
          <Button
            variant="contained"
            color="success"
            onClick={ onClose }
          >
            { lang === "de" ? "Fertig" : "Finish" }
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={ () => setStepIndex(i => Math.min(steps.length - 1, i + 1)) }
          >
            { lang === "de" ? "Weiter" : "Next" }
          </Button>
        ) }
      </Box>
    </Card>
  );
};

export default SimpleTutorialPanel;
