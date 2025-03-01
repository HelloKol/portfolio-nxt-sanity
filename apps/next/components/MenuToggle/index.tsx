import { Context } from "@/contexts/Context";
import { gsap } from "gsap";
import { useRef } from "react";
import Link from "next/link";
import React, { useContext } from "react";
import settings from "../../data/settings.json";
import Email from "../svg/Email";

const MenuToggle = () => {
  const { isNavOpen, setIsNavOpen } = useContext(Context);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  if (!settings) return null;
  const { headerNavigation } = settings;

  const toggleMenu = () => {
    if (menuRef.current && buttonRef.current) {
      const tl = gsap.timeline();
      const closeButton = menuRef.current.querySelector(".close-menu-button");
      const emailLink = menuRef.current.querySelector(".email-link");

      if (!isNavOpen) {
        tl.set(menuRef.current, {
          visibility: "visible",
          width: 0,
          minWidth: 0,
          height: 0,
        })
          .to(menuRef.current, {
            width: "20vw",
            minWidth: "300px",
            height: "40vh",
            duration: 0.5,
            ease: "power2.inOut",
          })
          .add(() => {
            gsap.to(linksRef.current, {
              opacity: 1,
              y: -10,
              stagger: 0.1,
              duration: 0.3,
              ease: "power2.out",
            });
          })
          .set(buttonRef.current, { borderRadius: "15px" }, "-=0.5")
          .to(closeButton, {
            opacity: 1,
            duration: 0.3,
          })
          .to(emailLink, {
            opacity: 1,
            duration: 0.3,
          });
      } else {
        tl.to(closeButton, {
          opacity: 0,
          duration: 0.3,
        }).to(emailLink, {
          opacity: 0,
          duration: 0.3,
        });
        gsap.to(linksRef.current, {
          opacity: 0,
          y: 10,
          stagger: 0.1,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            tl.to(menuRef.current, {
              width: 0,
              minWidth: 0,
              height: 0,
              duration: 0.5,
              ease: "power2.inOut",
            })
              .set(menuRef.current, { visibility: "hidden" })
              .set(buttonRef.current, { borderRadius: "9999px" });
          },
        });
      }
      setIsNavOpen(!isNavOpen);
    }
  };

  const renderNavigation = () => {
    return headerNavigation.map((item, index) => {
      const { title, content } = item;
      return (
        <Link
          key={index}
          href={`/${content.slug.current}`}
          ref={(el) => (linksRef.current[index] = el)}
          className="block text-5xl opacity-0"
          onClick={() => setIsNavOpen(false)}
        >
          <span className="block text-gray-500 transition-all duration-200 hover:text-white">
            {title}
          </span>
        </Link>
      );
    });
  };

  const renderOpenMenuButton = () => {
    return (
      <div
        ref={buttonRef}
        className="open-menu-button top-[20px] right-[20px] flex h-[50px] w-[50px] cursor-pointer items-center overflow-hidden rounded-full hover:rounded-[15px]"
        onClick={toggleMenu}
      >
        {!isNavOpen && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-full fill-white"
            viewBox="0 0 25 9"
            width="25"
            height="9"
          >
            <rect y="0" width="25" height="2" rx="2"></rect>
            <rect y="7" width="25" height="2" rx="2"></rect>
          </svg>
        )}
      </div>
    );
  };

  const renderCloseMenuButton = () => {
    return (
      <div
        className="close-menu-button absolute top-[25px] right-[25px] flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-white opacity-0 transition-all duration-100 hover:scale-85"
        onClick={toggleMenu}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M18 6L6 18M6 6l12 12"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    );
  };

  const renderEmailLink = () => {
    return (
      <Link
        href="mailto:info@shehab.uk"
        className="email-link absolute bottom-[25px] left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white pr-3 pl-2 normal-case opacity-0 hover:bg-gray-700"
      >
        <Email />
        <span className="text-white">info@shehab.uk</span>
      </Link>
    );
  };

  return (
    <>
      {renderOpenMenuButton()}
      <div
        ref={menuRef}
        className="invisible fixed top-0 right-0 flex flex-col items-start justify-center overflow-hidden rounded-[30px] bg-[#37269E] p-4"
        style={{ width: 0, minWidth: 0, height: 0 }}
      >
        {renderCloseMenuButton()}
        <div>{renderNavigation()}</div>
        {renderEmailLink()}
      </div>
    </>
  );
};

export default MenuToggle;
