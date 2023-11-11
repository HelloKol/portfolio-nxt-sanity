import { useState } from "react";
import Image from "next/image";
import styles from "./styles.module.scss";

interface props {
  src: string;
  alt?: string;
  height?: number;
  width?: number;
  layout: "responsive" | "fill" | "intrinsic" | "fixed";
  priority?: boolean;
  imgClassName?: string;
  fadeUp?: boolean;
  quality?: number;
  objectFit?:
    | "contain"
    | "cover"
    | "fill"
    | "none"
    | "scale-down"
    | "inherit"
    | "initial"
    | "unset"
    | "revert";
}

const ImageTag = ({
  src,
  alt,
  height,
  width,
  layout,
  priority = false,
  imgClassName = "",
  quality,
  objectFit,
}: props): JSX.Element => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`${styles.imageWrap}`}>
      <Image
        className={`${imgClassName || ""} ${styles.imageTag} ${
          isLoaded && styles.active
        }`}
        src={src}
        alt={alt || ""}
        layout={layout}
        width={width || undefined}
        height={height || undefined}
        quality={quality || 100}
        priority={priority}
        objectFit={objectFit || undefined}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

export default ImageTag;
