import React from 'react';
import ReactPlayer from 'react-player';
import styles from './styles.module.scss';

// Props
interface Props {
  value: {
    href: string;
  };
}

const VideoPlayerCustom = ({ value }: Props) => {
  if (!value || !value.href) return null;
  const { href } = value;

  return (
    <div className={styles.videoPlayerWrapper}>
      <ReactPlayer width="100%" height="100%" url={href} playing muted controls />
    </div>
  );
};

export default VideoPlayerCustom;
