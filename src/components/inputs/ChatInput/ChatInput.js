import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

import { showMessage } from "react-native-flash-message";

import { SendIcon } from '../../../../assets/icons';
import { useLanguage } from '../../../hooks';

import styles from "./ChatInput.styles";
import { colors } from '../../../../config';

const ChatInput = ({style={}, loading=false, pressScreen=false, onSubmit=() => {}}) => {
    const [text, setText] = useState("");

    const inputRef = useRef(null);
    const [languages] = useLanguage();


    const onPress = () => {
        if(text){
            onSubmit(text);    
            setText("");        
        }
        else{
            onFocus();

            showMessage({
                message:languages.empty_field,
                description:languages.empty_field_error,
                type:"info",
                icon:"info", 
            }); 
        }
    };

    const onBlur = () => {
        if(inputRef.current) {
            inputRef.current.blur(); 
        }
    };

    const onFocus = () => {
        if(inputRef.current){
            inputRef.current.focus(); 
        }
    };

    const onChangeText = useCallback((value) => {
        setText(value);
    }, []);


    useEffect(() => {
        onBlur();
    }, [pressScreen]);


    return(
        <KeyboardAvoidingView
            style={[styles.container, style]}
            behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
            keyboardVerticalOffset={(Platform.OS === 'ios') ? 70 : 0}
        >
            <TextInput
                ref={inputRef}
                style={styles.input}
                value={text} 
                placeholder={languages.topic}
                placeholderTextColor={"#C8C8CA"}
                onChangeText={onChangeText}
                keyboardType={"default"}
                maxLength={150}
                multiline={true}
                autoCapitalize={"none"}
                autoComplete={"none"}
                autoCorrect={false}
                autoFocus={false}
            />


            <TouchableOpacity
                style={styles.button}
                onPress={onPress}
                disabled={loading}
            >
                <SendIcon width={25} height={25} stroke={colors.second_theme_container} fill={colors.white_container} strokeWidth={0.8}/>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

export default ChatInput;