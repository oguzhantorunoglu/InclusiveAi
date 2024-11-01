import React from 'react'; 
import { StyleSheet, View } from 'react-native';

import Lottie from 'lottie-react-native'; 

const WritesAnimation = () => {
    return (
        <View style={styles.container}>
            <Lottie
                source={require("./writes.json")}    
                loop={true}
                autoPlay={true}
                style={{width:100, height:100}}
            />  
        </View>  
    );
};

export default WritesAnimation;


const styles = StyleSheet.create({
    container:{
        width:"100%",
        justifyContent:"center",
        alignItems:"center"
    }
});