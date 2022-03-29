import React from "react";

import Styles from "./styles.module.css";

function PageTitle({ children, ...props }) {
  return (
      <header>
        <h1>StoreFront</h1>
        <p>tagline</p>
      </header>
  );
}

export default PageTitle;
