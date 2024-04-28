import { useContext } from 'react';
import { Button } from '@/components';
import { Context } from '@/contexts/Context';
import { useTheme } from '@/providers';
import styles from './styles.module.scss';

type Props = {
  animate: any;
};

export default function ProjectFilter({ animate }: Props) {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark-theme';
  const { projectFilterTag, setProjectFilterTag } = useContext(Context);

  const handleChangeType = (type: string) => {
    setProjectFilterTag(type);
    animate();
  };

  return (
    <div className={`${styles.projectFilter} ${isDarkMode ? styles.darkMode : styles.lightMode}`}>
      <div className={styles.filterListWrap}>
        <ul className={styles.filterList}>
          <li>
            <Button
              className={`${styles.filterBtn} ${projectFilterTag === '' && styles.activeFilterBtn}`}
              onClick={() => handleChangeType('')}
            >
              All
            </Button>
          </li>
          <li>
            <Button
              className={`${styles.filterBtn} ${projectFilterTag === 'design' && styles.activeFilterBtn}`}
              onClick={() => handleChangeType('design')}
            >
              Design
            </Button>
          </li>
          <li>
            <Button
              className={`${styles.filterBtn} ${projectFilterTag === 'web' && styles.activeFilterBtn}`}
              onClick={() => handleChangeType('web')}
            >
              Web
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}
