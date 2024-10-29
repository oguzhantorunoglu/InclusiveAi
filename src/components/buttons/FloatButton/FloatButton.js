import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import { MicrophoneIcon } from '../../../../assets/icons';

import styles from "./FloatButton.styles";
import { colors } from '../../../../config';

const FloatButton = ({style={}, isListening=false, onPress=() => {}}) => {
    return(
        <TouchableOpacity 
            style={[styles.container, style]}
            onPress={onPress}
        >
            {(isListening) ? 
                <View style={styles.stop}/>
                :
                <MicrophoneIcon stroke={colors.white_container} width={50} height={50} strokeWidth={1}/>
            }
        </TouchableOpacity>
    );
};

export default FloatButton;