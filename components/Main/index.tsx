import styles from "./styles.module.scss";

export default function Main({
  children,
  withPadding = true,
}: {
  children: React.ReactNode | React.ReactNode[];
  withPadding?: boolean;
}) {
  return (
    <main
      className={`${styles.main} ${
        withPadding ? styles.withPadding : styles.withoutPadding
      }`}
    >
      {children}
    </main>
  );
}
