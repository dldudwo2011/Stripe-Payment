import React from "react";

import styles from './styles.module.scss'

function PageTitle({children, tagline, title, ...props}) {
  return (
      <header className={styles.pageTitle}>
        <h1>{title}</h1>
        <p>{tagline}</p>
      </header>
  );
}

export default PageTitle;
