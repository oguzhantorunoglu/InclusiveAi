import React from "react";
import Svg, { Path } from "react-native-svg";

import { colors } from "../../config";

const FlashIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        {...props}
    >
        <Path
            fill={(props.fill) ? props.fill : colors.gray_container}
            d="M5.665 2.742A2.5 2.5 0 0 1 8.047 1h5.129c1.794 0 3.004 1.835 2.297 3.485L13.968 8h4.274c2.247 0 3.353 2.735 1.737 4.297L9.431 22.493c-1.178 1.138-3.067-.164-2.422-1.669L9.934 14H5.502a2.5 2.5 0 0 1-2.383-3.258zM8.047 3a.5.5 0 0 0-.476.348l-2.546 8a.5.5 0 0 0 .477.652h5.645a1.2 1.2 0 0 1 1.103 1.673L9.826 19.33l8.762-8.47a.5.5 0 0 0-.348-.86h-5.486a1.2 1.2 0 0 1-1.103-1.673l1.984-4.63a.5.5 0 0 0-.46-.697z"
        />
    </Svg>
);

export default FlashIcon;