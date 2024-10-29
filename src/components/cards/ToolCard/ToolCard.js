import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import LinearGradient from "react-native-linear-gradient";

import { SoundIcon } from '../../../../assets/icons';

import styles from "./ToolCard.styles";
import { colors } from '../../../../config';

const ToolCard = ({style={}, id="", title="-", description="", image="", theme=[colors.second_theme_container, colors.third_theme_container], activeSpeechId=null, ttsStatus=null, onPress=() => {}, readAloud=() => {}}) => {
    
    return(
        <TouchableOpacity onPress={onPress}>
            <LinearGradient
                start={{x:0,y:0}}
                end={{x:1,y:1}} 
                colors={theme}
                style={[styles.container, style]}
            >
                <Image
                    style={styles.image}
                    resizeMode={"contain"}
                    source={image}
                />

                <View style={styles.body}>
                    <Text style={styles.title} ellipsizeMode={"tail"} numberOfLines={1}>{title}</Text>
                    <Text style={styles.description} ellipsizeMode={"tail"} numberOfLines={5}>{description}</Text>
                </View>

                <TouchableOpacity
                    style={styles.sound}
                    onPress={readAloud}
                >
                    <SoundIcon width={28} height={28} stroke={(activeSpeechId === id && (ttsStatus === "start" || ttsStatus === "progress")) ? "#74C476" : colors.white_container} strokeWidth={1.5}/>
                </TouchableOpacity>
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default ToolCard;