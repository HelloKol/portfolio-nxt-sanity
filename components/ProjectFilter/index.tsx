import { useContext } from "react";
import { Button } from "@/components";
import { Context } from "@/contexts/Context";
import { useTheme } from "@/providers";
import styles from "./styles.module.scss";

type props = {
  test?: string;
};

export default function ProjectFilter({ test }: props) {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark-theme";
  const { projectFilterTag, setProjectFilterTag } = useContext(Context);

  return (
    <div
      className={`${styles.projectFilter} ${
        isDarkMode ? styles.darkMode : styles.lightMode
      }`}
    >
      <div className={styles.filterListWrap}>
        <ul className={styles.filterList}>
          <li>
            <Button
              className={`${styles.filterBtn} ${
                projectFilterTag === "" && styles.activeFilterBtn
              }`}
              onClick={() => setProjectFilterTag("")}
            >
              All
            </Button>
          </li>
          <li>
            <Button
              className={`${styles.filterBtn} ${
                projectFilterTag === "design" && styles.activeFilterBtn
              }`}
              onClick={() => setProjectFilterTag("design")}
            >
              Design
            </Button>
          </li>
          <li>
            <Button
              className={`${styles.filterBtn} ${
                projectFilterTag === "web" && styles.activeFilterBtn
              }`}
              onClick={() => setProjectFilterTag("web")}
            >
              Web
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}
