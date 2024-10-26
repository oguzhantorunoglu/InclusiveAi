import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage"; 

import languages from '../../languages';

const defaultLanguageCode = 'en';

const useLanguage = () => {
    const [language, setLanguage] = useState(languages[defaultLanguageCode]);


    const loadLanguage = useCallback(async () => {
        try {
            const languageCode = await AsyncStorage.getItem('@language') || defaultLanguageCode;
            setLanguage(languages[languageCode] || languages[defaultLanguageCode]);
        } 
        catch (error) {
            setLanguage(languages[defaultLanguageCode]);
        }
    }, []);

    
    useEffect(() => {
        loadLanguage();
    }, []);


    return [language, loadLanguage];
};


export default useLanguage;