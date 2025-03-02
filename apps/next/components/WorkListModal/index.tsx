import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import WorkSection from "../WorkSection";
import { Project } from "@/types";

interface Props {
  data: {
    workList: Project[];
  };
}

const WorkListModal = ({ data }: Props): JSX.Element | null => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (modalRef.current && backdropRef.current) {
      const modal = modalRef.current;
      const backdrop = backdropRef.current;

      if (isOpen) {
        // Disable body scroll
        document.body.style.overflow = "hidden";

        // Set initial position
        gsap.set(modal, {
          y: "100%",
          opacity: 1,
          display: "block",
        });
        gsap.set(backdrop, {
          display: "block",
          opacity: 0,
        });

        // Animate backdrop and modal
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
        // Animate down and hide backdrop
        const tl = gsap.timeline({
          onComplete: () => {
            // Re-enable body scroll
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
  }, [isOpen]);

  const renderCloseMenuButton = () => {
    return (
      <div
        className="close-menu-button absolute top-[25px] right-[25px] flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-black transition-all duration-100 hover:scale-85"
        onClick={() => setIsOpen(false)}
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

  const modalContent = (
    <div>
      <div
        ref={backdropRef}
        className="fixed inset-0 z-40 hidden bg-black/30 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      <div
        ref={modalRef}
        className="WorkListModal fixed right-0 bottom-0 left-0 z-50 hidden h-[95vh] rounded-t-4xl bg-white p-4 pt-24 shadow-lg"
        style={{ opacity: 0 }}
      >
        <div className="WorkListModal-inner h-full">
          <div className="WorkListModal-content h-full overflow-y-auto">
            {renderCloseMenuButton()}
            <div className="container mx-auto">
              <WorkSection data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        className="WorkListModal-button mx-auto w-fit"
        onClick={() => setIsOpen(true)}
      >
        See Work List
      </button>

      {mounted ? createPortal(modalContent, document.body) : null}
    </>
  );
};

export default WorkListModal;
