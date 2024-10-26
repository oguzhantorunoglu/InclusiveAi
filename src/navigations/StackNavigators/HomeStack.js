import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen } from "../../screens";
import { Logo, SettingsIcon } from '../../../assets/icons';

import { colors, paddings } from "../../../config";

const Stack = createStackNavigator(); 

const HomeStack = ({navigation}) => {

    const goSettingsPage = () => {
        navigation.navigate("SettingsScreen");
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
    }
});