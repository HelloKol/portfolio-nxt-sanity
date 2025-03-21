import { useRouter } from "next/router";
import Link from "next/link";
import React, { useContext, useRef } from "react";
import { gsap } from "@/lib";
import { Context } from "@/contexts/Context";
import settings from "@/data/settings.json";
import Email from "../svg/Email";
import Download from "../svg/Download";
import Portal from "../Portal";
import { useWindowDimension } from "@/hooks";
interface MenuToggleProps {
  alternateHeader: boolean;
}

const MenuToggle = ({ alternateHeader }: MenuToggleProps) => {
  const { isNavOpen, setIsNavOpen } = useContext(Context);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const { isMobile } = useWindowDimension();
  const router = useRouter();
  const isHome = router.pathname === "/";

  if (!settings) return null;
  const { headerNavigation, resumeFile } = settings;

  const openMenu = () => {
    if (!menuRef.current || !buttonRef.current) return;

    const tl = gsap.timeline();
    const closeButton = menuRef.current.querySelector(".close-menu-button");
    const socialLinks = menuRef.current.querySelector(".social-links");
    const backdrop = backdropRef.current;
    const buttonRect = buttonRef.current.getBoundingClientRect();
    document.body.style.overflow = "hidden";

    tl.set(menuRef.current, {
      visibility: "visible",
      width: 0,
      minWidth: 0,
      height: 0,
      top: buttonRect.top + "px",
      right: window.innerWidth - buttonRect.right + "px",
    })
      .to([backdrop, menuRef.current], {
        opacity: 1,
        visibility: "visible",
        duration: 0.5,
        ease: "power2.inOut",
        onStart: () => {
          gsap.to(menuRef.current, {
            width: isMobile ? "320px" : "400px",
            minWidth: isMobile ? "320px" : "400px",
            height: "400px",
            duration: 0.5,
            ease: "power2.inOut",
          });
        },
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
      .to(socialLinks, {
        opacity: 1,
        duration: 0.3,
      });

    setIsNavOpen(true);
  };

  const closeMenu = () => {
    if (!menuRef.current || !buttonRef.current) return;

    const tl = gsap.timeline();
    const closeButton = menuRef.current.querySelector(".close-menu-button");
    const socialLinks = menuRef.current.querySelector(".social-links");
    const backdrop = backdropRef.current;

    tl.to(closeButton, {
      opacity: 0,
      duration: 0.3,
    }).to(socialLinks, {
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
          .set(backdrop, {
            opacity: 0,
            visibility: "hidden",
            duration: 0.5,
            ease: "power2.inOut",
          })
          .set(menuRef.current, { visibility: "hidden" })
          .set(buttonRef.current, { borderRadius: "9999px" })
          .set(document.body, { overflow: "auto" });
      },
    });

    setIsNavOpen(false);
  };

  const handleNavClick = async (content: string) => {
    closeMenu();

    if (isHome) return;
    await router.push("/");

    // Remove any # from the content if it exists
    const sectionId = content.replace("#", "");

    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        gsap.to(window, {
          duration: 1,
          ease: "power2.inOut",
          scrollTo: {
            y: element,
            offsetY: 0,
          },
        });
      }
    }, 100);
  };

  const renderNavigation = () => {
    return (
      <div className="group w-fit">
        {headerNavigation.map((item, index) => {
          const { title, content } = item;
          return (
            <Link
              key={index}
              href={`/${content}`}
              ref={(el) => (linksRef.current[index] = el)}
              className="group mb-4 block w-fit text-5xl opacity-0"
              onClick={() => handleNavClick(content)}
            >
              <span className="block text-white transition-all duration-200 group-hover:text-gray-400 hover:text-white">
                {title}
              </span>
            </Link>
          );
        })}
      </div>
    );
  };

  const renderOpenMenuButton = () => {
    return (
      <div
        ref={buttonRef}
        className="open-menu-button flex h-[50px] w-[50px] cursor-pointer items-center overflow-hidden rounded-full hover:rounded-[15px]"
        onClick={openMenu}
      >
        {!isNavOpen && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-full ${alternateHeader ? "fill-black" : "fill-white"}`}
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
        onClick={closeMenu}
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

  const renderBackdrop = () => {
    return (
      <div
        ref={backdropRef}
        onClick={closeMenu}
        className="invisible fixed inset-0 z-2 h-screen w-screen bg-black/30 backdrop-blur-sm"
        style={{ opacity: 0 }}
      />
    );
  };

  const renderEmailLink = () => {
    return (
      <Link
        href="mailto:info@shehab.uk"
        className="email-link block h-fit w-fit rounded-full border border-white p-1 hover:bg-[#6426db]"
      >
        <Email className="h-6 w-6" />
      </Link>
    );
  };

  const renderResumeLink = () => {
    return (
      <Link
        href={resumeFile.asset.url}
        download
        target="_blank"
        className="resume-link absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white pr-3 pl-2 text-xl normal-case hover:bg-[#6426db]"
      >
        <Download className="h-6 w-6" />
        <span className="text-white">Resume</span>
      </Link>
    );
  };

  return (
    <>
      {renderOpenMenuButton()}

      <div
        ref={menuRef}
        className="invisible fixed z-10 overflow-hidden rounded-[30px] bg-[#5A04FF] pt-[30px] pl-6"
        style={{ width: 0, minWidth: 0, height: 0 }}
      >
        {renderCloseMenuButton()}
        <div className="menu-links">{renderNavigation()}</div>
        <div className="social-links absolute right-6 bottom-[25px] left-6 flex opacity-0">
          {renderEmailLink()}
          {renderResumeLink()}
        </div>
      </div>

      <Portal>{renderBackdrop()}</Portal>
    </>
  );
};

export default MenuToggle;
