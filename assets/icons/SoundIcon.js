import React from "react";
import Svg, { Path } from "react-native-svg";

import { colors } from "../../config";

const SoundIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="-0.5 0 25 25"
        {...props}
    >
        <Path
            stroke={(props.stroke) ? props.stroke : colors.gray_container}
            d="M12.55 4.5c-1.23-.46-3.84 1-6 2.91h-1.6a4 4 0 0 0-4 4v2a4 4 0 0 0 4 4h1.6c2.11 1.94 4.72 3.37 6 2.92 2.1-.78 2.45-5 2.45-7.92s-.35-7.13-2.45-7.91zm8.11 2.22a8 8 0 0 1 0 11.31m-2.12-2.08a5 5 0 0 0 0-7.07"
        />
    </Svg>
);

export default SoundIcon;
