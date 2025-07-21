import { useState, useRef, useEffect } from "react";
import { Card, Box, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ReactMarkdown from 'react-markdown';

const tutorialSteps = {
  de: [
    {
      title: "Einführung",
      content: `In diesem Tutorial lernen Sie, wie Sie grundlegende Daten zur Iris analysieren und visualisieren können.

Mit Blockly-Blöcken lernen Sie, wie Sie die Daten laden, untersuchen und visualisieren können.`
    },
    {
      title: "1. CSV-Datei laden",
      content: `Öffnen Sie die Kategorie **Download Data** in der Toolbox auf der linken Seite und ziehen Sie den Block **Download sample data** mit der ausgewählten Datei iris.csv hinein.
Gehen Sie dann zur Kategorie **Variables**, erstellen Sie eine neue Variable mit dem Namen **iris** und verwenden Sie den Block **set Variable to**. Fügen Sie den Block **read file** ein.
In den CSV-Block geben Sie den Dateinamen **iris.csv** ein.`
    },
    {
      title: "2. Vorschau anzeigen",
      content: `Verwenden Sie den Block **print** aus der Kategorie **Basic Functions** und fügen Sie die Variable **iris** ein, um die Struktur des Datensatzes zu untersuchen.`
    },
    {
      title: "3. Durchschnitt berechnen",
      content: `Konvertieren Sie zunächst mit dem Block **convert column** , schreiben Sie **petal.length** in den Spaltennamen, wählen Sie den Namen Ihres Datenrahmens und wählen Sie den Typ **Float**.\n`+
 `Ziehen Sie den Block **Mean_of** aus der Kategorie **Statistics** in den Block **print**. Wenden Sie ihn mit Hilfe des Blocks **Access element** aus der Kategorie **Basic Functions** auf die Spalte **petal.length** an.\n`+
 `Fügen Sie den String-Block hinzu und schreiben Sie den Spaltennamen in **petal.length**.`
    },
    {
      title: "4. Visualisieren",
      content: `Verwenden Sie den Block **plot** aus der Kategorie **Visualization**, um ein Liniendiagramm zu zeichnen. X-Achse und Y-Achse: Nehmen Sie eine Spalte wie im vorherigen Schritt.

Sie können auch alle Parameter wie Farbe, Punktgröße... ändern. Was fällt Ihnen auf?`
    },
    {
      title: "5. Code generieren",
      content: `Klicke auf den Button **Generate Code**, um den zugehörigen Python-Code zu erzeugen. Überprüfe, ob alle Blöcke korrekt verbunden sind.`
    },
    {
      title: "6. Output anzeigen",
      content: `Wechsle zum Reiter **Output** und führe den generierten Code mit dem **Play-Button** aus. Sieh dir die Ausgabe an und vergleiche sie mit deinen Erwartungen.`
    }
  ],
  en: [
    {
      title: "Introduction",
      content: `In this tutorial, you will learn how to analyze and visualize basic datas on iris.

With Blockly blocks, you will learn how to load, examine, and visualize the data.`
    },
    {
      title: "1. Load CSV File",
      content: `Open the **Download Data** category in the toolbox on the left and drag the **Download sample data** block with iris.csv selected into it.
Then go to the **Variables** category, create a new variable named **iris**, and use the **set VARIABLE to** block. Place the **read file** block into it.
In the CSV block, enter the filename **iris.csv**.`
    },
    {
      title: "2. Show Preview",
      content: `Use the **print** block from the **Basic Functions** category and insert the **iris** variable to inspect the structure of the dataset.`
    },
    {
      title: "3. Calculate Mean",
      content: `Firstly, convert with the **convert column** block, write **petal.length** in column name, select your dataframe name and select the type **Float**.\n`+
      `Drag the **Mean_of** block from the **Statistics** category into the **print** block. Apply it to the column **petal.length** with the help of **access element** bloc from the **Basic Functions** category.\n`+
      `Add into it the string block and write the column name so **petal.length**.`
    },
    {
      title: "4. Visualize",
      content: `Use the **plot** block from the **Visualization** category to draw a line chart. X-axis and Y-axis: take a column as in the previous step.

You can change also all parameters as color, points size... What do you notice?`
    },
    {
      title: "5. Generate Code",
      content: `Click the **Generate Code** button to produce the corresponding Python code. Make sure all blocks are properly connected.`
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
