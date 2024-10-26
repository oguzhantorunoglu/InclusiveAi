import React, { useState, useEffect } from 'react';

import FlashMessage, { showMessage } from "react-native-flash-message";
import { NavigationContainer } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo'; 
import { Provider } from 'mobx-react'; 

import Tabs from "./navigations/BottomTabNavigator";
import STORE from "./store";
import { InternetControlScreen } from './screens';
import { useLanguage } from './hooks';

let timeOut = null;

const Router = () => {    
    const [noInternet, setNoInternet] = useState(false);

    const [languages] = useLanguage();
    const netinfo = useNetInfo();


    useEffect(() => {
        if(netinfo.isConnected === false){
            showMessage({
                message:languages.no_internet_title,
                description:languages.no_internet_description,
                type:"danger",
                icon:"danger", 
            });   
            
            timeOut = setTimeout(() => {   
                setNoInternet(true);
            }, 10000); 
        }
        else{
            clearTimeout(timeOut);
        }
    }, [netinfo.isConnected]);

    useEffect(() => {
        return() => {
            clearTimeout(timeOut);
        }
    }, []);
    
    
    return(
        <Provider {...STORE}>
            {(noInternet) ? 
                <InternetControlScreen/>
                :
                <NavigationContainer>
                    <Tabs/>

                    <FlashMessage position="top"/>
                </NavigationContainer>
            }
        </Provider>
    );
};

export default Router;