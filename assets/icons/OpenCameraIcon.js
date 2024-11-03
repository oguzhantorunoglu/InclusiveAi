import React from "react";
import Svg, { Path, G } from "react-native-svg";

import { colors } from "../../config";

const OpenCameraIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 -0.5 25 25"
        {...props}
    >
        <G stroke={(props.stroke) ? props.stroke : colors.gray_container}>
            <Path d="M12.25 18.25a5 5 0 1 0 0-10 5 5 0 0 0 0 10" />
            <Path d="M2.25 10a4 4 0 0 1 2.89-3.85 4 4 0 0 0 2.07-1.43l.84-1.12a4 4 0 0 1 3.2-1.6h2a4 4 0 0 1 3.2 1.6l.85 1.12a3.92 3.92 0 0 0 2.07 1.43A4 4 0 0 1 22.25 10l-.67 8a4.44 4.44 0 0 1-4.33 4h-10a4.44 4.44 0 0 1-4.33-4z" />
        </G>
    </Svg>
);

export default OpenCameraIcon;
