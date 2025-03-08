import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { PortableText } from "@portabletext/react";
import { Project } from "@/types";
import Container from "../Container";
import { RainbowButton } from "../RainbowButton";
import Portal from "../Portal";

interface Props {
  data: {
    title: string;
    cta: {
      title: string;
      _type: string;
      content: {
        slug: {
          current: string;
        };
      };
    };
    workList: Project[];
  };
}

const Card = ({ title, excerpt, coverImage, slug }: Project) => {
  return (
    <Link
      href={`/projects/${slug.current}`}
      className="card mb-10 block h-[410px] overflow-hidden rounded-[30px] bg-[#f5f5f5] last:mb-0 lg:h-[500px] xl:h-[530px] 2xl:h-[680px]"
    >
      <div className="card-inner p-5 lg:p-10">
        <div className="card-content relative z-2">
          <h1 className="card-title text-3xl font-bold lg:text-[40px]">
            {title}
          </h1>
          <article className="card-description w-10/12 text-lg lg:text-xl">
            <PortableText value={excerpt} />
          </article>
        </div>

        <div className="card-img mx-auto mt-10 w-[100%] sm:mt-16 sm:w-[80%] 2xl:mt-20">
          <img src={`${coverImage?.asset?.url}`} alt={title} />
        </div>
      </div>

      <div className="gradient-box"></div>
    </Link>
  );
};

export default function WorkSection({ data }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current && backdropRef.current) {
      const modal = modalRef.current;
      const backdrop = backdropRef.current;

      if (isModalOpen) {
        document.body.style.overflow = "hidden";

        gsap.set(modal, {
          y: "100%",
          opacity: 1,
          display: "block",
        });
        gsap.set(backdrop, {
          display: "block",
          opacity: 0,
        });

        const tl = gsap.timeline();
        tl.to(backdrop, {
          opacity: 1,
          duration: 0.3,
        }).to(
          modal,
          {
            y: "0%",
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.2",
        );
      } else {
        const tl = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = "auto";
          },
        });

        tl.to(modal, {
          y: "100%",
          duration: 0.5,
          ease: "power3.in",
        }).to(
          backdrop,
          {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
              gsap.set([modal, backdrop], { display: "none" });
            },
          },
          "-=0.3",
        );
      }
    }
  }, [isModalOpen]);

  const renderCloseMenuButton = () => {
    return (
      <div
        className="close-menu-button absolute top-[25px] right-[25px] flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-black transition-all duration-100 hover:scale-85"
        onClick={() => setIsModalOpen(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M18 6L6 18M6 6l12 12"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    );
  };

  const { title, cta, workList } = data;
  if (!workList.length) return null;

  return (
    <section id="work" className="mb-[100px] xl:mb-[150px]">
      <Container>
        <div className="mb-10 flex w-full items-center justify-between">
          <h1 className="text-center text-xl">{title}</h1>
          <RainbowButton onClick={() => setIsModalOpen(true)}>
            {cta.title}
          </RainbowButton>
        </div>

        {workList.map((card, index) => (
          <Card key={index} {...card} />
        ))}

        <Portal>
          <div>
            <div
              ref={backdropRef}
              className="fixed inset-0 z-40 hidden bg-black/30 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <div
              ref={modalRef}
              className="WorkListModal fixed right-0 bottom-0 left-0 z-50 hidden h-[95vh] rounded-t-4xl bg-white pt-24 shadow-lg"
              style={{ opacity: 0 }}
            >
              <div className="WorkListModal-inner h-full">
                <div className="WorkListModal-content h-[98%] overflow-y-auto">
                  {renderCloseMenuButton()}
                  <Container>
                    {data.workList.map((card, index) => (
                      <Card key={index} {...card} />
                    ))}
                  </Container>
                </div>
              </div>
            </div>
          </div>
        </Portal>
      </Container>
    </section>
  );
}
