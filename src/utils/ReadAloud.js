import Tts from 'react-native-tts'; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";

import languages from '../../languages';

// Remove Listeners Functions
Tts.addEventListener('tts-start', () => {});       
Tts.addEventListener('tts-progress', () => {});    
Tts.addEventListener('tts-finish', () => {});        
Tts.addEventListener('tts-cancel', () => {});
Tts.addEventListener('tts-pause', () => {});
Tts.addEventListener('tts-resume', () => {});


const LanguageConvertor = {
    tr:"tr-TR",
    en:"en-US",
    it:"it-IT",
    de:"de-DE",
    fr:"fr-FR",
    es:"es-ES"
};

const ReadAloud = async (text="", delay=1500) => {
    const language = await AsyncStorage.getItem('@language');

    Tts.stop();

    if(language !== null){
        Tts.getInitStatus()                              
        .then(() => {
            // Config
            Tts.setDefaultLanguage(LanguageConvertor[language]);                             
            //Tts.setDefaultVoice('com.apple.voice.compact.tr-TR.Yelda');     
            Tts.setDefaultRate(0.3);                                      
            Tts.setDefaultPitch(1.2);                                     
            Tts.setDucking(true);                                           
            Tts.setIgnoreSilentSwitch("ignore");  
            
            // Speak
            const parts = text.split("{delay}");
  
            parts.forEach((part, index) => {
                if (index > 0) {
                    setTimeout(() => {
                        Tts.speak(part.trim());
                    }, delay);
                } 
                else {
                    Tts.speak(part.trim());
                }
            });                                             
        })
        .catch((error) => {
            if(error.code === 'no_engine') {       
                Tts.requestInstallEngine();        
                
                showMessage({
                    message:languages[language].no_tts_engine,
                    description:languages[language].no_tts_engine_description,
                    type:"info",
                    icon:"info", 
                });  
            }   
            else{
                showMessage({
                    message:languages[language].operation_failed,
                    description:languages[language].operation_failed_description,
                    type:"warning",
                    icon:"warning", 
                });  
            }
        });
    }
    else{
        showMessage({
            message:languages["en"].operation_failed,
            description:languages["en"].operation_failed_description,
            type:"warning",
            icon:"warning", 
        }); 
    }
};

export default ReadAloud;