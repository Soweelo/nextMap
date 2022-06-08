import styles from "../styles/Navbar.module.css";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.texts}>
          <div className={styles.text}>HUB TRANSITION TEST</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
