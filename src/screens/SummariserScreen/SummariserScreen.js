import React from 'react';
import { SafeAreaView, Text } from 'react-native';

import { useLanguage } from '../../hooks';

import styles from "./SummariserScreen.styles";
import { colors } from '../../../config';

const SummariserScreen = () => {
    const [languages] = useLanguage();

    return(
        <SafeAreaView style={styles.container}>       
            <Text style={styles.text}>{languages.coming_soon}</Text>
        </SafeAreaView>
    );
};

export default SummariserScreen;