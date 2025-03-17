import React, { useRef } from "react";
import { Container, Section } from "@/components";
import { SplitText } from "gsap/dist/SplitText";
import { useGSAP, gsap } from "@/lib";
import styles from "./styles.module.scss";
import Image from "next/image";

interface Props {
  data: {
    title: string;
    body: Array<string>;
  };
}

const HeroSection = ({ data }: Props): JSX.Element | null => {
  const titleRef = useRef<(HTMLSpanElement | null)[]>([]);
  const paragraphRef1 = useRef<(HTMLDivElement | null)[]>([]);
  const paragraphRef2 = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline();

      titleRef.current.forEach((wordRef, index) => {
        if (wordRef) {
          const splitText = new SplitText(wordRef, { type: "lines" });

          timeline.fromTo(
            splitText.lines,
            { yPercent: 100, visibility: "visible" },
            { yPercent: 0, stagger: 0.2, duration: 2, ease: "power4.out" },
            index === 0 ? 0 : `-=${1.8}`,
          );
        }
      });

      // Animate paragraphRef1
      timeline.fromTo(
        paragraphRef1.current,
        { yPercent: 100, visibility: "visible" },
        { yPercent: 0, duration: 1, stagger: 0.15, ease: "power4.out" },
        "-=2",
      );

      // Animate paragraphRef2 (optional - remove if you only animate the first set)
      timeline.fromTo(
        paragraphRef2.current,
        { yPercent: 100, visibility: "visible" },
        { yPercent: 0, duration: 1, stagger: 0.15, ease: "power4.out" },
        "-=2",
      );

      // Scroll animation for second word
      if (titleRef.current[1]) {
        gsap.to(titleRef.current[1], {
          x: -100,
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "+=500",
            scrub: 1,
          },
        });
      }
    });

    return () => ctx.revert();
  });

  if (!data) return null;
  const { title, body } = data;
  const words = title.split(" ");

  return (
    <Section id="hero" className={"h-dvh overflow-hidden"} withMargin={false}>
      <Image
        src="/image/background-2.png"
        alt="hero-bg"
        width={3000}
        height={3000}
        className="absolute inset-0 h-[125vh] w-full object-cover lg:h-[115vh]"
        style={{
          maskImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 1) 85%, rgba(0, 0, 0, 0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 1) 85%, rgba(0, 0, 0, 0) 100%)",
        }}
      />

      <Container className="relative h-full">
        <div className="w-full pt-30 sm:absolute sm:top-[25%] sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-[35%] sm:px-6 md:px-8">
          <div
            className={`${styles.title} font-heading-regular invisible text-white uppercase`}
          >
            <div className="relative">
              <span
                ref={(el) => (titleRef.current[0] = el)}
                className={`block overflow-hidden text-center`}
              >
                {words[0]}
              </span>
              <div className="invisible hidden font-bold sm:absolute sm:top-[120%] sm:left-16 sm:block md:left-20 lg:left-30">
                {body.map((line, index) => (
                  <div className="overflow-hidden" key={index}>
                    <div
                      className={`font-body text-white ${styles.heroParagraph} ${index === 0 ? "sm:pl-10 md:pl-14 lg:pl-20" : ""}`}
                      ref={(el) => (paragraphRef1.current[index] = el)}
                    >
                      {line}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <span
              className={`block overflow-hidden text-right`}
              ref={(el) => (titleRef.current[1] = el)}
            >
              {words[1]}
            </span>
            <span
              className={`block overflow-hidden text-center`}
              ref={(el) => (titleRef.current[2] = el)}
            >
              {words[2]}
            </span>
          </div>

          <div className="invisible mt-14 font-bold sm:hidden">
            {body.map((line, index) => (
              <div className="overflow-hidden" key={index}>
                <div
                  className={`font-body text-white ${styles.heroParagraph} ${index === 0 ? "sm:pl-10 md:pl-14 lg:pl-20" : ""}`}
                  ref={(el) => (paragraphRef2.current[index] = el)}
                >
                  {line}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default HeroSection;
