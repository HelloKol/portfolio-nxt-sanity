import React from "react";
import dynamic from "next/dynamic";

const DynamicAnimatedCursor = dynamic(
  () => import("react-animated-cursor").then((mod) => mod.default),
  { ssr: false }
);

type props = {
  text?: string;
};

const CustomCursor = ({ text }: props) => {
  return (
    <DynamicAnimatedCursor
      innerSize={20}
      outerSize={40}
      color="255, 78, 77"
      outerAlpha={0.2}
      innerScale={0.7}
      outerScale={3}
      clickables={[
        "a",
        'input[type="text"]',
        'input[type="email"]',
        'input[type="number"]',
        'input[type="submit"]',
        'input[type="image"]',
        "label[for]",
        "select",
        "textarea",
        "button",
        ".link",
      ]}
    />
  );
};

export default CustomCursor;
