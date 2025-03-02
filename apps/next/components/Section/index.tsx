import styles from "./styles.module.scss";

export default function Section({
  children,
  className = "",
  id,
  elementRef,
}: {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  elementRef?: string;
  id?: string;
}) {
  return (
    <section
      ref={elementRef}
      id={id}
      className={`${className} ${styles.section}`}
    >
      {children}
    </section>
  );
}
