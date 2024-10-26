import { StyleSheet } from 'react-native';

import { colors, paddings, gaps, fontsize, fontweight, fontfamily } from '../../../../config';

const mobileStyle = StyleSheet.create({
    container:{
        width:"100%",
        height:150,
        padding:paddings.mid,
        backgroundColor:colors.second_theme_container,
        borderRadius:16,
        flexDirection:"row",
        alignItems:"center",
        gap:gaps.high
    },
    image:{
        width:"40%",
        maxWidth:300,
        maxHeight:120
    },
    body:{
        flex:1,
        alignItems:"center",
        gap:gaps.very_high
    },
    title:{
        fontFamily:fontfamily.first_family,
        fontSize:fontsize.high,
        fontWeight:fontweight.very_high,
        color:colors.text_text,
        textTransform:"capitalize"
    },
    description:{
        fontFamily:fontfamily.first_family,
        fontSize:fontsize.mid,
        fontWeight:fontweight.mid,
        color:colors.text_text,
        fontStyle:"italic"
    },
    sound:{
        width:36,
        height:36,
        borderRadius:36,
        backgroundColor:"rgba(256, 256, 256, 0.1)",
        justifyContent:"center",
        alignItems:"center",
        position:"absolute",
        top:2,
        right:3,
        zIndex:9999
    }
});

export default mobileStyle;