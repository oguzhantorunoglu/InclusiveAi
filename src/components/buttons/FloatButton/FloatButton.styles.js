import { StyleSheet } from 'react-native';

import { colors } from '../../../../config';

const mobileStyle = StyleSheet.create({
    container:{
        width:80,
        height:80,
        borderRadius:80,
        backgroundColor:colors.second_theme_container,
        justifyContent:"center",
        alignItems:"center",
        position:"absolute",
        bottom:30,
        right:20,
        zIndex:9999999,
        shadowColor:colors.white_container,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
    },
    stop:{
        width:40,
        height:40,
        borderRadius:8,
        backgroundColor:colors.dark_white_container
    }
});

export default mobileStyle;