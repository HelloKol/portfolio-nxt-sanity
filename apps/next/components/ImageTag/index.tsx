import { RefObject } from 'react';
import Image, { ImageProps } from 'next/image'; // Importing ImageProps from Next.js
import styles from './styles.module.scss';

interface Props extends ImageProps {
  imageRef?: RefObject<HTMLImageElement>;
  imgClassName?: string;
  layout: 'responsive' | 'fill' | 'intrinsic' | 'fixed';
  objectFit?:
    | 'contain'
    | 'cover'
    | 'fill'
    | 'none'
    | 'scale-down'
    | 'inherit'
    | 'initial'
    | 'unset'
    | 'revert';
}

const ImageTag = ({
  imageRef,
  imgClassName = '',
  src,
  alt,
  height,
  width,
  layout,
  objectFit,
  priority = false,
  quality,
  blurDataURL
}: Props): JSX.Element => {
  return (
    <div className={`${styles.imageWrap}`}>
      <Image
        ref={imageRef}
        className={`${imgClassName || ''} ${styles.imageTag}`}
        src={src}
        alt={alt || ''}
        layout={layout}
        width={width || undefined}
        height={height || undefined}
        quality={quality || 100}
        priority={priority}
        objectFit={objectFit || undefined}
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
      />
    </div>
  );
};

export default ImageTag;
