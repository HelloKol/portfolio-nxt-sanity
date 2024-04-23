import Link from 'next/link';
import { useContext } from 'react';
import { Container, NavDraw } from '@/components';
import { Context } from '@/contexts/Context';
import { useTheme } from '@/providers';
import styles from './styles.module.scss';

export default function SiteHeader() {
  const { isNavOpen, setIsNavOpen } = useContext(Context);
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark-theme';
  const date = new Date();
  const year = date.getFullYear();

  return (
    <header
      className={`${styles.header} ${isNavOpen ? styles.open : ''} ${
        isDarkMode ? styles.darkMode : styles.lightMode
      }`}
    >
      <nav className={styles.nav}>
        <Container isFluid={false}>
          <ul className={styles.navList}>
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
