import React, { useState, useEffect } from 'react';
import { ScrollView, View, TouchableOpacity, Text, Linking, Image, FlatList, RefreshControl } from 'react-native';

import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

import IntroScreen from "../IntroScreen";
import { LoadingAnimation } from '../../../assets/animations';
import { SoundIcon, ToolsIcon } from '../../../assets/icons';
import { useLanguage } from '../../hooks';
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
    const [firstLoad, setFirstLoad] = useState(false);
    const [loading, setLoading] = useState(true);

    const [languages] = useLanguage();

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


    // Use Sound
    const readAloud = (text="") => {
        // içine gönderilen metni sesli oku
    };

    const VoiceCommand = () => {
        // sesli komutlar ile yazıları oku veya toolslara tıkla
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
    }, []);

    useEffect(() => {
        if(loading){
            navigationHide();
        }
        else{
            navigationShow();
        }
    }, [loading]);


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
                onPress={() => props.navigation.navigate(item.screen)}
                readAloud={() => readAloud(item.title + " " + item.description)}
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
                                onPress={() => readAloud(data.text + " " + data.owner)}
                            >
                                <SoundIcon width={28} height={28} stroke={colors.white_container} strokeWidth={1.5}/>
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


                <FloatButton onPress={VoiceCommand}/>
            </>
        );
    }
};

export default HomeScreen;