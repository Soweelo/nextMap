import React, { useState } from "react";
import styles from "../styles/Legend.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
export default function Legend({ mapId, setMapId, mapUrl, setMapUrl }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.container} style={{ left: open ? "0px" : "-185px" }}>
      <div className={styles.wrapper}>
        <ul className={styles.list}>
          <li
            className={styles.listitem}
            data-map="landscapeMap"
            onClick={(e) => {
              setMapId(e.target.getAttribute("data-map"));
              setMapUrl(e.target.getAttribute("data-map"));
            }}
          >
            Production
          </li>
          <li
            className={styles.listitem}
            data-map="watercolorMap"
            onClick={(e) => {
              setMapId(e.target.getAttribute("data-map"));
              setMapUrl(e.target.getAttribute("data-map"));
            }}
          >
            Stockage
          </li>
          <li className={styles.listitem}>Transport</li>
          <li className={styles.listitem}>Usage</li>
        </ul>
      </div>
      <div
        className={styles.controlIconContainer}
        onClick={() => setOpen(!open)}
      >
        <div className={styles.controlIconWrapper}>
          <span
            className={
              styles.controlIconItem +
              " " +
              (open ? styles.opened : styles.closed)
            }
          ></span>
          <span
            className={
              styles.controlIconItem +
              " " +
              (open ? styles.opened : styles.closed)
            }
          ></span>
        </div>
      </div>
    </div>
  );
}
