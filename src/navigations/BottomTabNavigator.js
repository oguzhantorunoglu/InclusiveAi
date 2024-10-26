import React from 'react';
import { StyleSheet, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeStack } from "./StackNavigators";
import { HomeIcon } from '../../assets/icons'; 

import { colors } from "../../config";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                keyboardHidesTabBar:true, 
                showLabel:false,
                style:styles.container
            }}  
        >
            <Tab.Screen 
                name='Home' 
                component={HomeStack} 
                options={{ 
                    tabBarVisible:false,                    // gizledik
                    tabBarIcon:({focused}) => (
                        <View style={styles.tab_container}>
                            {(focused) ?
                                <HomeIcon stroke={colors.white_container} fill={colors.white_container} height={33} width={33} strokeWidth={1}/>
                                :
                                <HomeIcon stroke={colors.white_container} fill={colors.theme_container} height={33} width={33} strokeWidth={0.7}/>
                            }
                        </View>
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs;


const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.theme_container, //"#FDFDFD",
        display:"none"                          // gizledik
    },
    tab_container:{
        justifyContent:"center",
        alignItems:"center",
    }
});