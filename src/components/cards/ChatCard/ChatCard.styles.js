import { StyleSheet } from 'react-native';

import { colors, paddings, fontsize, fontweight, fontfamily } from '../../../../config';

const mobileStyle = StyleSheet.create({
    container:{
        width:"100%",
        padding:paddings.mid,
        backgroundColor:"#676767",
        borderRadius:20
    },
    left_avatar:{
        width:36,
        height:36,
        borderRadius:36,
        backgroundColor:"#F4F4F4",
        position:"absolute",
        top:48,
        left:-50,
        zIndex:9999
    },
    right_avatar:{
        width:36,
        height:36,
        borderRadius:36,
        backgroundColor:"#F4F4F4",
        position:"absolute",
        top:48,
        right:-50,
        zIndex:9999
    },
    message:{
        flex:1,
        fontFamily:fontfamily.first_family,
        fontSize:fontsize.mid,
        fontWeight:fontweight.mid,
        color:colors.text_text,
        fontStyle:"italic"
    },
    left_sound:{
        width:36,
        height:36,
        borderRadius:36,
        backgroundColor:"rgba(256, 256, 256, 0.1)",
        justifyContent:"center",
        alignItems:"center",
        position:"absolute",
        top:2.5,
        left:-50,
        zIndex:9999
    },
    right_sound:{
        width:36,
        height:36,
        borderRadius:36,
        backgroundColor:"rgba(256, 256, 256, 0.1)",
        justifyContent:"center",
        alignItems:"center",
        position:"absolute",
        top:2.5,
        right:-50,
        zIndex:9999
    }
});

export default mobileStyle;