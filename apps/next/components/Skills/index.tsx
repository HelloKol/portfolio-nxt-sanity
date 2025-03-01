import React from "react";
import Image from "next/image";
import SpotlightCard from "../SpotlightCard";

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
    <section className="skills h-[340px]">
      <div className="container mx-auto">
        <h1 className="text-md text-center font-bold text-black">
          Frameworks and Tools I Use
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {cards.map((card) => (
            <div
              key={card.id}
              className="group relative h-48 overflow-hidden rounded-lg bg-gray-900 p-4 transition-all duration-300 hover:h-64"
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
              <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-white">{card.description}</p>
              </div>

              {/* Gradient Blobs - Bottom Left */}
              <div className="absolute -bottom-20 -left-8 h-34 w-44 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"></div>

              {/* Gradient Blobs - Bottom Right */}
              <div className="absolute -right-10 -bottom-20 h-44 w-34 rounded-full bg-gradient-to-bl from-blue-400 via-blue-400 to-blue-400 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"></div>

              {/* </SpotlightCard> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardList;
