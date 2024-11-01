import { StyleSheet, Platform } from 'react-native';

import { colors, paddings, gaps, fontfamily } from '../../../../config';

const mobileStyle = StyleSheet.create({
    container:{
        width:"100%",
        padding:paddings.mid,
        backgroundColor:"#2F2F2F",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"flex-end",
        columnGap:gaps.mid,
        position:"absolute",
        bottom:0,
        zIndex:99999
    },
    input:{
        flex:1,
        maxHeight:100,
        padding:paddings.low,
        paddingVertical:(Platform.OS === "ios") ? 6 : 3,
        borderRadius:4,
        borderWidth:1,
        borderColor:"#676767",
        fontFamily:fontfamily.first_family,
        fontSize:fontsize.mid,
        color:colors.text_text,
        //textAlignVertical:'top',
        marginBottom:50
    },
    button:{
        width:32,
        height:32,
        borderRadius:32,
        backgroundColor:colors.second_theme_container,
        justifyContent:"center",
        alignItems:"center",
        marginBottom:50
    }
});

export default mobileStyle;