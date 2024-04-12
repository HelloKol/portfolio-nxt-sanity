import styles from "./styles.module.scss";

export default function Container({
  children,
  className = "",
  gridColumns = 12,
  rowGap = false,
}: {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  gridColumns?: number;
  rowGap?: boolean;
}) {
  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
      }}
      className={`${className} ${styles.grid} ${
        rowGap ? styles.withRowGap : ``
      }`}
    >
      {children}
    </div>
  );
}
