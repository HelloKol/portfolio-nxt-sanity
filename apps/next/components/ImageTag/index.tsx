import Image from 'next/image';
import styles from './styles.module.scss';

interface props {
  src: string;
  alt?: string;
  height?: number;
  width?: number;
  layout: 'responsive' | 'fill' | 'intrinsic' | 'fixed';
  priority?: boolean;
  imgClassName?: string;
  fadeUp?: boolean;
  quality?: number;
  blurDataURL?: string;
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
  imageRef: any;
}

const ImageTag = ({
  src,
  alt,
  height,
  width,
  layout,
  priority = false,
  imgClassName = '',
  quality,
  objectFit,
  blurDataURL,
  imageRef
}: props): JSX.Element => {
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
