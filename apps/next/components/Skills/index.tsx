import React from "react";
import Image from "next/image";
import Container from "../Container";

const cards = [
  {
    id: 1,
    image: "/image/sanity.png",
    title: "Sanity CMS",
    description: "Headless CMS for structured content management.",
  },
  {
    id: 2,
    image: "/image/nextjs.png",
    title: "Next.js",
    description: "React framework for server-side rendering and static sites.",
  },
  {
    id: 3,
    image: "/image/typescript.png",
    title: "TypeScript",
    description: "Typed superset of JavaScript for safer code.",
  },
  {
    id: 4,
    image: "/image/tailwindcss.png",
    title: "Tailwind CSS",
    description: "Utility-first CSS framework for rapid UI styling.",
  },
  {
    id: 5,
    image: "/image/react.png",
    title: "React.js",
    description: "Library for building interactive user interfaces.",
  },
];

const CardList = () => {
  return (
    <section className="skills h-[400px]">
      <Container>
        <h1 className="text-md text-center font-bold text-black">
          Frameworks and Tools I Use
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className="relative h-60 overflow-hidden rounded-lg bg-[#18181A] p-4"
            >
              {/* <SpotlightCard
                className="custom-spotlight-card p-4"
                spotlightColor="rgba(33, 11, 157, 0.57)"
              > */}
              {/* Image */}
              <Image
                src={card.image}
                alt={card.title}
                width={56}
                height={56}
                className="rounded-full object-cover"
              />

              {/* Title */}
              <div className="mt-14">
                <h3 className="text-3xl font-semibold text-white">
                  {card.title}
                </h3>
              </div>

              {/* Description (Initially Hidden) */}
              <div className="">
                <p className="text-white">{card.description}</p>
              </div>

              {/* Gradient Blobs - Bottom Left */}
              <div className="absolute -bottom-34 -left-8 h-34 w-44 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 blur-2xl"></div>

              {/* Gradient Blobs - Bottom Right */}
              <div className="absolute -right-10 -bottom-34 h-44 w-34 rounded-full bg-gradient-to-bl from-blue-400 via-blue-400 to-blue-400 blur-2xl"></div>

              {/* </SpotlightCard> */}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CardList;
