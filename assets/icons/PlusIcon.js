import React from "react";
import Svg, { Path } from "react-native-svg";

import { colors } from "../../config";

const PlusIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke={(props.stroke) ? props.stroke : colors.gray_container}
        viewBox="0 0 24 24"
        {...props}
    >
        <Path d="M4 12h16m-8-8v16" />
    </Svg>
)

export default PlusIcon;