import React from "react";
import Svg, { Path } from "react-native-svg";

import { colors } from "../../config";

const MicrophoneIcon = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -0.25 32 32" {...props}>
        <Path
            fill={(props.fill) ? props.fill : colors.gray_container}
            d="M11 24a7 7 0 0 0 7-7V7A7 7 0 1 0 4 7v10a7 7 0 0 0 7 7zm11-5h-2c-.911 4.007-4.718 7-9 7s-8.089-2.993-9-7H0c.883 4.799 5.063 8.51 10 8.955V30H9a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2h-1v-2.045c4.937-.445 9.117-4.156 10-8.955z"
        />
    </Svg>
);

export default MicrophoneIcon;