import React from "react";
import Svg, { Path } from "react-native-svg";

import { colors } from "../../config";

const UpArrowIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={23}
        height={23}
        fill="none"
        {...props}
    >
        <Path
            stroke={(props.stroke) ? props.stroke : colors.gray_container}
            strokeWidth={1.5}
            d="m18.785 13.869-5.971-5.972a1.819 1.819 0 0 0-2.565 0L4.277 13.87"
        />
    </Svg>
)

export default UpArrowIcon;
