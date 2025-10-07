import * as React from "react";
import Svg, { Path, Mask, G } from "react-native-svg";
const SvgAppearenceIconWhite = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#fff"
      strokeWidth={1.5}
      d="M2 12.026c0 5.146 3.867 9.387 8.847 9.96.735.085 1.447-.228 1.97-.753a1.68 1.68 0 0 0 0-2.372c-.523-.525-.95-1.307-.555-1.934 1.576-2.508 9.738 3.251 9.738-4.9C22 6.488 17.523 2 12 2S2 6.489 2 12.026Z"
    />
    <Mask
      id="appearenceIconWhite_svg__a"
      width={3}
      height={3}
      x={16}
      y={10}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path fill="#fff" d="M19 11.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
    </Mask>
    <G mask="url(#appearenceIconWhite_svg__a)">
      <Path
        stroke="#fff"
        strokeWidth={1.5}
        d="M17.5 10.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Z"
      />
    </G>
    <Mask
      id="appearenceIconWhite_svg__b"
      width={3}
      height={3}
      x={5}
      y={10}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path fill="#fff" d="M8 11.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
    </Mask>
    <G mask="url(#appearenceIconWhite_svg__b)">
      <Path
        stroke="#fff"
        strokeWidth={1.5}
        d="M6.5 10.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Z"
      />
    </G>
    <Mask
      id="appearenceIconWhite_svg__c"
      width={4}
      height={4}
      x={8}
      y={5}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path fill="#fff" d="M11.085 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
    </Mask>
    <G mask="url(#appearenceIconWhite_svg__c)">
      <Path
        stroke="#fff"
        strokeWidth={1.5}
        d="M9.585 6.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Z"
      />
    </G>
    <Mask
      id="appearenceIconWhite_svg__d"
      width={3}
      height={4}
      x={13}
      y={5}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path fill="#fff" d="M16 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
    </Mask>
    <G mask="url(#appearenceIconWhite_svg__d)">
      <Path
        stroke="#fff"
        strokeWidth={1.5}
        d="M14.5 6.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Z"
      />
    </G>
  </Svg>
);
export default SvgAppearenceIconWhite;
