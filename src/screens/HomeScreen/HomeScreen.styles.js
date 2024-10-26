import { StyleSheet } from 'react-native';

import { colors, margins, paddings, gaps, fontsize, fontweight, fontfamily } from "../../../config";

const mobileStyle = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.light_theme_container
    },
    quote:{
        width:"94%",
        padding:paddings.high,
        backgroundColor:"#E1FB80",
        borderRadius:25,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        gap:gaps.high,
        margin:margins.high,
        marginLeft:"3%",
        marginRight:0
    },
    quote_text:{
        flex:1,
        fontFamily:fontfamily.first_family,
        fontSize:fontsize.low,
        fontWeight:fontweight.mid,
        color:colors.black_text
    },
    owner_text:{
        fontSize:fontsize.mid,
        fontWeight:fontweight.high,
        fontStyle:"italic"
    },
    quote_image:{
        width:70,
        height:100
    },
    sound:{
        width:36,
        height:36,
        borderRadius:36,
        backgroundColor:"rgba(0, 0, 0, 0.3)",
        justifyContent:"center",
        alignItems:"center",
        position:"absolute",
        top:3,
        right:4,
        zIndex:9999
    },
    section:{
        marginVertical:margins.high,
        gap:gaps.high
    },
    header:{
        width:"100%",
        paddingHorizontal:paddings.high,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    header_left_container:{
        flexDirection:"row",
        alignItems:"center",
        gap:gaps.mid
    },
    header_text:{
        fontFamily:fontfamily.first_family,
        fontSize:fontsize.very_high,
        fontWeight:fontweight.high,
        color:colors.text_text
    },
    view_all_text:{
        fontFamily:fontfamily.first_family,
        fontSize:fontsize.mid,
        fontWeight:fontweight.mid,
        color:colors.text_text,
        textDecorationLine:"underline"
    },
    flatlist:{
        padding:paddings.high,
    },
    card:{
        marginBottom:margins.very_high,
    },
});

export default mobileStyle;