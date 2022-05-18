import styles from "../styles/Modal.module.css";
import React from "react";
import styled from "styled-components";
import ClearIcon from "@mui/icons-material/Clear";
import { useRef, useEffect, useCallback, useState } from "react";
import { useSpring, animated } from "react-spring";
import Quizz from "./Quizz";
import iframeObserver from "../functions/iframeObserver";

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  z-index: 21;
`;

const ModalWrapper = styled.div`
  width: min(800px, 90vw);
  height: min(700px, 90vh);
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 21;
  border-radius: 10px;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  scrollbar-width: none;
`;
const CloseModalButton = styled(ClearIcon)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
  border-radius: 50%;
  background-color: #eeeeeec9;
`;
export default function Modal({ showModal, setShowModal }) {
  const [isClicked, setIsClicked] = useState(false);
  const modalRef = useRef();
  const animation = useSpring({
    config: {
      duration: 450,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : "translateY(-100%)",
  });
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };
  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
        // console.log(text);
        setIsClicked(false);
      }
    },
    [setShowModal, showModal, setIsClicked]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);
  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    const html = document.getElementsByTagName("html")[0];
    if (showModal) {
      body.style.overflow = "hidden";
      html.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
      html.style.overflow = "auto";
    }
  }, [showModal]);

  return (
    <>
      {showModal && (
        <Background onClick={closeModal} className={styles.background}>
          <animated.div
            style={animation}
            ref={modalRef}
            className="animated-div"
          >
            <ModalWrapper>
              <div id="modalContent" className={styles.modalContent}>
                <Quizz showModal={showModal} />
              </div>
              <CloseModalButton
                aria-label="Close modal"
                onClick={() => setShowModal((prev) => !prev)}
              ></CloseModalButton>
            </ModalWrapper>
          </animated.div>
        </Background>
      )}
    </>
  );
}
