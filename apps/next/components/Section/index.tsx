import React, { forwardRef } from "react";

const Section = forwardRef<
  HTMLElement,
  {
    children: React.ReactNode | React.ReactNode[];
    className?: string;
    withMargin?: boolean;
    id?: string;
  }
>(({ children, className = "", withMargin = true, id }, ref) => {
  return (
    <section
      ref={ref}
      className={`${className} ${withMargin ? "mb-[120px] md:mb-[160px] xl:mb-[240px]" : ""}`}
      id={id}
    >
      {children}
    </section>
  );
});

Section.displayName = "Section";

export default Section;
