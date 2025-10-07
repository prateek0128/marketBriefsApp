import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
const SvgPaymentDetailsIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <G stroke="#6B4EFF" clipPath="url(#paymentDetailsIcon_svg__a)">
      <Path d="M7.014 1.75a1.333 1.333 0 0 1 1.972 0l.68.746a1.33 1.33 0 0 0 1.048.434l1.009-.047a1.333 1.333 0 0 1 1.394 1.394l-.047 1.009a1.33 1.33 0 0 0 .434 1.048l.747.68a1.334 1.334 0 0 1 0 1.972l-.747.68a1.33 1.33 0 0 0-.434 1.048l.047 1.009a1.334 1.334 0 0 1-1.394 1.394l-1.009-.047a1.34 1.34 0 0 0-1.048.434l-.68.747a1.334 1.334 0 0 1-1.972 0l-.68-.747a1.33 1.33 0 0 0-1.048-.434l-1.009.047a1.334 1.334 0 0 1-1.394-1.394l.047-1.01a1.33 1.33 0 0 0-.434-1.047l-.747-.68a1.333 1.333 0 0 1 0-1.972l.747-.68a1.33 1.33 0 0 0 .434-1.048l-.047-1.009a1.333 1.333 0 0 1 1.394-1.394l1.009.047a1.33 1.33 0 0 0 1.048-.434z" />
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m6 8 1.333 1.333L10 6.667"
      />
    </G>
    <Defs>
      <ClipPath id="paymentDetailsIcon_svg__a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgPaymentDetailsIcon;
