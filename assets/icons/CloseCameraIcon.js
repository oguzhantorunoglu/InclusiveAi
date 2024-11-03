import React from "react";
import Svg, { Path, G } from "react-native-svg";

import { colors } from "../../config";

const CloseCameraIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        {...props}
    >
        <G stroke={(props.stroke) ? props.stroke : colors.gray_container}>
            <Path d="M7.9 16.1a5 5 0 0 1 6.96-6.96m1.84 2.4a5 5 0 0 1-6.41 6.41" />
            <Path d="M20.949 7.29a4 4 0 0 1 1.05 2.71l-.67 8a4.44 4.44 0 0 1-4.33 4h-10q-.349 0-.69-.06m-2.67-1.58a4.25 4.25 0 0 1-1-2.35l-.67-8a4 4 0 0 1 2.89-3.85 4 4 0 0 0 2.07-1.43l.84-1.12a4 4 0 0 1 3.2-1.6h2a4 4 0 0 1 3.2 1.6l.85 1.12c.32.41.722.75 1.18 1M22 2 2 22" />
        </G>
    </Svg>
);

export default CloseCameraIcon;