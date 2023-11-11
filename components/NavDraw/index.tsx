import { useContext, useEffect } from "react";
import Link from "next/link";
import { Context } from "@/contexts/Context";
import styles from "./styles.module.scss";

type props = { test?: string };

export default function NavDraw({ test }: props) {
  const { isNavOpen, setIsNavOpen } = useContext(Context);
  const NAVIGATION = [
    { Name: "The Projects", href: "/projects" },
    { Name: "About Myself", href: "/about" },
    { Name: "Get In Touch", href: "/contact" },
  ];

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
    return NAVIGATION.map((link, index) => (
      <Link
        key={index}
        href={`${link.href}`}
        className={`${styles.navItem}`}
        onClick={() => setIsNavOpen(false)}
      >
        <span>{link.Name}</span>
      </Link>
    ));
  };

  return (
    <>
      <div className={`${styles.overlay} ${isNavOpen ? styles.open : ""}`} />
      <div className={`${styles.navDraw} ${isNavOpen ? styles.open : ""}`}>
        <ul className={styles.navList}>
          {renderNavigation()}
          <div className={`${styles.navItem} ${styles.placeholder}`} />
        </ul>
        <div
          className={`${styles.disclaimer}  ${isNavOpen ? styles.open : ""}`}
        >
          Designed and developed by me
        </div>
      </div>
    </>
  );
}
