import React from "react";

const Impressum = () => {
  return (
    <div style={ styles.container }>
      <h1 style={ styles.title }>Impressum</h1>
      <p style={ styles.placeholder }>
        This legal notice will be added soon.
      </p>
      <p style={ styles.placeholder }>
        The R logo used in the homepage is distributed under the <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">Creative Commons Attribution-ShareAlike 4.0 International License</a> (CC-BY-SA 4.0). For further information, please refer to <a href="https://www.r-project.org/logo/" target="_blank" rel="noopener noreferrer">R Project Logo</a>.
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "2rem",
    fontFamily: "system-ui, sans-serif"
  },
  title: {
    fontSize: "2rem",
    color: "var(--color-primary)",
    marginBottom: "1rem"
  },
  placeholder: {
    fontSize: "1rem",
    color: "var(--color-text-muted)"
  }
};

export default Impressum;
