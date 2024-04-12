import { Container } from "@/components";
import { useTheme } from "@/providers";
import styles from "./styles.module.scss";

type props = { test?: string };

export default function Circles({ test }: props) {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark-theme";

  return (
    <div
      className={`${styles.circles} ${
        isDarkMode ? styles.darkMode : styles.lightMode
      }`}
    >
      <Container>
        <div className={styles.circlesWrap}>
          <span className={styles.circle1} />
        </div>
      </Container>
    </div>
  );
}
