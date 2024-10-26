import React from "react";
import Svg, { Path } from "react-native-svg";

import { colors } from "../../config";

const SaveIcon = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="-6 -6 43 43" {...props}>
        <Path
            fill={(props.fill) ? props.fill : colors.gray_container}
            d="M19 10a1 1 0 0 0 1-1V5a1 1 0 1 0-2 0v4a1 1 0 0 0 1 1zm11 18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2h2a2 2 0 0 1 2 2v24zM8 2h16v9a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V2zm20-2H4a4 4 0 0 0-4 4v24a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4z"
        />
    </Svg>
);

export default SaveIcon;