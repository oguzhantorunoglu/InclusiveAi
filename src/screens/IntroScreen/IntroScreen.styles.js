import { StyleSheet, Dimensions } from 'react-native';
import { colors, paddings, gaps, fontsize, fontweight, fontfamily } from "../../../config";

const width = Dimensions.get('window').width;

const mobileStyle = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        rowGap:30,
        padding:paddings.mid,
        paddingHorizontal:"5%",
        backgroundColor:colors.light_theme_container,
        marginTop:-70
    },
    slider_container:{
        height:80,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        columnGap:gaps.mid,
        position:"absolute",
        bottom:0,
        zIndex:999999
    },
    dot:{
        width:12,
        height:12,
        backgroundColor:colors.white_container,
        borderRadius:12
    },
    prev_button:{
        padding:paddings.low,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:colors.theme_container,
        borderRadius:50
    },
    info_image:{
        width:width * 0.9,
        height:width * 0.9,
        maxWidth:600,
        maxHeight:600,
        opacity:1,          // 0.9
        borderRadius:40
    },
    info_slogan:{
        fontFamily:fontfamily.first_family,
        fontSize:fontsize.mid,
        fontWeight:fontweight.very_high,
        color:colors.white_text,
        textAlign:"center",
        fontStyle:'italic'
    },
    start_button:{
        width:width * 0.5,
        maxWidth:300,
        backgroundColor:colors.third_theme_container,
        borderRadius:12,
        marginTop:20
    },
    start_button_text:{
        fontFamily:fontfamily.first_family,
        fontSize:fontsize.very_high,
        fontWeight:fontweight.high,
        color:colors.white_text,
        textAlign:"center"
    }
});

export default mobileStyle;