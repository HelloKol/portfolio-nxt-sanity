import React from "react";
import ReactPlayer from "react-player";

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
    <div className={"mb-8 lg:mb-10"}>
      <ReactPlayer width="100%" height="100%" url={href} muted controls />
    </div>
  );
};

export default VideoPlayerCustom;
