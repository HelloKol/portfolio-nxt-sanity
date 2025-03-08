import React, { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/dist/SplitText";
import { gsap } from "@/lib";

const ScrollHighlightText = () => {
  const headerRef = useRef(null);

  useEffect(() => {
    const split = new SplitText(headerRef.current, { type: "lines" });

    const makeItHappen = () => {
      split.lines.forEach((target) => {
        gsap.to(target, {
          backgroundPositionX: 0,
          ease: "none",
          scrollTrigger: {
            trigger: target,
            markers: true, // Remove this in production
            scrub: 0.5,
            start: "top center",
            end: "bottom center",
          },
        });
      });
    };

    const someDelay = gsap.delayedCall(0.2, newTriggers).pause();
    const resizeListener = () => someDelay.restart(true);

    function newTriggers() {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (headerRef.current) {
        split.split(headerRef.current);
        makeItHappen();
      }
    }

    makeItHappen();

    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
      someDelay.kill();
      split.revert(); // Clean up SplitText when component unmounts
    };
  }, []);

  return (
    <div className="special-text">
      <h1 ref={headerRef} className="text-center text-4xl font-bold">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis
        obcaecati eius unde veritatis, quas modi dolorem eveniet officiis
        tempora laborum autem temporibus cum ullam! Numquam id aspernatur odit
        nemo cumque doloremque velit facilis quia iusto eius illo tenetur
        deserunt ab fugiat dicta similique, amet reiciendis porro eaque? Numquam
        officia repudiandae ipsa aperiam! Quisquam voluptatum ea reiciendis eius
        perferendis error, cumque quo iste est ex quasi id necessitatibus alias
        maiores itaque fugit illum deserunt! Ipsam laboriosam, quos impedit
        obcaecati dolorum odio deserunt? Aliquam assumenda molestiae accusamus
        neque saepe at exercitationem, vitae alias fugiat voluptas aut quia
        accusantium aliquid! Iusto, perspiciatis nihil!
      </h1>
    </div>
  );
};

export default ScrollHighlightText;
