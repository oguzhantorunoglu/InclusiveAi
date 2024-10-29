import { useState, useEffect } from 'react';
import { Platform, Vibration } from 'react-native';

import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import Voice from '@react-native-voice/voice';

import { useLanguage } from '.';

const LanguageConvertor = {
    tr:"tr-TR",
    en:"en-US",
    it:"it-IT",
    de:"de-DE",
    fr:"fr-FR",
    es:"es-ES"
};

let debounceTimeout;

const useVoice = () => {
    const [text, setText] = useState(""); 
    const [isListening, setIsListening] = useState(false);

    const [languages] = useLanguage();


    const startListening = async () => {
        try{
            const isSupported = await getSpeechRecognitionList();
            if(isSupported){
                const language = await AsyncStorage.getItem('@language');
                if(language !== null){
                    const voiceStatus = await Voice.isAvailable();      
                    if(voiceStatus){
                        await Voice.start(LanguageConvertor[language]);   
                        setIsListening(true);  
                        Vibration.vibrate(100);        
                    }
                    else{
                        throw new Error("Error!");
                    }
                }
                else{
                    throw new Error("Error!");
                }
            }
            else{
                throw new Error("Error!");
            }
        } 
        catch(error){
            setText("");
            setIsListening(false);
            Vibration.vibrate(100);

            showMessage({
                message:languages.unsupported_voice_system,
                description:languages.unsupported_voice_system_description,
                type:"warning",
                icon:"warning", 
            });            
        }
    };

    const stopListening = async () => {
        try{
            await Voice.stop();  
            setText("");                
            setIsListening(false);    
            Vibration.vibrate(100);     
        } 
        catch(error){
            await Voice.cancel();  
            setText("");
            setIsListening(false);
            Vibration.vibrate(100);

            showMessage({
                message:languages.unsupported_voice_system,
                description:languages.unsupported_voice_system_description,
                type:"warning",
                icon:"warning", 
            });            
        }
    };

    const voiceProgressControl = async () => { 
        try{
            const isRecognizing = await Voice.isRecognizing();          
            if(!isRecognizing){
                setIsListening(false);     
            }  
        }  
        catch(error){
            setIsListening(false);
        } 
    };

    const getSpeechRecognitionList = async () => {
        if(Platform.OS === "android"){
            const list = await Voice.getSpeechRecognitionServices(); 
            return list.length > 0;
        }
        else{
            return true;
        }
    };

    
    useEffect(() => {
        if(isListening){
            startListening();
        }
        else{
            stopListening();
        }
    }, [isListening]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if(isListening){
                voiceProgressControl();
            }
        }, 30000); 
    
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        Voice.onSpeechResults = (response) => {  
            clearTimeout(debounceTimeout);     
            
            debounceTimeout = setTimeout(() => {
                stopListening();
                setText(response.value[0]);
            }, 1500);
        };
        
        Voice.onSpeechError = (response) => {
            if(response.error.code !== "recognition_fail"){
                stopListening();  

                showMessage({
                    message:languages.operation_failed,
                    description:languages.operation_failed_description,
                    type:"warning",
                    icon:"warning", 
                });  
            }
        };        

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);     
        };
    }, []);


    return [text, isListening, setIsListening];
};


export default useVoice;