import React, { useState, useEffect } from 'react';
import { ScrollView, View, TouchableOpacity, Text, Linking, Image, FlatList, RefreshControl } from 'react-native';

import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Tts from 'react-native-tts'; 
import Config from "react-native-config";
import * as GoogleGenerativeAI from "@google/generative-ai";

import IntroScreen from "../IntroScreen";
import { LoadingAnimation } from '../../../assets/animations';
import { SoundIcon, ToolsIcon } from '../../../assets/icons';
import { useLanguage, useVoice } from '../../hooks';
import { ReadAloud } from '../../utils';
import { ToolCard } from "../../components/cards";
import { FloatButton } from '../../components/buttons';

import styles from "./HomeScreen.styles";
import { colors } from '../../../config';

// Daily Quote Dynamic (API FETCH)
const Data = [
    {
        image:"https://gallerypng.com/wp-content/uploads/2024/08/nikola-tesla-png-photo-free-download.png",
        text:"I don't care that they stole my idea. I care that they don't have any of their own.",
        owner:"Nikola Tesla",
        url:"https://tr.wikipedia.org/wiki/Nikola_Tesla"
    }
];

const HomeScreen = (props) => {
    const [data, setData] = useState({});
    const [isRefresh, setIsRefresh] = useState(false);
    const [ttsStatus, setTtsStatus] = useState(null);
    const [activeSpeech, setActiveSpeech] = useState(null);
    const [firstLoad, setFirstLoad] = useState(false);
    const [loading, setLoading] = useState(true);

    const [languages] = useLanguage();
    const [text, isListening, setIsListening] = useVoice();

    // Tools Static (NO API)
    const ToolsData = [
        {
            id:1,
            title:languages.my_eyes_title,
            description:languages.my_eyes_descriptipn,
            image:require("../../../assets/images/myeyes.png"),
            theme:[colors.theme_container, colors.second_theme_container],
            screen:"MyEyesScreen",
        },
        {
            id:2,
            title:languages.storyteller_title,
            description:languages.storyteller_description,
            image:require("../../../assets/images/storyteller.png"),
            theme:[colors.second_theme_container, colors.third_theme_container],
            screen:"StorytellerScreen",
        },
        {
            id:3,
            title:languages.summariser_title,
            description:languages.summariser_description,
            image:require("../../../assets/images/summariser.png"),
            theme:[colors.third_theme_container, colors.theme_container],
            screen:"SummariserScreen",
        }
    ];

 
    // CRUD
    const getData = () => {
        // Fetch Api with Current Language
        setData(Data[0]);
        setLoading(false);
    };


    // General Functions
    const navigationShow = () => {
        props.navigation.setOptions({ 
            headerShown:true 
        });
    };

    const navigationHide = () => {
        props.navigation.setOptions({ 
            headerShown:false 
        });
    };

    const firstLoadControl = async () => {
        const control = await AsyncStorage.getItem('@firstLoad');
        if(control === "1"){
            if(!loading){
                navigationShow();
            }
            setFirstLoad(false);

            getData();
        }
        else{
            navigationHide();
            setFirstLoad(true);
        }
    };


    // Gemini
    const askGemini = async (prompt="") => {
        if(prompt){
            try{
                const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(Config.GEMINI_API_KEY);          
                const model = genAI.getGenerativeModel({
                    model:"gemini-1.5-flash",                                    
                    generationConfig: {                                                   
                        candidateCount:1,               
                        maxOutputTokens:20,          
                        temperature:1,
                        topP:0.95,
                        topK:64,
                        responseMimeType:"text/plain"
                    },
                });        
                                              
                const result = await model.generateContent(prompt);                       
                return result.response.text();                                       
            }
            catch(error){
                return "";
            }
        }
    };


    // Use Sound
    const activateSpeech = (text="", speechId=null) => {
        if(ttsStatus === "start" || ttsStatus === "progress"){
            Tts.stop();
        }
        else{
            setActiveSpeech(speechId);
            ReadAloud(text);
        }
    }

    const voiceCommand = async (text="") => {
        let response = "";
        const commandList = [languages.command_go_settings, languages.command_read_daily_quote, languages.command_go_daily_quote, languages.command_go_all_tools, languages.view_all.toLowerCase(), languages.command_go_my_eyes_is_my_ears, languages.command_go_storyteller, languages.command_go_summariser];

        if(!commandList.includes(text.toLowerCase().trim())){
            const prompt = "The user made a voice recording and the text returned as a result of the recording is as follows;\n" +
                            `"${text}"\n` +
                            "The user wants to give a voice command with this voice recording. The list of voice commands are the elements of the following directory and cannot issue other commands.\n" +
                            `commandList = [${languages.command_go_settings + ", " + languages.command_read_daily_quote + ", " + languages.command_go_daily_quote + ", " + languages.command_go_all_tools + ", " + languages.view_all.toLowerCase() + ", " + languages.command_go_my_eyes_is_my_ears + ", " + languages.command_go_storyteller + ", " + languages.command_go_summariser}];\n` + 
                            "The ambient conditions, the device used, or the pronunciation of the person may not be appropriate, or the person may not have said the command exactly the same way. Considering all these, tell me which command in the commandList array the person may have given in the text returned from this audio recording, according to both the structure and the meaning of the text. Send me only the relevant command in the array as output and do not write any other text. If you can't find a similarity or you can't guess it, just write 'empty'.";

            response = await askGemini(prompt);
        }
        else{
            response = text;
        }

        switch(response.toLowerCase().trim()) {
            case languages.command_go_settings:
                activateSpeech(languages.command_go_settings);
                props.navigation.navigate("SettingsScreen");
                break;
            case languages.command_read_daily_quote:
                activateSpeech((data.text + "{delay}" + data.owner), "quote");
                break;
            case languages.command_go_daily_quote:
                activateSpeech(languages.command_go_daily_quote);
                Linking.openURL(data.url);
                break;
            case languages.command_go_all_tools:
            case languages.view_all.toLowerCase():
                activateSpeech(languages.command_go_all_tools);
                goAllToolsPage();
                break;
            case languages.command_go_my_eyes_is_my_ears:
                activateSpeech(languages.command_go_my_eyes_is_my_ears);
                props.navigation.navigate("MyEyesScreen");
                break;
            case languages.command_go_storyteller:
                activateSpeech(languages.command_go_storyteller);
                props.navigation.navigate("StorytellerScreen");
                break;
            case languages.command_go_summariser:
                activateSpeech(languages.command_go_summariser);
                props.navigation.navigate("SummariserScreen");
                break;
            default:
                activateSpeech(languages.dont_understand_error);

                showMessage({
                    message:languages.operation_failed,
                    description:languages.dont_understand_error,
                    type:"info",
                    icon:"info", 
                });  
        }
    };


    // Go Page
    const goAllToolsPage = () => {
        props.navigation.navigate("AllToolsScreen");
    };


    // onRefreshes
    const onRefresh = () => {
        setIsRefresh(true);
        getData();
        setIsRefresh(false);
    };


    // useEffects
    useEffect(() => {
        firstLoadControl();

        Tts.addEventListener('tts-start', () => setTtsStatus("start"));       
        Tts.addEventListener('tts-progress', () => setTtsStatus("progress"));    
        Tts.addEventListener('tts-finish', () => setTtsStatus("finish"));        
        Tts.addEventListener('tts-cancel', () => setTtsStatus("cancel"));
        Tts.addEventListener('tts-pause', () => setTtsStatus("pause"));
        Tts.addEventListener('tts-resume', () => setTtsStatus("resume"));

        return () => {
            setTtsStatus(null);
            Tts.removeEventListener('tts-start'); 
            Tts.removeEventListener('tts-progress'); 
            Tts.removeEventListener('tts-finish'); 
            Tts.removeEventListener('tts-cancel'); 
            Tts.removeEventListener('tts-pause'); 
            Tts.removeEventListener('tts-resume'); 
        };
    }, []);

    useEffect(() => {
        if(loading){
            navigationHide();
        }
        else{
            navigationShow();
        }
    }, [loading]);

    useEffect(() => {
        if(isListening && text){
            voiceCommand(text);
        }
    }, [text]);


    // renderItems
    const renderItem = ({item}) => {
        return(
            <ToolCard
                style={[styles.card, {flexDirection:(item.id % 2 == 0) ? "row-reverse" : "row"}]}
                id={item.id}
                title={item.title}
                description={item.description}
                image={item.image}
                theme={item.theme}
                activeSpeechId={activeSpeech}
                ttsStatus={ttsStatus}
                onPress={() => props.navigation.navigate(item.screen)}
                readAloud={() => activateSpeech((item.title + "{delay}" + item.description), item.id)}
            />
        );
    };


    if(loading && !firstLoad){
        return(<LoadingAnimation/>)
    }
    
    if(firstLoad){
        return(<IntroScreen firstLoadControl={firstLoadControl}/>)
    }
    else{
        const keyExtractor = (item, index) => (item?.id) ? item.id.toString() : index.toString();
        return(
            <>
                <ScrollView 
                    style={styles.container}
                    contentContainerStyle={{paddingBottom:"20%"}}
                >
                    {(Object.keys(data).length > 0) ? 
                        <TouchableOpacity 
                            style={styles.quote}
                            activeOpacity={0.9}
                            onPress={() => Linking.openURL(data.url)}
                        >
                            <Text style={styles.quote_text}>
                                {data.text + "\n\n"}
                                <Text style={styles.owner_text}>{data.owner}</Text>
                            </Text>

                            <Image
                                style={styles.quote_image}
                                resizeMode={"contain"}
                                source={{uri:data.image}}
                            />

                            <TouchableOpacity
                                style={styles.sound}
                                onPress={() => activateSpeech((data.text + "{delay}" + data.owner), "quote")}
                            >
                                <SoundIcon width={28} height={28} stroke={(activeSpeech === "quote" && (ttsStatus === "start" || ttsStatus === "progress")) ? "#76DD78" : colors.white_container} strokeWidth={1.5}/>
                            </TouchableOpacity>
                        </TouchableOpacity>

                        :

                        null
                    }


                    <View style={styles.section}>
                        <View style={styles.header}>
                            <View style={styles.header_left_container}>
                                <ToolsIcon width={25} height={25} fill={colors.white_container}/>
                                <Text style={styles.header_text}>{languages.tools}</Text>
                            </View>

                            <TouchableOpacity onPress={goAllToolsPage}>
                                <Text style={styles.view_all_text}>{languages.view_all}</Text>
                            </TouchableOpacity>
                        </View>
                
                        <FlatList
                            style={styles.flatlist}
                            data={ToolsData}
                            keyExtractor={keyExtractor} 
                            renderItem={renderItem} 
                            horizontal={false}     
                            scrollEnabled={false}                 
                            refreshControl={    
                                <RefreshControl         
                                    refreshing={isRefresh}
                                    onRefresh={onRefresh} 
                                />
                            }
                        />
                    </View>
                </ScrollView>


                <FloatButton 
                    isListening={isListening}
                    onPress={() => setIsListening(!isListening)}
                />
            </>
        );
    }
};

export default HomeScreen;