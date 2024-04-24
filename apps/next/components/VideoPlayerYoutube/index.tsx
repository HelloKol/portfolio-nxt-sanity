import React from 'react';
import ReactPlayer from 'react-player/youtube';
import styles from './styles.module.scss';

// Props
interface Props {
  value: {
    url: string;
  };
}

const VideoPlayerYoutube = ({ value }: Props) => {
  if (!value || !value.url) return null;
  const { url } = value;

  return (
    <div className={styles.videoPlayerWrapper}>
      <ReactPlayer width="100%" height="100%" url={url} playing muted controls />
    </div>
  );
};

export default VideoPlayerYoutube;
