import React from "react";
import Svg, { Path } from "react-native-svg";

import { colors } from "../../config";

const LeftArrowIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={23}
        height={23}
        fill="none"
        {...props}
    >
        <Path
            stroke={(props.stroke) ? props.stroke : colors.gray_container}
            strokeWidth={(props.strokeWidth) ? props.strokeWidth : 1.5}
            d="M14.132 18.33 8.16 12.357a1.819 1.819 0 0 1 0-2.565l5.972-5.972"
        />
    </Svg>
)

export default LeftArrowIcon;