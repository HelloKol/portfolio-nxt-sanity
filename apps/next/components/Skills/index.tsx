import React from "react";
import Container from "../Container";
import { MarqueeSection } from "../MarqueeSection";

const CardList = () => {
  return (
    <section className="skills">
      <Container>
        <h1 className="text-md text-center font-bold tracking-widest text-black">
          Framework and Tools i use
        </h1>
        <MarqueeSection />
      </Container>
    </section>
  );
};

export default CardList;
