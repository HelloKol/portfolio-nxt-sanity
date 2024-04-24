import Link from 'next/link';
import { useRouter } from 'next/router';
import { Container } from '@/components';
import { useTheme } from '@/providers';
import settings from '../../data/settings.json';
import styles from './styles.module.scss';

export default function SiteFooter() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark-theme';
  const hideFooterPath = ['/about'];
  const isFooterHidden = hideFooterPath.includes(router.pathname);

  if (isFooterHidden) return null;
  if (!settings) return null;

  const { credit, reserved, socialMediaLinks } = settings;

  const renderFooterLinks = () => {
    return (
      socialMediaLinks &&
      socialMediaLinks.map((item, index) => {
        const { _type, title, url, email } = item;

        if (_type === 'emailLink') {
          return (
            <Link key={index} href={`mailto:${email}`}>
              {title}
            </Link>
          );
        }

        return (
          <Link key={index} href={url as string} target={'_blank'}>
            {title}
          </Link>
        );
      })
    );
  };

  return (
    <footer className={`${styles.footer} ${isDarkMode ? styles.darkMode : styles.lightMode}`}>
      <Container className={styles.footerContainer} isFluid={false}>
        {reserved && (
          <div className={styles.footerDisclaimer}>
            <p>{reserved}</p>
          </div>
        )}

        {credit && (
          <div className={styles.credit}>
            <p>{credit}</p>
          </div>
        )}

        <div className={styles.socialContainer}>{renderFooterLinks()}</div>
      </Container>
    </footer>
  );
}
