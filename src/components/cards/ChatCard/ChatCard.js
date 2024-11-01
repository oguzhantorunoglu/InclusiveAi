import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import { SoundIcon } from '../../../../assets/icons';

import styles from "./ChatCard.styles";
import { colors } from '../../../../config';

const ChatCard = ({style={}, id="", message="-", isUser=true, activeSpeechId=null, ttsStatus=null, readAloud=() => {}}) => {
    
    return(
        <View style={[styles.container, style, {backgroundColor:(!isUser) ? colors.second_theme_container : "#676767"}]}>
            <Text style={styles.message}>{message}</Text>

            <TouchableOpacity
                style={(isUser) ? styles.left_sound : styles.right_sound}
                onPress={readAloud}
            >
                <SoundIcon width={28} height={28} stroke={(activeSpeechId === id && (ttsStatus === "start" || ttsStatus === "progress")) ? "#74C476" : colors.white_container} strokeWidth={1.5}/>
            </TouchableOpacity> 

            {(!isUser) ?
                <Image
                    style={(isUser) ? styles.left_avatar : styles.right_avatar}
                    resizeMode={"contain"}
                    source={require("../../../../assets/images/storyteller.png")}
                />
                :
                null
            }
        </View>
    );
};

export default ChatCard;