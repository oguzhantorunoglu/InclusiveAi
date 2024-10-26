import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StatusBar, TouchableOpacity, Image } from 'react-native';

import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import LinearGradient from "react-native-linear-gradient";

import { LanguageAnimation } from '../../../assets/animations';
import { Selectbox } from '../../components/others';
import { LeftArrowIcon } from '../../../assets/icons';
import { useLanguage } from '../../hooks';

import styles from "./IntroScreen.styles";
import { colors, paddings } from '../../../config';


const DataLanguage = [
    {
        id:"1",
        icon:require("../../../assets/images/language.png"),
        text:"English",
        key:"en"
    },
    {
        id:"2",
        icon:require("../../../assets/images/language.png"),
        text:"Türkçe",
        key:"tr"
    },
    {
        id:"3",
        icon:require("../../../assets/images/language.png"),
        text:"Deutsch",
        key:"de"
    },
    {
        id:"4",
        icon:require("../../../assets/images/language.png"),
        text:"Español",
        key:"es"
    },
    {
        id:"5",
        icon:require("../../../assets/images/language.png"),
        text:"Italiano",
        key:"it"
    },
    {
        id:"6",
        icon:require("../../../assets/images/language.png"),
        text:"Français",
        key:"fr"
    }
]

const PageColors = [
    [colors.light_theme_container, colors.dark_theme_container], 
    [colors.theme_container, colors.second_theme_container], 
    [colors.second_theme_container, colors.third_theme_container],
    [colors.third_theme_container, colors.light_theme_container]
];

const IntroScreen = (props) => {
    const [isRefreshLanguage, setIsRefreshLanguage] = useState(false);
    const [selectedItemLanguage, setSelectedItemLanguage] = useState({});
    const [selectboxLanguage, setSelectboxLanguage] = useState({});
    const [languageData, setLanguageData] = useState([]);
    const [page, setPage] = useState(1);

    const [languages, reloadLanguage] = useLanguage();


    const getData = () => {
        setLanguageData(DataLanguage);
    };


    const saveLanguage = async (item) => {
        if(item?.key){
            await AsyncStorage.setItem('@language', item.key);
            reloadLanguage();
            setPage(2);
        }
        else{
            showMessage({
                message:languages.selection_error,
                description:languages.select_language_error,
                type:"warning",
                icon:"warning", 
            });  

            setPage(1);
        }
    };


    const prevPage = () => {
        if(page > 1){
            setPage(page - 1);
        }
        else{
            setPage(1);
        }
    }

    const startApp = async () => {
        await AsyncStorage.setItem('@firstLoad', "1");
        props.firstLoadControl();
    };

    const onRefreshLanguage = () => {
        setIsRefreshLanguage(true);
        getData();
        setIsRefreshLanguage(false);
    };


    useEffect(() => {
        getData();
    }, []);


    const renderPage = {
        1:                
        <>
            <LanguageAnimation/>

            <Selectbox
                style={{padding:paddings.high, backgroundColor:colors.white_container, borderRadius:16, marginTop:-50}}
                selectbox_placeholder={languages.language_selectbox_placeholder}
                search_bar_placeholder={languages.search}
                empty_list_text={languages.selectbox_empty_list_text}
                cancel_button={languages.cancel}
                select_button={languages.select}
                data={languageData}
                refreshing={isRefreshLanguage}
                onRefresh={onRefreshLanguage}
                selectedItem={selectedItemLanguage} 
                setSelectedItem={setSelectedItemLanguage}
                selectbox={selectboxLanguage} 
                setSelectbox={setSelectboxLanguage}
                saveSelectedItem={saveLanguage}
            />
        </>,
        2:
        <>
            <Image
                style={[styles.info_image, {borderRadius:50}]}
                resizeMode={"contain"}
                source={require("../../../assets/images/info_image1.webp")}
            />

            <Text style={styles.info_slogan}>{languages.info_slogan}</Text>

            <LinearGradient
                start={{x:0,y:0}}
                end={{x:1,y:1}} 
                colors={[colors.light_theme_container, colors.dark_theme_container]}
                style={styles.start_button}
            >
                <TouchableOpacity
                    style={{padding:paddings.low}}
                    onPress={() => setPage(3)}
                >
                    <Text style={styles.start_button_text}>{languages.next}</Text>
                </TouchableOpacity>
            </LinearGradient>
        </>,
        3:
        <>
            <Image
                style={styles.info_image}
                resizeMode={"contain"}
                source={require("../../../assets/images/info_image2.webp")}
            />

            <Text style={styles.info_slogan}>{languages.info_slogan_2}</Text>

            <LinearGradient
                start={{x:0,y:0}}
                end={{x:1,y:1}} 
                colors={[colors.light_theme_container, colors.theme_container]}
                style={styles.start_button}
            >
                <TouchableOpacity
                    style={{padding:paddings.low}}
                    onPress={() => setPage(4)}
                >
                    <Text style={styles.start_button_text}>{languages.next}</Text>
                </TouchableOpacity>
            </LinearGradient>
        </>,
        4:
        <>
            <Image
                style={styles.info_image}
                resizeMode={"contain"}
                source={require("../../../assets/images/info_image3.webp")}
            />

            <Text style={styles.info_slogan}>{languages.info_slogan_3}</Text>

            <LinearGradient
                start={{x:0,y:0}}
                end={{x:1,y:1}} 
                colors={[colors.light_theme_container, colors.theme_container]}
                style={styles.start_button}
            >
                <TouchableOpacity
                    style={{padding:paddings.low}}
                    onPress={startApp}
                >
                    <Text style={styles.start_button_text}>{languages.start}</Text>
                </TouchableOpacity>
            </LinearGradient>
        </>
    };


    return(
        <LinearGradient
            start={{x:0,y:0}}
            end={{x:1,y:1}} 
            colors={PageColors[page - 1]}
            style={styles.container}
        >
            <StatusBar barStyle={"light-content"} backgroundColor={PageColors[page - 1][0]}/>

            {
                renderPage[page]
            }

            <SafeAreaView style={styles.slider_container}>
                {(page === 2 || page === 3 || page === 4) ? 
                    <TouchableOpacity
                        style={styles.prev_button}
                        onPress={prevPage}
                    >
                        <LeftArrowIcon stroke={colors.white_container} strokeWidth={2.5}/>
                    </TouchableOpacity>
                    :
                    null
                }

                <View style={[styles.dot, {backgroundColor:(page === 1) ? colors.third_theme_container : colors.white_container}]}/>
                <View style={[styles.dot, {backgroundColor:(page === 2) ? colors.theme_container : colors.white_container}]}/>
                <View style={[styles.dot, {backgroundColor:(page === 3) ? colors.theme_container : colors.white_container}]}/>
                <View style={[styles.dot, {backgroundColor:(page === 4) ? colors.theme_container : colors.white_container}]}/>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default IntroScreen;