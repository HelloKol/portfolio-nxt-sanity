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
    <div className={"my-10 ml-auto lg:w-3/4"}>
      <ReactPlayer width="100%" height="100%" url={href} muted controls />
    </div>
  );
};

export default VideoPlayerCustom;
