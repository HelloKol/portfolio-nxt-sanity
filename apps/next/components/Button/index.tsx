import Link from "next/link";
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
  disabled,
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
  disabled?: boolean;
  onClick?: () => void;
  rest?: any;
}) {
  const isLink = href;

  return isLink ? (
    <Link
      href={href}
      target={newTab ? "_blank" : ""}
      className={`${className} ${styles.button} ${styles[variant]}`}
      {...rest}
      download={download}
    >
      <span className={styles.text}>{children}</span>
      {withSvg && <div className={styles.dot}></div>}
    </Link>
  ) : (
    <button
      className={`${className} ${styles.button} ${styles[variant]}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      <p>{children}</p>
      {withSvg && <div className={styles.dot}></div>}
    </button>
  );
}
