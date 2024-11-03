import { StyleSheet } from 'react-native';

import { colors, margins, paddings, gaps, fontsize, fontweight, fontfamily } from "../../../config";

const mobileStyle = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.light_theme_container,
        justifyContent:"center",
        alignItems:"center"
    },
    text:{
        fontFamily:fontfamily.first_family,
        fontSize:fontsize.super_high,
        fontWeight:fontweight.super_high,
        color:colors.text_text,
        textAlign:"center"
    }
});

export default mobileStyle;