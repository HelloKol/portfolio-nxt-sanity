export default function Section({
  children,
  className = "",
  withMargin = true,
  ref,
}: {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  withMargin?: boolean;
  ref?: React.RefObject<HTMLSelectElement>;
}) {
  return (
    <section
      ref={ref}
      className={`${className} ${withMargin ? "mb-[100px] xl:mb-[150px]" : ""}`}
    >
      {children}
    </section>
  );
}
