import React, { useRef } from "react";
import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/router";
import { Container, MenuToggle } from "@/components";
import { useGSAP, gsap } from "@/lib";
import { Context } from "@/contexts/Context";
import styles from "./styles.module.scss";

export default function SiteHeader() {
  const router = useRouter();
  const { isNavOpen } = useContext(Context);
  const navListRef = useRef<HTMLDivElement>(null);
  const date = new Date();
  const year = date.getFullYear();
  const alternateHeader = ["/projects/[slug]"].includes(router.pathname);

  useGSAP(
    () => {
      const navItems = gsap.utils.toArray(navListRef?.current?.children!);
      gsap.fromTo(
        navItems,
        {
          y: 15,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          delay: 0.2,
          stagger: {
            each: 0.3,
            ease: "power2.inOut",
          },
        },
      );
    },
    { scope: navListRef },
  );

  return (
    <header className={`${styles.header} ${isNavOpen ? styles.open : ""} `}>
      <nav className={styles.nav}>
        <Container className="w-full">
          <div
            className={"flex flex-wrap items-center justify-between"}
            ref={navListRef}
          >
            <Link
              href={`/`}
              className={`${alternateHeader ? "text-black" : "text-white"} uppercase`}
            >
              est. {year}
            </Link>

            <MenuToggle alternateHeader={alternateHeader} />
          </div>
        </Container>
      </nav>
    </header>
  );
}
