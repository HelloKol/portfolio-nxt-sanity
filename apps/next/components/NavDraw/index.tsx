import React, { useEffect, useContext } from "react";
import Link from "next/link";
import { Context } from "@/contexts/Context";
import settings from "../../data/settings.json";
import { useState, useRef } from "react";
import { gsap } from "gsap";

const NavDraw = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const { isNavOpen, setIsNavOpen } = useContext(Context);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  if (!settings) return null;
  const { headerNavigation } = settings;

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.keyCode === 27) setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const renderNavigation = () => {
    return headerNavigation.map(
      (
        item: {
          title: string;
          content: {
            slug: {
              current: string;
            };
          };
        },
        index: number,
      ) => {
        const { title, content } = item;

        return (
          <Link
            key={index}
            href={`/${content.slug.current}`}
            className={`block text-5xl`}
            onClick={() => setIsOpen(false)}
          >
            <span>{title}</span>
          </Link>
        );
      },
    );
  };

  const toggleMenu = () => {
    if (menuRef.current) {
      const tl = gsap.timeline();
      if (!isOpen) {
        tl.set(menuRef.current, {
          visibility: "visible",
          width: 0,
          height: 0,
        }).to(menuRef.current, {
          width: "20vw",
          height: "30vh",
          duration: 0.5,
          ease: "power2.inOut",
        });
      } else {
        tl.to(menuRef.current, {
          width: 0,
          height: 0,
          duration: 0.5,
          ease: "power2.inOut",
        }).set(menuRef.current, { visibility: "hidden" });
      }
    }
    setIsOpen(!isOpen);
  };

  return (
    <nav className="relative">
      <div
        ref={menuRef}
        className="invisible fixed top-4 right-4 flex flex-col items-start justify-center bg-black p-4 text-white"
        style={{ width: 0, height: 0 }}
      >
        <div
          className="mb-4 cursor-pointer text-xl font-bold text-white"
          onClick={toggleMenu}
        >
          ✖
        </div>
        <div>{renderNavigation()}</div>
      </div>
    </nav>
  );
};

export default NavDraw;

// export default function NavDraw() {
//   const { isNavOpen, setIsNavOpen } = useContext(Context);

//   if (!settings) return null;
//   const { credit, headerNavigation } = settings;

//   useEffect(() => {
//     const handleEsc = (event: KeyboardEvent) => {
//       if (event.keyCode === 27) setIsNavOpen(false);
//     };
//     window.addEventListener("keydown", handleEsc);
//     return () => {
//       window.removeEventListener("keydown", handleEsc);
//     };
//   }, []);

//   const renderNavigation = () => {
//     return headerNavigation.map(
//       (
//         item: {
//           title: string;
//           content: {
//             slug: {
//               current: string;
//             };
//           };
//         },
//         index: number,
//       ) => {
//         const { title, content } = item;

//         return (
//           <Link
//             key={index}
//             href={`/${content.slug.current}`}
//             className={`block text-5xl`}
//             onClick={() => setIsNavOpen(false)}
//           >
//             <span>{title}</span>
//           </Link>
//         );
//       },
//     );
//   };

//   return (
//     <div>
//       <div className={`${styles.overlay} ${isNavOpen ? styles.open : ""}`} />
//       <div className={`${styles.navDraw} ${isNavOpen ? styles.open : ""}`}>
//         <ul className={styles.navList}>
//           {renderNavigation()}
//           <div className={`${styles.navItem} ${styles.placeholder}`} />
//         </ul>

//         <button
//           className={styles.burgerMenu}
//           type={"button"}
//           onClick={() => setIsNavOpen(false)}
//         >
//           <div className={styles.menuIcon}>
//             <span></span>
//             <span></span>
//           </div>
//         </button>
//       </div>
//     </div>
//   );
// }
