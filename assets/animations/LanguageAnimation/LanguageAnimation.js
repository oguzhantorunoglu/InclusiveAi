import React from 'react'; 
import { StyleSheet, View, useWindowDimensions } from 'react-native';

import Lottie from 'lottie-react-native'; 

const LanguageAnimation = () => {
    const { width } = useWindowDimensions();
    const isTablet = (width > 500) ? true : false;

    return (
        <View style={styles.container}>
            <Lottie
                source={require("./language.json")}    
                loop={true}
                autoPlay={true}
                style={{
                    width:(isTablet) ? width * 0.70 : width * 0.85,
                    height:(isTablet) ? width * 0.70 : width * 0.85
                }}
            />  
        </View>  
    );
};

export default LanguageAnimation;


const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center"
    }
});