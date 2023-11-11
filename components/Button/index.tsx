import Link from "next/link";
import { useTheme } from "@/providers";
import styles from "./styles.module.scss";

export default function Button({
  children,
  className,
  variant = "primary",
  withSvg,
  type = "button",
  href,
  newTab,
  onClick,
  download,
  ...rest
}: {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  variant?: "primary" | "secondary" | "text" | "svg";
  withSvg?: boolean;
  type?: "button" | "submit" | "reset";
  href?: string;
  newTab?: boolean;
  download?: boolean;
  onClick?: () => void;
  rest?: any;
}) {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark-theme";
  const isLink = href;

  return isLink ? (
    <Link
      href={href}
      target={newTab ? "_blank" : ""}
      className={`${className} ${styles.button} ${
        isDarkMode ? styles.darkMode : styles.lightMode
      } ${styles[variant]}`}
      {...rest}
      download={download}
    >
      <span className={styles.text}>{children}</span>
      {withSvg && (
        <svg
          viewBox="0 0 46 16"
          height="10"
          width="30"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            transform="translate(30)"
            d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
            data-name="Path 10"
            id="Path_10"
          ></path>
        </svg>
      )}
    </Link>
  ) : (
    <button
      className={`${className} ${styles.button} ${
        isDarkMode ? styles.darkMode : styles.lightMode
      } ${styles[variant]}`}
      type={type}
      onClick={onClick}
      {...rest}
    >
      <p>{children}</p>
      {withSvg && (
        <svg
          viewBox="0 0 46 16"
          height="10"
          width="30"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            transform="translate(30)"
            d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
            data-name="Path 10"
            id="Path_10"
          ></path>
        </svg>
      )}
    </button>
  );
}
