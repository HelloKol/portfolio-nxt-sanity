import { Container, Section } from '@/components';
import { useTheme } from '@/providers';
import styles from './styles.module.scss';

interface Props {
  data: {
    title: string;
  };
}

const HeroSection = ({ data }: Props): JSX.Element | null => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark-theme';

  if (!data) return null;
  const { title } = data;
  const heroTitleSplit = title.split(' ');
  const heroTitle1 = heroTitleSplit.slice(0, 2).join(' ');
  const heroTitle2 = heroTitleSplit[2];
  const heroTitle3 = heroTitleSplit[3];

  return (
    <Section className={`${styles.heroSection} ${isDarkMode ? styles.darkMode : styles.lightMode}`}>
      <Container isFluid={false}>
        {title && (
          <h1 className={styles.title}>
            <span className={styles.titleLeft}>{heroTitle1}</span>
            <span className={styles.titleRight}>{heroTitle2}</span>
            <span className={styles.titleCenter}>{heroTitle3}</span>
          </h1>
        )}
      </Container>
    </Section>
  );
};

export default HeroSection;
