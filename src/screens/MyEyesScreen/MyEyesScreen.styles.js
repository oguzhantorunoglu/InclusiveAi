import { StyleSheet } from 'react-native';

import { colors, margins, paddings, gaps, fontsize, fontweight, fontfamily } from "../../../config";

const mobileStyle = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.light_theme_container
    },
    camera:{
        ...StyleSheet.absoluteFill,
        zIndex:-1
    },
    options_container:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
        position:"absolute",
        top:10,
        left:0,
        zIndex:99999999
    },
    option:{
        width:35,
        height:35,
        borderRadius:35,
        backgroundColor:colors.second_theme_container,
        justifyContent:"center",
        alignItems:"center"
    },
    translate_container:{
        width:"100%",
        padding:paddings.mid,
        backgroundColor:"rgba(0,0,0,0.3)",
        position:"absolute",
        bottom:30,
        left:0,
        zIndex:99999999
    },
    translate:{
        fontFamily:fontfamily.first_family,
        fontSize:fontsize.mid,
        fontWeight:fontsize.mid,
        color:colors.white_text,
    },
    stop:{
        width:"50%",
        height:"50%",
        borderRadius:4,
        backgroundColor:colors.white_container
    },
});

export default mobileStyle;