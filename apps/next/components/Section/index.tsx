import styles from './styles.module.scss';

export default function Section({
  children,
  className = '',
  elementRef
}: {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  elementRef?: string;
}) {
  return (
    <section ref={elementRef} className={`${className} ${styles.section}`}>
      {children}
    </section>
  );
}
