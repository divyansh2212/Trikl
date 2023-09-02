import React from "react";
import styles from "../App.module.css";
const Colors = ({ activeColor, setActiveColor }) => {
  const colors = ["#FF0000", "#239ce2", "#48bb78", "#A52A2A", "#ed8936"];

  return (
    <div className={styles.colors} id="colortoolbar">
      {colors.map((item) => (
        <span
          key={item}
          style={{ backgroundColor: item, cursor: "pointer" }}
          className={`${styles.color} ${
            activeColor === item ? styles.active : ""
          }`}
          onClick={() => setActiveColor(item)}
        />
      ))}
    </div>
  );
};

export default Colors;
