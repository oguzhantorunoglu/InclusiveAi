import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, FlatList, RefreshControl, Animated } from 'react-native';

import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Tts from 'react-native-tts'; 
import Config from "react-native-config";
import * as GoogleGenerativeAI from "@google/generative-ai";

import { WritesAnimation } from '../../../assets/animations';
import { MicrophoneIcon } from '../../../assets/icons';
import { useLanguage, useVoice } from '../../hooks';
import { ReadAloud } from '../../utils';
import { ChatInput } from '../../components/inputs';
import { ChatCard } from '../../components/cards';

import styles from "./StorytellerScreen.styles";
import { colors } from '../../../config';

const LanguageConvertor = {
    tr:"Turkish",
    en:"English",
    it:"Italian",
    de:"German",
    fr:"French",
    es:"Spanish"
};

const StorytellerScreen = (props) => {
    const [data, setData] = useState([]);
    const [isRefresh, setIsRefresh] = useState(false);
    const [ageCategory, setAgeCategory] = useState("children");
    const [approach, setApproach] = useState("history");
    const [ttsStatus, setTtsStatus] = useState(null);
    const [activeSpeech, setActiveSpeech] = useState(null);
    const [popup, setPopup] = useState(false);  
    const [popupType, setPopupType] = useState("age"); 
    const [popupData, setPopupData] = useState([]);  
    const [pressScreen, setPressScreen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [languages] = useLanguage();
    const [text, isListening, setIsListening] = useVoice();
    const flatListRef = useRef(null);
    const animationValue = useRef(new Animated.Value(0)).current;

    const ageCategoryConvertor = {
        children:languages.children,
        young:languages.young,
        adult:languages.adult
    };

    const approachConvertor = {
        history:languages.history,
        philosophy:languages.philosophy,
        geography:languages.geography,
        literature:languages.literature,
        art:languages.art
    };

 
    // CRUD
    const getData = async (text="") => {
        if(text){
            // User Message Save     
            let lastId = null;   
            if(data?.length > 0){
                lastId = data.sort((a, b) => a.id - b.id)[data.length - 1].id;
                setData([
                    ...data, 
                    {
                        id:lastId + 1,
                        message:text,
                        isUser:true
                    }
                ]);
            }
            else{
                lastId = 0;
                setData([
                    {
                        id:1,
                        message:text,
                        isUser:true
                    }
                ]);
            }
          
            setLoading(true);

            const language = await AsyncStorage.getItem('@language');
            const prompt = `"${text}"\n` +
                            "Tell a story about this topic. The aim here is to create a text that sticks in the reader's mind. Create such a text so that when it is read, everything will be memorised by the reader.\n" + 
                            "the target audience who will read the story = " + ageCategory + "\n" +
                            `"${approach}"` + " read the story from this point of view.\n" +
                            "The story should include important information that can be asked in exams or related to the subject.\n" +
                            "The most important thing is that the story contains completely true information. There should be no unproven, unrealistic data.\n" +
                            `Tell the story in ${(language !== null) ? LanguageConvertor[language] : "English"}.`;
            const response = await askGemini(prompt, 1000);

            setData((prevData) => {
                return [
                    ...prevData, 
                    {
                        id:lastId + 2,
                        message:response,
                        isUser:false
                    }
                ]
            });

            setLoading(false);
        }
    };

    const getStorage = async () => {
        try{
            const ageCategoryStorage = await AsyncStorage.getItem('@ageCategory');
            const approachStorage = await AsyncStorage.getItem('@approach');
    
            if(ageCategoryStorage !== null){
                setAgeCategory(ageCategoryStorage);
            }
            else{
                setAgeCategory("children");
            }

            if(approachStorage !== null){
                setApproach(approachStorage);
            }
            else{
                setApproach("history");
            }
        }
        catch(error){
            setAgeCategory("children");
            setApproach("history");
        }
    };


    // Gemini
    const askGemini = async (prompt="", token=20) => {
        if(prompt){
            try{
                const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(Config.GEMINI_API_KEY);          
                const model = genAI.getGenerativeModel({
                    model:"gemini-1.5-flash",                                    
                    generationConfig: {                                                   
                        candidateCount:1,               
                        maxOutputTokens:token,          
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
        else{
            return "";
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
        const commandList = [languages.command_go_home, languages.command_go_back, languages.command_select_children, languages.command_select_young, languages.command_select_adult, languages.command_select_history, languages.command_select_philosophy, languages.command_select_geography, languages.command_select_literature, languages.command_select_art, languages.command_read_story];

        if(!commandList.includes(text.toLowerCase().trim())){
            const prompt = "The user made a voice recording and the text returned as a result of the recording is as follows;\n" +
                            `"${text}"\n` +
                            "The user wants to give a voice command with this voice recording. The list of voice commands are the elements of the following directory and cannot issue other commands.\n" +
                            `commandList = ${JSON.stringify(commandList)};\n` + 
                            "The ambient conditions, the device used, or the pronunciation of the person may not be appropriate, or the person may not have said the command exactly the same way. Considering all these, tell me which command in the commandList array the person may have given in the text returned from this audio recording, according to both the structure and the meaning of the text. Send me only the relevant command in the array as output and do not write any other text. If you can't find a similarity or you can't guess it, just write 'empty'.";

            response = await askGemini(prompt);
        }
        else{
            response = text;
        }

        switch(response.toLowerCase().trim()) {
            case languages.command_go_home:
            case languages.command_go_back:
                activateSpeech(languages.command_go_home);
                props.navigation.navigate("HomeScreen");
                break;
            case languages.command_select_children:
                activateSpeech(languages.command_select_children);
                changeAgeCategory("children");
                break;
            case languages.command_select_young:
                activateSpeech(languages.command_select_young);
                changeAgeCategory("young");
                break;
            case languages.command_select_adult:
                activateSpeech(languages.command_select_adult);
                changeAgeCategory("adult");
                break;
            case languages.command_select_history:
                activateSpeech(languages.command_select_history);
                changeApproach("history");
                break;
            case languages.command_select_philosophy:
                activateSpeech(languages.command_select_philosophy);
                changeApproach("philosophy");
                break;
            case languages.command_select_geography:
                activateSpeech(languages.command_select_geography);
                changeApproach("geography");
                break;
            case languages.command_select_literature:
                activateSpeech(languages.command_select_literature);
                changeApproach("literature");
                break;
            case languages.command_select_art:
                activateSpeech(languages.command_select_art);
                changeApproach("art");
                break;
            case languages.command_read_story:
                if(data?.length > 0){
                    const lastData = data.sort((a, b) => a.id - b.id)[data.length - 1];
                    activateSpeech(lastData.message, lastData.id);
                }
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


    // ChatInput
    const handleOutsidePress = () => {
        setPressScreen(!pressScreen);
    };


    // Popup
    const showPopup = (type) => {
        const ageData = [
            {
                id:1,
                text:languages.children,
                key:"children"
            },
            {
                id:2,
                text:languages.young,
                key:"young"
            },
            {
                id:3,
                text:languages.adult,
                key:"adult"
            }
        ];

        const approachData = [
            {
                id:1,
                text:languages.history,
                key:"history"
            },
            {
                id:2,
                text:languages.philosophy,
                key:"philosophy"
            },
            {
                id:3,
                text:languages.geography,
                key:"geography"
            },
            {
                id:4,
                text:languages.literature,
                key:"literature"
            },
            {
                id:5,
                text:languages.art,
                key:"art"
            }
        ];

        setPopupType(type);
        setPopupData((type === "age") ? ageData : approachData);
        setPopup(true);

        Animated.timing(animationValue, {
            toValue:160, 
            duration:300,
            useNativeDriver:false,
        }).start();
    };

    const hidePopup = () => {
        Animated.timing(animationValue, {
            toValue:0, 
            duration:300, 
            useNativeDriver:false,
        }).start();

        setTimeout(() => {
            setPopup(false);
            setPopupData([]);
        }, 300);
    };

    const changeAgeCategory = async (age) => {
        await AsyncStorage.setItem('@ageCategory', age);
        setAgeCategory(age);
        hidePopup();
    };

    const changeApproach = async (approach) => {
        await AsyncStorage.setItem('@approach', approach);
        setApproach(approach);
        hidePopup();
    };


    // onRefreshes
    const onRefresh = () => {
        setIsRefresh(true);
        getData();
        setIsRefresh(false);
    };


    // useEffects
    useEffect(() => {
        getStorage();
        
        let start = Tts.addEventListener('tts-start', () => setTtsStatus("start"));       
        let progress = Tts.addEventListener('tts-progress', () => setTtsStatus("progress"));    
        let finish = Tts.addEventListener('tts-finish', () => setTtsStatus("finish"));        
        let cancel = Tts.addEventListener('tts-cancel', () => setTtsStatus("cancel"));
        let pause = Tts.addEventListener('tts-pause', () => setTtsStatus("pause"));
        let resume = Tts.addEventListener('tts-resume', () => setTtsStatus("resume"));

        return () => {
            setTtsStatus(null);
            start.remove();
            progress.remove();
            finish.remove();
            cancel.remove();
            pause.remove();
            resume.remove();
        };
    }, []);

    useEffect(() => {
        if(isListening && text){
            voiceCommand(text);
        }
    }, [text]);

    useEffect(() => {
        flatListRef.current?.scrollToOffset({animated:true, offset:0});        
    }, [data]);


    // renderItems
    const renderItem = ({item}) => {
        const id = (item?.id || item.id === 0) ? item.id : "";
        const message = (item?.message) ? item.message : "-";

        return(
            <ChatCard
                style={[styles.card, {alignSelf:(item?.isUser) ? "flex-end" : "flex-start"}]}
                id={id}
                message={message}
                isUser={(item?.isUser) ? true : false}
                activeSpeechId={activeSpeech}
                ttsStatus={ttsStatus}
                readAloud={() => activateSpeech(message, id)}
            />
        );
    };

    const renderFooterComponent = () => {
        return(<View style={styles.bottom_space}/>);
    };

    const renderHeaderComponent = () => {
        if(loading){
            return(<WritesAnimation/>);
        }
        else{
            return null;
        }
    };


    const keyExtractor = (item, index) => (item?.id) ? item.id.toString() : index.toString();
    return(
        <View style={styles.container} onTouchStart={handleOutsidePress}>       
            <View style={styles.options_container}>
                <TouchableOpacity 
                    style={styles.option}
                    onPress={() => {(popup) ? hidePopup() : showPopup("age")}}
                >
                    <Text style={styles.option_title}>{languages.age_category}</Text>
                    <Text style={styles.option_value}>{ageCategoryConvertor[ageCategory]}</Text>
                </TouchableOpacity>


                <TouchableOpacity 
                    style={[styles.option, {borderLeftWidth:1}]}
                    onPress={() => {(popup) ? hidePopup() : showPopup("approach")}}
                >
                    <Text style={styles.option_title}>{languages.approach}</Text>
                    <Text style={styles.option_value}>{approachConvertor[approach]}</Text>
                </TouchableOpacity>


                <Animated.View style={[styles.popup, {display:(popup) ? "flex" : "none", height:animationValue}]}>
                    <Text style={styles.option_title}>{(popupType === "age") ? languages.age_category : languages.approach}</Text>

                    <View style={styles.options_list}>
                        {
                            popupData.map((item) => {
                                return(
                                    <TouchableOpacity 
                                        key={item.id}
                                        style={[styles.item, {borderWidth:((popupType === "age" && item.key === ageCategory) || (popupType === "approach" && item.key === approach)) ? 1.5 : 0}]} 
                                        onPress={() => {(popupType === "age") ? changeAgeCategory(item.key) : changeApproach(item.key)}} 
                                    >
                                        <Text style={styles.option_value}>{item.text}</Text>
                                    </TouchableOpacity>
                                );
                            })
                        }
                    </View>
                </Animated.View>


                <TouchableOpacity 
                    style={styles.voice}
                    onPress={() => {
                        setIsListening(!isListening);
                        hidePopup();
                    }}
                >
                    {(isListening) ? 
                        <View style={styles.stop}/>
                        :
                        <MicrophoneIcon stroke={colors.white_container} width={35} height={35} strokeWidth={1.2}/>
                    }
                </TouchableOpacity>
            </View>

            
            {(data?.length > 0) ?
                <FlatList
                    ref={flatListRef}
                    style={styles.flatlist}
                    data={data.sort((a, b) => b.id - a.id)}
                    keyExtractor={keyExtractor} 
                    renderItem={renderItem} 
                    ListFooterComponent={renderFooterComponent}
                    ListHeaderComponent={renderHeaderComponent}
                    onTouchStart={hidePopup}
                    horizontal={false}   
                    inverted={true}               
                    refreshControl={    
                        <RefreshControl         
                            refreshing={isRefresh}
                            onRefresh={onRefresh} 
                        />
                    }
                />

                :

                <View style={styles.empty_container} onTouchStart={hidePopup}>
                    <View style={styles.empty}>
                        <Text style={styles.empty_text}>{languages.storyteller_empty_text}</Text>
                        <View style={styles.triangle}/>
                    </View>
                </View>
            }


            <ChatInput
                loading={loading}
                pressScreen={pressScreen}
                onSubmit={getData}
            />
        </View>
    );
};

export default StorytellerScreen;