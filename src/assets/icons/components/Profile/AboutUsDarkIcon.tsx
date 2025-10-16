import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgAboutUsDarkIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#E3E5E6"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M12 17v-6"
    />
    <Path fill="#E3E5E6" d="M12 7a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
    <Path
      stroke="#E3E5E6"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M7 3.338A9.95 9.95 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-1.821.487-3.53 1.338-5"
    />
  </Svg>
);
export default SvgAboutUsDarkIcon;
