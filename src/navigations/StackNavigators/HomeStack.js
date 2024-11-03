import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen, SettingsScreen, StorytellerScreen, MyEyesScreen, SummariserScreen } from "../../screens";
import { Logo, SettingsIcon, LeftArrowIcon } from '../../../assets/icons';
import { useLanguage } from '../../hooks';

import { colors, paddings, fontfamily, fontweight } from "../../../config";

const Stack = createStackNavigator(); 

const HomeStack = ({navigation}) => {
    const [languages] = useLanguage();


    const goHomePage = () => {
        navigation.navigate("HomeScreen");
    };

    const goSettingsPage = () => {
        navigation.navigate("SettingsScreen");
    };

    const goBack = () => {
        navigation.goBack();
    };


    return(
        <Stack.Navigator screenOptions={{gestureEnabled: false}}>
            <Stack.Screen 
                name="HomeScreen" 
                component={HomeScreen}
                options={{   
                    title:null,
                    headerStyle:{shadowColor:'transparent', backgroundColor:colors.theme_container},
                    headerTitleAlign:"center",
                    cardStyle:{backgroundColor:colors.white_container},
                    headerTitle:() => ( 
                        <View style={styles.container}>
                            <Logo/>
                        </View>
                    ),
                    headerRight:() => (
                        <TouchableOpacity 
                            style={styles.right_container}
                            onPress={goSettingsPage}
                        >
                            <SettingsIcon stroke={colors.theme_container} fill={colors.dark_white_container} height={32} width={32} strokeWidth={0.9}/>
                        </TouchableOpacity>
                    )
                }}
            />


            <Stack.Screen 
                name="SettingsScreen" 
                component={SettingsScreen}
                options={{   
                    title:null,
                    headerStyle:{shadowColor:'transparent', backgroundColor:colors.theme_container},
                    headerTitleAlign:"center",
                    cardStyle:{backgroundColor:colors.white_container},
                    headerTitle:() => ( 
                        <View style={styles.container}>
                            <Text style={styles.header}>{languages.settings}</Text>
                        </View>
                    ),
                    headerLeft:() => (
                        <TouchableOpacity 
                            style={styles.left_container}
                            onPress={goHomePage}
                        >
                            <LeftArrowIcon stroke={colors.white_container} height={20} width={20} strokeWidth={2.5}/>
                        </TouchableOpacity>
                    )
                }}
            />


            <Stack.Screen 
                name="StorytellerScreen" 
                component={StorytellerScreen}
                options={{   
                    title:null,
                    headerStyle:{shadowColor:'transparent', backgroundColor:colors.theme_container},
                    headerTitleAlign:"center",
                    cardStyle:{backgroundColor:colors.white_container},
                    headerTitle:() => ( 
                        <TouchableOpacity 
                            style={styles.container}
                            activeOpacity={0.9}
                            onPress={goHomePage}
                        >
                            <Logo/>
                        </TouchableOpacity>
                    ),
                    headerLeft:() => (
                        <TouchableOpacity 
                            style={styles.left_container}
                            onPress={goBack}
                        >
                            <LeftArrowIcon stroke={colors.white_container} height={20} width={20} strokeWidth={2.5}/>
                        </TouchableOpacity>
                    )
                }}
            />


            <Stack.Screen 
                name="MyEyesScreen" 
                component={MyEyesScreen}
                options={{   
                    title:null,
                    headerStyle:{shadowColor:'transparent', backgroundColor:colors.theme_container},
                    headerTitleAlign:"center",
                    cardStyle:{backgroundColor:colors.white_container},
                    headerTitle:() => ( 
                        <TouchableOpacity 
                            style={styles.container}
                            activeOpacity={0.9}
                            onPress={goHomePage}
                        >
                            <Logo/>
                        </TouchableOpacity>
                    ),
                    headerLeft:() => (
                        <TouchableOpacity 
                            style={styles.left_container}
                            onPress={goBack}
                        >
                            <LeftArrowIcon stroke={colors.white_container} height={20} width={20} strokeWidth={2.5}/>
                        </TouchableOpacity>
                    )
                }}
            />


            <Stack.Screen 
                name="SummariserScreen" 
                component={SummariserScreen}
                options={{   
                    title:null,
                    headerStyle:{shadowColor:'transparent', backgroundColor:colors.theme_container},
                    headerTitleAlign:"center",
                    cardStyle:{backgroundColor:colors.white_container},
                    headerTitle:() => ( 
                        <TouchableOpacity 
                            style={styles.container}
                            activeOpacity={0.9}
                            onPress={goHomePage}
                        >
                            <Logo/>
                        </TouchableOpacity>
                    ),
                    headerLeft:() => (
                        <TouchableOpacity 
                            style={styles.left_container}
                            onPress={goBack}
                        >
                            <LeftArrowIcon stroke={colors.white_container} height={20} width={20} strokeWidth={2.5}/>
                        </TouchableOpacity>
                    )
                }}
            />
        </Stack.Navigator>
    );
};

export default HomeStack;


const styles = StyleSheet.create({
    container:{
        width:180,
        justifyContent:"center", 
        alignItems:"center",
    },    
    left_container:{
        padding:paddings.mid,
        justifyContent:"center",
        alignItems:"center",
    },
    right_container:{
        padding:paddings.mid,
        justifyContent:"center",
        alignItems:"center",
    },
    header:{
        fontFamily:fontfamily.first_family,
        fontSize:24,
        fontWeight:fontweight.super_high,
        color:colors.white_text,
        textAlign:"center"
    }
});