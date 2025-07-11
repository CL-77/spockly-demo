import React, { useState, useRef, useEffect } from "react";
import { Card, Box, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ReactMarkdown from 'react-markdown';
import { Link as MuiLink } from '@mui/material';

const tutorialSteps = {
  de: [
    {
      title: "So funktioniert SPOCKLY",
      content: `**Willkommen bei SPOCKLY!**

Mit SPOCKLY kannst du Daten analysieren und visualisieren – ganz ohne Programmieren. Du verbindest einfach bunte Blöcke – wie Puzzleteile – um deine Analyse zu bauen.

---

**Was du hier machen kannst:**
- Daten laden und anschauen
- Selbst Datensätze erstellen
- Statistiken berechnen
- Diagramme oder Karten anzeigen
- R-Code anzeigen und ausführen

---

**So ist SPOCKLY aufgebaut:**
- Links oben: Daten hochladen oder erstellen
- Links: **Toolbox** mit allen verfügbaren Blöcken
- Mitte: **Block-Editor** – hier baust du dein Programm
- Rechts oben: Tabs für **Code** und **Output**

---

**So benutzt du die Blöcke:**
- Blöcke aus der Toolbox in den Editor ziehen
- Blöcke *ineinander* stecken, wenn sie zusammengehören (z. B. eine Spalte in eine Funktion)
- Blöcke *untereinander* legen, wenn sie nacheinander ausgeführt werden sollen
- Block herausziehen, um ihn zu lösen
- Block in den Papierkorb unten rechts ziehen, um ihn zu löschen

---

ℹ️ SPOCKLY basiert auf [**Blockly**](https://developers.google.com/blockly), einer Baustein-Technik von Google.`
    },
    {
      title: "Einführung",
      content: `In diesem Tutorial lernst du, wie du CO₂-Daten vom Vulkan Mauna Loa 🌋 analysierst und visualisierst.

📅 Die Messungen reichen **bis ins Jahr 1958** zurück – aber wir arbeiten hier **nur mit den Daten ab dem Jahr 2000**.

Diese Daten zeigen:
- wie viel CO₂ in der Atmosphäre war (in ppm = „parts per million“),
- wie sich der Wert über die Jahre verändert hat,
- und ob es regelmäßige Schwankungen gibt.

Mit Hilfe von Spockly-Blöcken wirst du lernen:

✅ wie man die Daten lädt,  
✅ wie man sie anschaut und versteht,  
✅ und wie man sie grafisch darstellt.`
    },
    {
      title: "1. Daten ansehen",
      content: `Gehe links auf **Check Uploads** und sieh dir die Vorschau des CO₂-Datensatzes an.

📄 Die Datei heißt **co2.csv**. Das ist eine sogenannte **CSV-Datei** – das steht für *Comma-Separated Values* (kommagetrennte Werte).

Eine CSV-Datei ist wie eine **Tabelle**:
- Jede **Zeile** ist ein Datensatz (z. B. ein Monat).
- Jede **Spalte** enthält eine bestimmte Information (z. B. Jahr, CO₂-Wert).

🔍 **Fragen zur Reflexion**:
- Welche Spalten siehst du?
- Was bedeuten die Spaltennamen?
- Welche Informationen kannst du direkt erkennen?`
    },
    {
      title: "2. CSV-Datei laden",
      content: `📥 In diesem Schritt lädst du die CO₂-Daten in SPOCKLY und speicherst sie in einer sogenannten **Variable**.

---

🔹 **Was ist eine Variable?**

Eine Variable ist ein **Behälter mit einem Namen**, in dem du Daten speicherst. So musst du die Daten nicht immer neu laden, sondern kannst sie einfach über den Namen abrufen.
In unserem Fall nennen wir die Variable **co2**.

---

🛠 **So geht’s – Schritt für Schritt:**

1. 👉 Öffne links die Kategorie **Load Data**  
   und ziehe den Block **load CSV file** in die große, türkisfarbene Editor-Fläche.

2. 👉 Öffne jetzt die Kategorie **Variables**  
   und klicke ganz oben auf **Create variable...**

3. ✏️ Gib als Namen der Variable ein: \`co2\`

4. ⚠️ Jetzt schließt sich das Fenster.  
   Öffne die Kategorie **Variables** **noch einmal** – dort findest du nun neue Blöcke.

5. 👉 Ziehe den Block mit der Aufschrift:  
   **set co2 to …** in den Editor.  
   ➕ Das ist ein lila Block mit einem kleinen Dropdown.

6. 👉 Jetzt nimm den Block **load CSV file** und  
   setze ihn **in das rechte Feld** von „set co2 to …“

7. ✍️ Im **load CSV file**-Block steht ein Feld für den Dateinamen.  
   Schreibe dort hinein: \`co2.csv\`

---

✅ Damit hast du die CO₂-Daten aus der Datei in deine Variable **co2** geladen.

📦 Ab jetzt kannst du mit dieser Variable weiterarbeiten, um dir die Daten anzusehen oder zu analysieren.`
    },
    {
      title: "3. Vorschau anzeigen",
      content: `📊 Jetzt schauen wir uns die Struktur der Daten an – also welche Spalten es gibt und welche Werte darin vorkommen.

---

🛠 **So geht’s – Schritt für Schritt:**

1. 👉 Öffne links die Kategorie **Data Inspection**  
   und ziehe den Block **summary of** in den Editor.

2. 👉 Ziehe deine Variable **co2** aus der Kategorie **Variables**  und setze sie in das Feld rechts im **summary of**-Block.

3. Hänge den summary-of Block unten an den set co2 to … Block.

4. 
- Wechsle vom Help-Tab zum **Code-Tab** oben rechts.
- 🟢 Klicke auf den grünen Knopf **Generate R Code** im **Code-Tab** rechts.
- Wechsle vom Code-Tab zum **Output-Tab** rechts daneben.
- 🔵 Dann auf den blauen Knopf **Run R Code** im Output-Tab, um das Ergebnis zu sehen.

---

📄 **Das kommt dabei heraus (gekürzt):**

\`\`\`
      year          month         decimal.date     average      deseasonalized 
 Min.   :2000   Min.   : 1.000   Min.   :2000   Min.   :369.6   Min.   :370.8  
 1st Qu.:2005   1st Qu.: 4.000   1st Qu.:2005   1st Qu.:378.4   1st Qu.:378.6  
 Median :2012   Median : 7.000   Median :2012   Median :391.7   Median :391.5  
 Mean   :2012   Mean   : 6.491   Mean   :2012   Mean   :392.4   Mean   :392.4  
 3rd Qu.:2019   3rd Qu.:10.000   3rd Qu.:2019   3rd Qu.:406.3   3rd Qu.:406.1  
 Max.   :2025   Max.   :12.000   Max.   :2025   Max.   :430.5   Max.   :427.2  
\`\`\`

---

🔍 **Was bedeutet das?**

- Jede **Spalte** enthält Infos zu einem Merkmal (z. B. Monat, CO₂-Wert, Unsicherheit).
- Jede Zeile im Ergebnis zeigt eine statistische Kennzahl:
  - **Min.** = kleinster Wert
  - **1st Qu.** = unteres Viertel der Daten
  - **Median** = mittlerer Wert
  - **Mean** = Durchschnitt
  - **3rd Qu.** = oberes Viertel der Daten
  - **Max.** = größter Wert

---

🔍 **Fragen zur Reflexion**:
- Welche Spalten enthalten Zahlen, die sich besonders stark unterscheiden?
- Was sagt dir der Unterschied zwischen Minimum und Maximum über die Entwicklung des CO₂-Gehalts?
- Gibt es Spalten, deren Bedeutung du dir erst erschließen musst?
`
    },
    {
      title: "4. Visualisieren",
      content: `📈 Jetzt erstellen wir eine **Visualisierung** der CO₂-Daten.

---

🎯 Ziel: Ein Liniendiagramm, das zeigt, wie sich der CO₂-Wert über die Zeit verändert.

---

🛠 **Schritt-für-Schritt-Anleitung:**

1. 👉 Öffne links die Kategorie **Data Inspection**  
   und ziehe den Block **select column** in den Editor.

2. ✏️ Stelle ihn so ein:
   - **Spalte:** \`decimal.date\`  
   - **aus Tabelle:** \`co2\`

3. 🟣 Öffne die Kategorie **Variables**  
   und erstelle eine neue Variable namens \`decimal_date\`.  
   Setze dann den **select column**-Block in das Feld des **set decimal_date to**-Blocks.

   ✅ Jetzt sind die Zeitangaben in einer eigenen Variable gespeichert.

---

4. 👉 Wiederhole das Ganze für die Spalte \`average\`:
   - Ziehe einen weiteren **select column**-Block in den Editor.
   - Wähle Spalte: \`average\`, Tabelle: \`co2\`
   - Erstelle eine neue Variable namens \`co2_avg\`
   - Setze den **select column**-Block in den **set co2_avg to**-Block

---

5. 📊 Öffne die Kategorie **Visualization**  
   und ziehe den Block in den Editor, mit dem man x- und y-Daten festlegt.

6. 🖱 Stelle den Block so ein:
   - Diagrammtyp: **Line Chart**
   - **x data**: \`decimal_date\`  (Zeitachse)
   - **y data**: \`co2_avg\`       (CO₂-Werte)
   - Wähle eine schöne Farbe für die Linie :)

---
🧩 Verbinde die Blöcke miteinander 

🟢 Klicke auf **Generate R Code**  
🔵 Dann auf **Run R Code**

---

🔍 **Fragen zur Reflexion**:
- Steigt der CO₂-Wert insgesamt an?
- Ist der Anstieg eher langsam oder schnell?
- Wie gleichmäßig ist der Verlauf?
- Wie stark schwankt der CO₂-Wert im Laufe eines Jahres?
- Gibt es jedes Jahr ein ähnliches Muster?
- Was könnte den regelmäßigen Anstieg und Abfall verursachen?`
    },
    {
      title: "5. Plot exportieren",
      content: `Wenn du den erstellten Plot abspeichern möchtest, kannst du den Block **export plot to file** aus der Kategorie **Export** verwenden.

Du kannst auswählen, ob du ihn als **Bild** (.png) oder **.pdf** abspeichern möchtest.

🟢 Klicke auf **Generate R Code**  
🔵 Dann auf **Run R Code**, um dein Diagramm zu sehen!

📌 So kannst du deine Ergebnisse teilen oder dokumentieren.`
    },
  ],
  en: [
    {
      title: "How SPOCKLY works",
      content: `**Welcome to SPOCKLY!**

With SPOCKLY you can analyze and visualize data – no programming required. Just connect colorful blocks – like puzzle pieces – to build your analysis.

---

**What you can do here:**
- Load and view data
- Create your own datasets
- Calculate statistics
- Show diagrams or maps
- View and run R code

---

**How SPOCKLY is structured:**
- Top left: upload or create data
- Left: **Toolbox** with all available blocks
- Center: **Block editor** – here you build your program
- Top right: tabs for **Code** and **Output**

---

**How to use the blocks:**
- Drag blocks from the toolbox into the editor
- Nest blocks *inside each other* when they belong together (e.g. a column inside a function)
- Stack blocks *on top of each other* to run them in sequence
- Pull a block out to detach it
- Drag a block into the trash at the bottom right to delete it

---

ℹ️ SPOCKLY is based on [**Blockly**](https://developers.google.com/blockly), a block-based technique from Google.`
    },
    {
      title: "Introduction",
      content: `In this tutorial, you'll learn how to analyze and visualize CO₂ data from the volcano Mauna Loa 🌋.

📅 The measurements go **all the way back to 1958** – but here we'll only use **the data from the year 2000 onwards**.

This data shows:
- how much CO₂ was in the atmosphere (in ppm = “parts per million”),
- how the value changed over the years,
- and whether there are regular fluctuations.

With the help of Spockly blocks, you will learn:

✅ how to load the data,  
✅ how to view and understand it,  
✅ and how to visualize it.`
    },
    {
      title: "1. View the data",
      content: `Go to **Check Uploads** on the left and look at the preview of the CO₂ dataset.

📄 The file is called **co2.csv**. This is a **CSV file** – which stands for *Comma-Separated Values*.

A CSV file is like a **table**:
- Each **row** is a data entry (e.g. a month).
- Each **column** contains a specific piece of information (e.g. year, CO₂ value).

🔍 **Reflection questions:**
- Which columns do you see?
- What do the column names mean?
- What information can you already recognize?`
    },
    {
      title: "2. Load CSV file",
      content: `📥 In this step, you'll load the CO₂ data into SPOCKLY and store it in a **variable**.

---

🔹 **What is a variable?**

A variable is a **container with a name** in which you store data. This way, you don't have to load the data again and again – you can simply refer to it by its name.  
In our case, we'll call the variable **co2**.

---

🛠 **How to do it – step by step:**

1. 👉 Open the **Load Data** category on the left  
   and drag the **load CSV file** block into the large turquoise editor area.

2. 👉 Now open the **Variables** category  
   and click at the top on **Create variable...**

3. ✏️ Enter the name: \`co2\`

4. ⚠️ The window closes.  
   Open the **Variables** category **again** – now you'll find new blocks there.

5. 👉 Drag the block:  
   **set co2 to ...** into the editor.  
   ➕ This is a purple block with a small dropdown.

6. 👉 Now take the **load CSV file** block and  
   place it **in the right field** of “set co2 to ...”

7. ✍️ In the **load CSV file** block, there's a field for the filename.  
   Enter: \`co2.csv\`

---

✅ You have now loaded the CO₂ data from the file into your variable **co2**.

📦 From now on, you can use this variable to view or analyze the data.`
    },
    {
      title: "3. Show preview",
      content: `📊 Now let's look at the structure of the data – what columns there are and what values they contain.

---

🛠 **How to do it – step by step:**

1. 👉 Open the **Data Inspection** category on the left  
   and drag the **summary of** block into the editor.

2. 👉 Drag your variable **co2** from the **Variables** category and place it into the field on the right in the **summary of** block.

3. Attach the summary-of block below the set co2 to ... block.

4. 
- Switch from the Help tab to the **Code** tab at the top right.
- 🟢 Click the green button **Generate R Code** in the **Code** tab on the right.
- Switch from the Code tab to the **Output** tab next to it.
- 🔵 Then click the blue button **Run R Code** in the Output tab to see the result.

---

📄 **Here's what you'll see (shortened):**

\`\`\`
      year          month         decimal.date     average      deseasonalized 
 Min.   :2000   Min.   : 1.000   Min.   :2000   Min.   :369.6   Min.   :370.8  
 1st Qu.:2005   1st Qu.: 4.000   1st Qu.:2005   1st Qu.:378.4   1st Qu.:378.6  
 Median :2012   Median : 7.000   Median :2012   Median :391.7   Median :391.5  
 Mean   :2012   Mean   : 6.491   Mean   :2012   Mean   :392.4   Mean   :392.4  
 3rd Qu.:2019   3rd Qu.:10.000   3rd Qu.:2019   3rd Qu.:406.3   3rd Qu.:406.1  
 Max.   :2025   Max.   :12.000   Max.   :2025   Max.   :430.5   Max.   :427.2  
\`\`\`

---

🔍 **What does this mean?**

- Each **column** contains information about a feature (e.g. month, CO₂ value, uncertainty).
- Each row in the result shows a statistical value:
  - **Min.** = smallest value
  - **1st Qu.** = lower quarter of the data
  - **Median** = middle value
  - **Mean** = average
  - **3rd Qu.** = upper quarter of the data
  - **Max.** = largest value

---

🔍 **Reflection questions:**
- Which columns contain numbers that differ the most?
- What does the difference between minimum and maximum tell you about the development of CO₂?
- Are there columns whose meaning you need to figure out first?
`
    },
    {
      title: "4. Visualize",
      content: `📈 Now let's create a **visualization** of the CO₂ data.

---

🎯 Goal: A line chart showing how the CO₂ value changes over time.

---

🛠 **Step-by-step instructions:**

1. 👉 Open the **Data Inspection** category on the left  
   and drag the **select column** block into the editor.

2. ✏️ Set it like this:
   - **column:** \`decimal.date\`  
   - **from table:** \`co2\`

3. 🟣 Open the **Variables** category  
   and create a new variable called \`decimal_date\`.  
   Then place the **select column** block into the field of the **set decimal_date to** block.

   ✅ Now the time values are stored in their own variable.

---

4. 👉 Repeat the same for the column \`average\`:
   - Drag another **select column** block into the editor.
   - Select column: \`average\`, table: \`co2\`
   - Create a new variable called \`co2_avg\`
   - Place the **select column** block into the **set co2_avg to** block

---

5. 📊 Open the **Visualization** category  
   and drag the block for setting x and y data into the editor.

6. 🖱 Set up the block like this:
   - Chart type: **Line Chart**
   - **x data**: \`decimal_date\`  (time axis)
   - **y data**: \`co2_avg\`       (CO₂ values)
   - Choose a nice color for the line :)

---
🧩 Connect the blocks together 

🟢 Click **Generate R Code**  
🔵 Then click **Run R Code**

---

🔍 **Reflection questions:**
- Is the CO₂ value increasing overall?
- Is the increase rather slow or fast?
- How even is the trend?
- How much does CO₂ fluctuate throughout a year?
- Is there a similar pattern every year?
- What could cause the regular rise and fall?`
    },
    {
      title: "5. Export plot",
      content: `If you want to save the plot you created, you can use the **export plot to file** block from the **Export** category.

You can choose to save it as an **image** (.png) or **.pdf**.

🟢 Click **Generate R Code**  
🔵 Then click **Run R Code** to see your diagram!

📌 This way you can share or document your results.`
    },
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        setStepIndex(i => Math.min(steps.length - 1, i + 1));
      } else if (e.key === "ArrowLeft") {
        setStepIndex(i => Math.max(0, i - 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [steps.length]);

  return (
    <Card
      ref={dragRef}
      sx={{
        p: 2,
        m: 2,
        backgroundColor: "#fff",
        borderRadius: 4,
        boxShadow: 3,
        width: 700,
        maxHeight: '80vh',
        position: "fixed",
        top: 180,
        right: 800,
        zIndex: 1000,
        cursor: "grab",
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1} className="tutorial-header">
        <Box display="flex" alignItems="center">
          <Typography variant="h6">{step.title}</Typography>
        </Box>
        <Box>
          <Button size="small" onClick={() => setLang(lang === "de" ? "en" : "de")}>{lang === "de" ? "EN" : "DE"}</Button>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
        <ReactMarkdown
          components={{
            a: ({ node, ...props }) => (
              <MuiLink {...props} target="_blank" rel="noopener noreferrer" />
            )
          }}
        >
          {step.content}
        </ReactMarkdown>
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
