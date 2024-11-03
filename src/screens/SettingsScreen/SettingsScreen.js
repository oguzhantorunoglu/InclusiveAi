import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';

import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import RNRestart from 'react-native-restart';

import { Selectbox } from '../../components/others';
import { useLanguage } from '../../hooks';

import styles from "./SettingsScreen.styles";

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

const SettingsScreen = () => {
    const [isRefreshLanguage, setIsRefreshLanguage] = useState(false);
    const [selectedItemLanguage, setSelectedItemLanguage] = useState({});
    const [selectboxLanguage, setSelectboxLanguage] = useState({});
    const [languageData, setLanguageData] = useState([]);

    const [languages, reloadLanguage] = useLanguage();


    // CRUD
    const getData = () => {
        setLanguageData(DataLanguage);
    };


    // Actions
    const saveLanguage = async (item) => {
        if(item?.key){
            await AsyncStorage.setItem('@language', item.key);
            reloadLanguage();
            RNRestart.Restart();
        }
        else{
            showMessage({
                message:languages.selection_error,
                description:languages.select_language_error,
                type:"warning",
                icon:"warning", 
            });  
        }
    };


    // onRefresh
    const onRefreshLanguage = () => {
        setIsRefreshLanguage(true);
        getData();
        setIsRefreshLanguage(false);
    };


    // useEffects
    useEffect(() => {
        getData();
    }, []);

    
    return(
        <ScrollView 
            style={styles.container}
            contentContainerStyle={{paddingBottom:"20%"}}
        >        
            <View style={[styles.section, {gap:6}]}>
                <Text style={styles.section_title}>{languages.preferences}</Text>

                <Selectbox
                    style={styles.selectbox}
                    selectbox_placeholder={languages.change_language}
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
            </View>
        </ScrollView>
    );
};

export default SettingsScreen;