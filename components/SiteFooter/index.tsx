import Link from "next/link";
import { useRouter } from "next/router";
import { Container } from "@/components";
import { useTheme } from "@/providers";
import styles from "./styles.module.scss";

type props = {
  test?: string;
};

export default function SiteFooter({ test }: props) {
  const router = useRouter();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark-theme";
  const hideFooterPath = ["/about"];
  const isFooterHidden = hideFooterPath.includes(router.pathname);
  if (isFooterHidden) return null;

  return (
    <footer
      className={`${styles.footer} ${
        isDarkMode ? styles.darkMode : styles.lightMode
      }`}
    >
      <Container className={styles.footerContainer} isFluid={false}>
        <div className={styles.footerDisclaimer}>
          <p>© 2023 - All Rights Reserved</p>
        </div>

        <div className={styles.credit}>
          <p>Designed and Developed by Shehab</p>
        </div>

        <div className={styles.socialContainer}>
          <Link href="https://www.behance.net/shehabemon" target={"_blank"}>
            <p>behance</p>
          </Link>
          <Link href="https://www.linkedin.com/in/shehabemon" target={"_blank"}>
            <p>linkedin</p>
          </Link>
          <Link href="https://github.com/HelloKol" target={"_blank"}>
            <p>Github</p>
          </Link>
          <Link href="mailto: shehabhasan2020@gmail.com" target={"_blank"}>
            <p>Email</p>
          </Link>
        </div>
      </Container>
    </footer>
  );
}
