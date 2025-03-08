import React, { forwardRef } from "react";

const Section = forwardRef<
  HTMLElement,
  {
    children: React.ReactNode | React.ReactNode[];
    className?: string;
    withMargin?: boolean;
  }
>(({ children, className = "", withMargin = true }, ref) => {
  return (
    <section
      ref={ref}
      className={`${className} ${withMargin ? "mb-[100px] xl:mb-[150px]" : ""}`}
    >
      {children}
    </section>
  );
});

Section.displayName = "Section";

export default Section;
