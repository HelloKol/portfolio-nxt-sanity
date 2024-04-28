import React, { useRef } from 'react';
import Link from 'next/link';
import { useContext } from 'react';
import { Container, NavDraw } from '@/components';
import { useGSAP, gsap } from '@/lib';
import { Context } from '@/contexts/Context';
import { useTheme } from '@/providers';
import styles from './styles.module.scss';

export default function SiteHeader() {
  const navListRef = useRef<HTMLUListElement>(null);
  const { isNavOpen, setIsNavOpen } = useContext(Context);
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark-theme';
  const date = new Date();
  const year = date.getFullYear();

  useGSAP(
    () => {
      const navItems = gsap.utils.toArray(navListRef?.current?.children!);
      gsap.fromTo(
        navItems,
        {
          y: 15,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          delay: 0.2,
          stagger: {
            each: 0.3,
            ease: 'power2.inOut'
          }
        }
      );
    },
    { scope: navListRef }
  );

  return (
    <header
      className={`${styles.header} ${isNavOpen ? styles.open : ''} ${
        isDarkMode ? styles.darkMode : styles.lightMode
      }`}
    >
      <nav className={styles.nav}>
        <Container isFluid={false}>
          <ul className={styles.navList} ref={navListRef}>
            <li className={styles.navItem} onClick={toggleTheme}>
              <button>{isDarkMode ? 'light.' : 'dark.'}</button>
            </li>

            <li className={styles.navItem}>
              <Link href={`/`}>est. {year}</Link>
            </li>

            <li className={styles.navItem}>
              <button className={styles.burgerMenu} type={'button'} onClick={() => setIsNavOpen(!isNavOpen)}>
                <div className={styles.menuIcon}>
                  <input
                    className={styles.menuIconCheckbox}
                    checked={isNavOpen}
                    type="checkbox"
                    onChange={() => null}
                  />
                  <div>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </button>
            </li>
          </ul>
        </Container>
        <NavDraw />
      </nav>
    </header>
  );
}
