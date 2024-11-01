import { StyleSheet } from 'react-native';

import { colors, paddings, margins, gaps, fontfamily, fontweight } from "../../../config";

const mobileStyle = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.light_theme_container,
        padding:paddings.mid
    },
    section:{
        marginVertical:margins.very_high,
        gap:gaps.high
    },
    section_title:{
        fontFamily:fontfamily.first_family,
        fontSize:20,
        fontWeight:fontweight.very_high,
        color:colors.text_text,
        marginLeft:margins.very_low
    },
    selectbox:{
        padding:paddings.high,
        paddingVertical:paddings.very_high,
        borderRadius:15,
        borderWidth:1.5
    }
});

export default mobileStyle;