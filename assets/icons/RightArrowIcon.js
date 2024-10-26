import React from "react";
import Svg, { Path } from "react-native-svg";

import { colors } from "../../config";

const RightArrowIcon = (props) => (
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
            d="m8.938 18.33 5.971-5.972a1.819 1.819 0 0 0 0-2.565L8.937 3.821"
        />
    </Svg>
);

export default RightArrowIcon;