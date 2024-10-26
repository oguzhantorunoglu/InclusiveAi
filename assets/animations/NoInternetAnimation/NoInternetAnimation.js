import React from 'react'; 
import { StyleSheet, View, useWindowDimensions } from 'react-native';

import Lottie from 'lottie-react-native'; 

const NoInternetAnimation = () => {
    const { width } = useWindowDimensions();
    const isTablet = (width > 500) ? true : false;

    return (
        <View style={styles.container}>
            <Lottie
                source={require("./internet.json")}    
                loop={true}
                autoPlay={true}
                style={{
                    width:(isTablet) ? width * 0.70 : width * 0.80,
                    height:(isTablet) ? width * 0.70 : width * 0.80
                }}
            />  
        </View>  
    );
};

export default NoInternetAnimation;


const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center"
    }
});