import React from "react";
import styles from "./VerticallyCenter.module.css";

export const VerticallyCenter: React.FC = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.verticalCenter}>{children}</div>
    </div>
  );
};
