import React from 'react';
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';

import RNRestart from 'react-native-restart';
import LinearGradient from "react-native-linear-gradient";

import { NoInternetAnimation } from '../../../assets/animations';
import { useLanguage } from '../../hooks';

import styles from "./InternetControlScreen.styles";
import { colors, paddings } from '../../../config';

const InternetControlScreen = () => {
    const [languages] = useLanguage();

    const refresh = () => {
        RNRestart.Restart();
    };
    
    return(
        <View style={styles.container}>
            <StatusBar barStyle={"light-content"} backgroundColor={colors.second_theme_container}/>

            <NoInternetAnimation/>

            <Text style={styles.text}>{languages.no_internet_page_description}</Text>

            <LinearGradient
                start={{x:0,y:0}}
                end={{x:1,y:1}} 
                colors={[colors.light_theme_container, colors.dark_theme_container]}
                style={styles.refresh_button}
            >
                <TouchableOpacity
                    style={{padding:paddings.low}}
                    onPress={refresh}
                >
                    <Text style={styles.refresh_button_text}>{languages.refresh_page}</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
};

export default InternetControlScreen;