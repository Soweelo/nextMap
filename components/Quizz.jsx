import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";
import styles from "../styles/Quizz.module.css";
import useTrait from "../hooks/useTrait";
import moveIframe from "../functions/moveIframe";
import iframeObserver from "../functions/iframeObserver";
export default function Quizz({ showModal }) {
  const isMounted = useRef(false);
  const iframe = useRef();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    isMounted.current = true;
    if (isMounted.current) {
      moveIframe("#iFrameResizer0", "#testNosgestesClimats");
    }
  }, []);
  useEffect(() => {
    if (iframe.current) {
      setIsLoading(false);
    }
  }, [iframe]);
  // console.log(iframe.current);
  return (
    <div className={styles.container} id="quizzContainer">
      <h2>iframe paramétré</h2>
      <p>Ci-dessous , nosgestesclimat.fr intégré comme un iframe paramétré.</p>
      {isLoading && (
        <div className={styles.loaderWrapper}>
          <span className="loader"></span>
        </div>
      )}
      <div
        id="testNosgestesClimats"
        ref={iframe}
        className={styles.testWrapper}
      ></div>

      <Script
        id="nosgestesclimat"
        src="https://nosgestesclimat.fr/iframe.js"
      ></Script>
    </div>
  );
}
