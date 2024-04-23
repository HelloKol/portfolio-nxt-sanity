import React from 'react';
import { ImageTag } from '@/components';
import { Media } from '@/types';
import styles from './styles.module.scss';

// Props
interface Props {
  value: Media;
}

const BlockContentImage = ({ value }: Props) => {
  if (!value || !value.asset) return null;
  const { asset } = value;

  return (
    <div className={styles.imageWrapper}>
      <ImageTag
        src={`${asset?.url}`}
        alt="project Image"
        layout="responsive"
        objectFit="contain"
        quality={100}
        height={500}
        width={500}
        priority={true}
        blurDataURL={asset?.metadata?.lqip}
      />
    </div>
  );
};

export default BlockContentImage;
