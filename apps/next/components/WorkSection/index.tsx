import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useGSAP, gsap } from "@/lib";
import { PortableText } from "@portabletext/react";
import { Project } from "@/types";
import Container from "../Container";
import { RainbowButton } from "../RainbowButton";
import Portal from "../Portal";
import Section from "../Section";
import Close from "../svg/Close";
import Grid from "../Grid";

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
  allWorks: Project[];
}

/**
 * 🎨 Gradient system
 */
export const GRADIENTS: Record<string, string> = {
  "periwinkle-indigo": "linear-gradient(-20deg, #A8A5FF, #312E81)",
  "silver-charcoal": "linear-gradient(-20deg, #D4D6DB, #3C3F46)",
  "lavender-deep-purple": "linear-gradient(-20deg, #EDAFFF, #461E80)",
  "pink-magenta": "linear-gradient(-20deg, #FFB8E6, #B10854)",
  "mint-teal": "linear-gradient(-20deg, #B7F4C8, #1E7F5C)",
  "sky-blue-navy": "linear-gradient(-20deg, #A7D8FF, #1E3A8A)",
  "peach-burnt-orange": "linear-gradient(-20deg, #FFD1B3, #C2410C)",
  "lemon-olive": "linear-gradient(-20deg, #FFF3B0, #4D7C0F)",
  "lilac-royal-blue": "linear-gradient(-20deg, #D8B4FE, #3730A3)",
  "cyan-deep-teal": "linear-gradient(-20deg, #6FDFFF, #0A4E7A)",
  "rose-plum": "linear-gradient(-20deg, #F9A8D4, #7E22CE)",
  "aqua-cobalt": "linear-gradient(-20deg, #3FE1C4, #1D4ED8)",
  "coral-scarlet": "linear-gradient(-20deg, #FDBA74, #DC2626)",
  "sage-forest": "linear-gradient(-20deg, #BBF7D0, #166534)",
  "slate-midnight": "linear-gradient(-20deg, #7F93B3, #0B1220)",
};

export const DEFAULT_GRADIENT_KEY = "periwinkle-indigo";

export const getCardGradient = (preset?: string | null) => {
  if (!preset) return GRADIENTS[DEFAULT_GRADIENT_KEY];
  if (preset.includes("linear-gradient(")) return preset; // defensive fallback
  return GRADIENTS[preset] || GRADIENTS[DEFAULT_GRADIENT_KEY];
};

const Card = ({
  title,
  excerpt,
  coverImage,
  slug,
  setIsModalOpen,
  gradient,
}: Project & {
  setIsModalOpen: (isModalOpen: boolean) => void;
  gradient: string;
}) => {
  const cardRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const card = cardRef.current;
      if (!card) return;

      gsap.set(card, {
        y: 150,
        opacity: 0,
      });

      ScrollTrigger.create({
        trigger: card,
        start: "top bottom-=100",
        toggleActions: "play none none reset",
        onEnter: () => {
          gsap.to(card, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          });
        },
      });
    },
    { scope: cardRef },
  );

  return (
    <Link
      ref={cardRef}
      href={`/projects/${slug.current}`}
      className="card relative col-span-12 mb-10 block h-[320px] overflow-hidden rounded-[18px] last:mb-0 sm:h-[430px] lg:col-span-6 lg:h-[300px] xl:h-[380px] 2xl:h-[480px]"
      onClick={() => setIsModalOpen(true)}
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 z-0" style={{ background: gradient }} />

      {/* Overlay for readability */}
      <div className="absolute inset-0 z-[1] bg-black/10" />

      {/* Content */}
      <div className="card-inner relative z-10 p-5 lg:p-10 lg:pt-8">
        <div className="card-content">
          <h1 className="card-title text-2xl font-bold text-white">{title}</h1>
          <article className="card-description font-body w-full py-3 pr-3 text-sm text-white/90 sm:text-[16px] xl:text-lg">
            <PortableText value={excerpt} />
          </article>
        </div>

        <div className="card-img mx-auto mt-6 w-[100%] overflow-hidden rounded-lg sm:w-[95%]">
          <img src={`${coverImage?.asset?.url}`} alt={title} />
        </div>
      </div>
    </Link>
  );
};

export default function WorkSection({ data, allWorks = [] }: Props) {
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
        <Close />
      </div>
    );
  };

  const { title, cta, workList } = data;
  if (!workList.length) return null;

  return (
    <Section id="work" className="mb-[100px] xl:mb-[150px]">
      <Container>
        <div className="mb-10 flex w-full items-center justify-between">
          <h1 className="font-heading-bold text-xl uppercase">{title}</h1>
          <RainbowButton onClick={() => setIsModalOpen(true)}>
            {cta.title}
          </RainbowButton>
        </div>

        <Grid>
          {workList.map((card, index) => (
            <Card
              key={index}
              {...card}
              gradient={getCardGradient(card.cardGradient)}
              setIsModalOpen={() => setIsModalOpen(false)}
            />
          ))}
        </Grid>

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
                  {!!allWorks.length && (
                    <Container>
                      <Grid>
                        {allWorks.map((card, index) => (
                          <Card
                            key={index}
                            {...card}
                            gradient={getCardGradient(card.cardGradient)}
                            setIsModalOpen={() => setIsModalOpen(false)}
                          />
                        ))}
                      </Grid>
                    </Container>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Portal>
      </Container>
    </Section>
  );
}
