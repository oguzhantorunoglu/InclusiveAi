import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, TouchableOpacity, Text, Linking, Alert } from 'react-native';

import { showMessage } from "react-native-flash-message";
import { Camera, useCameraDevice, useCameraFormat, useCameraPermission, useMicrophonePermission } from 'react-native-vision-camera';  
import { PinchGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';  
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "react-native-config";
import * as GoogleGenerativeAI from "@google/generative-ai";

import { MicrophoneIcon, SummarizerIcon, OpenCameraIcon, CloseCameraIcon, CameraIcon, FlashIcon, ThemeIcon } from '../../../assets/icons';
import { useLanguage, useVoice } from '../../hooks';

import styles from "./MyEyesScreen.styles";
import { colors } from '../../../config';

const LanguageConvertor = {
    tr:"Turkish",
    en:"English",
    it:"Italian",
    de:"German",
    fr:"French",
    es:"Spanish"
};

const MyEyesScreen = () => {
    const [cameraStart, setCameraStart] = useState(true);  
    const [cameraType, setCameraType] = useState('back');    
    const [flash, setFlash] = useState('off');   
    const [zoom, setZoom] = useState(0);
    const [translateTheme, setTranslateTheme] = useState("dark");
    const [speechText, setSpeechText] = useState("");
    const [summarizer, setSummarizer] = useState(true);

    const [languages] = useLanguage();
    const [text, isListening, setIsListening] = useVoice(true);
    const {hasPermission:cameraPermission, requestPermission:requestCameraPermission} = useCameraPermission();             
    const {hasPermission:microphonePermission, requestPermission:requestMicrophonePermission} = useMicrophonePermission(); 
    const device = useCameraDevice(cameraType);             
    const format = useCameraFormat(device, [{photoResolution:'max'}]);
    const cameraRef = useRef(null);
 

    // Permissions
    const openAppSettings = () => {
        Linking.openSettings()
            .catch(() => {
                Alert.alert(languages.dont_access_app_settings);
            });
    };

    const cameraPermissionControl = async () => {
        if(!cameraPermission){
            const permission = await requestCameraPermission();
            if(!permission){
                Alert.alert(
                    languages.camera_permission_title,
                    languages.camera_permission_description,
                    [
                        {text:languages.cancel, style:'cancel'},
                        {text:languages.open_settings, onPress:openAppSettings}
                    ]
                );
            }
        }
    };

    const microphonePermissionControl = async () => {
        if(!microphonePermission){
            const permission = await requestMicrophonePermission();
            if(!permission){
                Alert.alert(
                    languages.microphone_permission_title,
                    languages.microphone_permission_description,
                    [
                        {text:languages.cancel, style:'cancel'},
                        {text:languages.open_settings, onPress:openAppSettings}
                    ]
                );
            }
        }
    };


    // Options
    const cameraFocus = async (tapEvent) => {
        if(cameraRef?.current && tapEvent?.nativeEvent){
            const { locationX, locationY } = tapEvent.nativeEvent;
            await cameraRef.current.focus({x:locationX, y:locationY});     
        }
    };

    const handlePinch = (event) => {
        const scale = event.nativeEvent.scale;
        const newZoom = Math.min(Math.max(zoom * scale, 0), 1); 
        setZoom(newZoom);
    };

    const changeCameraType = () => {
        setCameraStart(false);
        setCameraType((cameraType === "back") ? "front" : "back");
        setTimeout(() => {
            setCameraStart(true); 
        }, 1000);  
    };

    const changeFlash = () => {
        setFlash((flash === "off") ? "on" : "off");
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
                        maxOutputTokens:200,          
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


    const speechToText = async (text="") => {
        if(summarizer){
            const language = await AsyncStorage.getItem('@language');
            const prompt = "Step 1: Read the following text.\n" +
                            `"${text}"\n` +
                            "Step 2: Summarise this text for me, but do not lose any information when summarising. Unnecessary sentences can be omitted, repeated parts can be shown only once or irrelevant parts can be omitted.\n" + 
                            "Step 3: Correct any ambiguities or spelling mistakes in this text.\n" +
                            "Step 4: If you have done all these steps correctly, send me the resulting text. If there is an error, just send me the word ‘empty’.\n" +
                            `The language of this text will be ${(language !== null) ? LanguageConvertor[language] : "English"}.`; 

            const response = await askGemini(prompt);
            if(response.trim() !== "empty"){
                setSpeechText(response);
            }
            else{
                setSpeechText(text);
            }
        }
        else{
            setSpeechText(text);
        }
    };


    const onError = useCallback((error) => {
        setCameraStart(false);

        showMessage({
            message:languages.operation_failed,
            description:languages.operation_failed_description,
            type:"warning",
            icon:"warning", 
        });  
    }, []);


    // useEffects
    useEffect(() => {
        if(isListening && text){
            speechToText(text);
        }
    }, [text]);

    useEffect(() => {
        cameraPermissionControl();              
        microphonePermissionControl();

        return () => {
            setCameraStart(false);        
        };
    }, []);


    if(!cameraPermission || !microphonePermission || device == null || !cameraStart){
        return(
            <View style={styles.container}>
                <View style={styles.options_container}>
                    <TouchableOpacity 
                        style={[styles.option, {opacity:((summarizer) ? 1 : 0.5)}]}
                        onPress={() => setSummarizer(!summarizer)}
                    >
                        <SummarizerIcon fill={colors.white_container} width={18} height={18}/>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.option}
                        onPress={() => setIsListening(!isListening)}
                    >
                        {(isListening) ? 
                            <View style={styles.stop}/>
                            :
                            <MicrophoneIcon stroke={colors.white_container} width={20} height={20} strokeWidth={1.2}/>
                        }
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.option}
                        onPress={() => setCameraStart(true)}
                    >
                        <OpenCameraIcon stroke={colors.white_container} width={22} height={22}/>
                    </TouchableOpacity>
                </View>

                {(speechText) ? 
                    <View style={styles.translate_container}>
                        <Text style={styles.translate}>{speechText}</Text>
                    </View>
                    :
                    null
                }
            </View>
        );
    }   

    return(
        <GestureHandlerRootView>
            <PinchGestureHandler onGestureEvent={handlePinch}>
                <View style={styles.container}>
                    <Camera
                        ref={cameraRef}                        
                        style={styles.camera}        
                        device={device}                        
                        isActive={cameraStart}                  
                        format={format}            
                        resizeMode={"cover"}                                             
                        photo={false}   
                        photoHdr={false}                          
                        photoQualityBalance={"speed"}    
                        isMirrored={false}                                 
                        exposure={0}   
                        video={false}  
                        videoHdr={false}  
                        videoStabilizationMode={"auto"} 
                        audio={false}  
                        preview={true}   
                        androidPreviewViewType={"texture-view"}
                        flash={flash}   
                        outputOrientation={"preview"}                  
                        onError={onError}    
                        onPreviewStarted={() => setCameraStart(true)}
                        onPreviewStopped={() => setCameraStart(false)}          
                        onInitialized={() => setCameraStart(true)}   
                        onTouchStart={cameraFocus}               
                    /> 


                    <View style={styles.options_container}>
                        <TouchableOpacity 
                            style={[styles.option, {opacity:((flash === "on") ? 1 : 0.5)}]}
                            onPress={changeFlash}
                        >
                            <FlashIcon stroke={colors.white_container} width={20} height={20}/>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.option, {opacity:(translateTheme === "dark") ? 0.5 : 1}]}
                            onPress={() => setTranslateTheme((translateTheme === "dark") ? "light" : "dark")}
                        >
                            <ThemeIcon stroke={colors.white_container} width={20} height={20}/>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.option, {opacity:((summarizer) ? 1 : 0.5)}]}
                            onPress={() => setSummarizer(!summarizer)}
                        >
                            <SummarizerIcon fill={colors.white_container} width={18} height={18}/>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.option}
                            onPress={() => setIsListening(!isListening)}
                        >
                            {(isListening) ? 
                                <View style={styles.stop}/>
                                :
                                <MicrophoneIcon stroke={colors.white_container} width={20} height={20} strokeWidth={1.2}/>
                            }
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.option}
                            onPress={changeCameraType}
                        >
                            <CameraIcon stroke={colors.white_container} width={22} height={22}/>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.option}
                            onPress={() => setCameraStart(false)}
                        >
                            <CloseCameraIcon stroke={colors.white_container} width={22} height={22}/>
                        </TouchableOpacity>
                    </View>


                    {(speechText) ? 
                        <View style={[styles.translate_container, {backgroundColor:(translateTheme === "dark") ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)"}]}>
                            <Text style={[styles.translate, {color:(translateTheme === "dark") ? "white" : "black"}]}>{speechText}</Text>
                        </View>
                        :
                        null
                    }
                </View>
            </PinchGestureHandler>
        </GestureHandlerRootView>
    );
};

export default MyEyesScreen;