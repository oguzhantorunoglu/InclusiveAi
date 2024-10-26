import { StyleSheet, Dimensions } from 'react-native';
import { colors, paddings, fontsize, fontweight, fontfamily } from "../../../config";

const width = Dimensions.get('window').width;

const mobileStyle = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        rowGap:30,
        padding:paddings.mid,
        backgroundColor:colors.second_theme_container
    },
    text:{
        fontFamily:fontfamily.first_family,
        fontSize:fontsize.mid,
        fontWeight:fontweight.super_high,
        color:colors.white_text,
        textAlign:"center",
        marginTop:-10
    },
    refresh_button:{
        width:width * 0.6,
        maxWidth:300,
        paddingVertical:paddings.very_low,
        backgroundColor:colors.theme_container,
        borderRadius:12,
        marginTop:20
    },
    refresh_button_text:{
        fontFamily:fontfamily.first_family,
        fontSize:fontsize.high,
        fontWeight:fontweight.very_high,
        color:colors.white_text,
        textAlign:"center"
    }
});

export default mobileStyle;