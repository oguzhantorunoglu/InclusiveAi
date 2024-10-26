import React from "react";
import Svg, { Path } from "react-native-svg";

import { colors } from "../../config";

const DeleteIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={(props.width) ? props.width : 30}
        height={(props.height) ? props.height : 30}
        viewBox="0 0 24 24"
        {...props}
    >
        <Path 
            fill={(props.fill) ? props.fill : colors.gray_container}
            strokeWidth={0}
            d="M10 2 9 3H3v2h1.11l1.783 15.256v.008A2.011 2.011 0 0 0 7.875 22h8.248a2.01 2.01 0 0 0 1.982-1.736l.002-.008L19.891 5H21V3h-6l-1-1h-4zM6.125 5h11.75l-1.752 15H7.875L6.125 5z" 
        />
    </Svg>
);

export default DeleteIcon;
