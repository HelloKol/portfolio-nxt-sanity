import styles from "./styles.module.scss";

export default function Section({
  children,
  className = "",
}: {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}) {
  return (
    <section className={`${className} ${styles.section}`}>{children}</section>
  );
}
