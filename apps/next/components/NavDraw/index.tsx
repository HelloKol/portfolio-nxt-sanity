import { useContext, useEffect } from "react";
import Link from "next/link";
import { Context } from "@/contexts/Context";
import styles from "./styles.module.scss";

export default function NavDraw() {
  const { isNavOpen, setIsNavOpen, settingsData } = useContext(Context);

  if (!settingsData) return null;
  const { credit, headerNavigation } = settingsData;

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.keyCode === 27) setIsNavOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const renderNavigation = () => {
    return headerNavigation.map(
      (
        item: {
          title: string;
          content: {
            slug: {
              current: string;
            };
          };
        },
        index: number
      ) => {
        const { title, content } = item;

        return (
          <Link
            key={index}
            href={`/${content.slug.current}`}
            className={`${styles.navItem}`}
            onClick={() => setIsNavOpen(false)}
          >
            <span>{title}</span>
          </Link>
        );
      }
    );
  };

  return (
    <>
      <div className={`${styles.overlay} ${isNavOpen ? styles.open : ""}`} />
      <div className={`${styles.navDraw} ${isNavOpen ? styles.open : ""}`}>
        <ul className={styles.navList}>
          {renderNavigation()}
          <div className={`${styles.navItem} ${styles.placeholder}`} />
        </ul>
        {credit && (
          <div
            className={`${styles.disclaimer}  ${isNavOpen ? styles.open : ""}`}
          >
            {credit}
          </div>
        )}
      </div>
    </>
  );
}
