import React from 'react'; 
import { StyleSheet, View, StatusBar, useWindowDimensions } from 'react-native';

import Lottie from 'lottie-react-native'; 

import { colors } from '../../../config';

const LoadingAnimation = () => {
    const { width } = useWindowDimensions();
    const isTablet = (width > 500) ? true : false;

    return (
        <View style={styles.container}>
            <StatusBar barStyle={"light-content"} backgroundColor={"#16171B"}/>

            <Lottie
                source={require("./loading.json")}    
                loop={true}
                autoPlay={true}
                style={{
                    width:(isTablet) ? width * 1.0 : width * 1.3,
                    height:(isTablet) ? width * 1.0 : width * 1.3,  
                }}
            />  
        </View>  
    );
};

export default LoadingAnimation;


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#16171B"
    }
});