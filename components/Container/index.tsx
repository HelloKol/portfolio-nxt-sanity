import styles from "./styles.module.scss";

export default function Container({
  children,
  className = "",
  isFluid = true,
}: {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  isFluid?: boolean;
}) {
  return (
    <div
      className={`${className} ${styles.container} ${
        isFluid ? styles.fluid : styles.notFluid
      }`}
    >
      {children}
    </div>
  );
}
