import { useContext } from "react";
import Link from "next/link";
import { Container, NavDraw } from "@/components";
import { Context } from "@/contexts/Context";
import { useTheme } from "@/providers";
import styles from "./styles.module.scss";

type props = { test?: string };

export default function SiteHeader({ test }: props) {
  const { isNavOpen, setIsNavOpen } = useContext(Context);
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark-theme";

  return (
    <header
      className={`${styles.header} ${isNavOpen ? styles.open : ""} ${
        isDarkMode ? styles.darkMode : styles.lightMode
      }`}
    >
      <nav className={styles.nav}>
        <Container isFluid={false}>
          <ul className={styles.navList}>
            <li className={styles.navItem} onClick={toggleTheme}>
              <button>{isDarkMode ? "light." : "dark."}</button>
            </li>
            <li className={styles.navItem}>
              <Link href={`/`}>est. 2023</Link>
            </li>
            <li className={styles.navItem}>
              <button
                className={styles.burgerMenu}
                type={"button"}
                onClick={() => setIsNavOpen(!isNavOpen)}
              >
                <div className={styles.menuIcon}>
                  <input
                    className={styles.menuIconCheckbox}
                    checked={isNavOpen}
                    type="checkbox"
                    onChange={() => null}
                  />
                  <div>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </button>
            </li>
          </ul>
        </Container>
        <NavDraw />
      </nav>
    </header>
  );
}
