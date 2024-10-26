import React, { useEffect } from 'react';
import { LogBox, StatusBar, TouchableOpacity, ScrollView, FlatList } from 'react-native';

import Router from './src/Router';

import { colors } from './config';


// ScrollView default props options
ScrollView.defaultProps = ScrollView.defaultProps || {};
ScrollView.defaultProps.showsVerticalScrollIndicator = false;
ScrollView.defaultProps.showsHorizontalScrollIndicator = false;

// FlatList default props options
FlatList.defaultProps = FlatList.defaultProps || {};
FlatList.defaultProps.showsVerticalScrollIndicator = false;
FlatList.defaultProps.showsHorizontalScrollIndicator = false;
FlatList.defaultProps.directionalLockEnabled = true;

// TouchableOpacity default props options
TouchableOpacity.defaultProps = TouchableOpacity.defaultProps || {};
TouchableOpacity.defaultProps.activeOpacity = 0.7;


if (!__DEV__) {
    console.log = () => {};
    console.warn = () => {};
    console.error = () => {};
}


const App = () => {

    useEffect(() => {
        //LogBox.ignoreAllLogs();
    }, []);


    return(
        <>
            <StatusBar barStyle={"light-content"} backgroundColor={colors.theme_container}/>
            <Router/>
        </>
    );
};

export default App;