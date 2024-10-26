import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, TextInput, FlatList, RefreshControl } from 'react-native';

import Modal from "react-native-modalbox"; 

import { DownArrowIcon, UpArrowIcon } from '../../../../assets/icons';

import styles from "./Selectbox.styles";

const Selectbox = ({selectbox_placeholder="Select Item", search_bar_placeholder="Search", empty_list_text="There is no data to choose from.", cancel_button="Cancel", select_button="Select", data=[], style={}, refreshing=false, onRefresh=() => {}, saveSelectedItem=() => {}, selectedItem={}, setSelectedItem=() => {}, selectbox={}, setSelectbox=() => {}}) => {
    const [modalShow, setModalShow] = useState(false);
    const [list, setList] = useState(data);
    

    const openSelectbox = () => {
        setList(data);
        setSelectedItem(selectbox);
        setModalShow(true);
    };

    const closeSelectbox = () => {
        setModalShow(false);
    };

    const selectItem = (item) => {
        setSelectedItem({
            id:(item?.id) ? item?.id : "",
            icon:(item?.icon) ? item?.icon : "",
            text:(item?.text) ? item?.text : "",
            key:(item?.key) ? item?.key : "",
        });
    };

    const saveSelectbox = () => {
        setSelectbox(selectedItem);
        saveSelectedItem(selectedItem);
        closeSelectbox();
    };

    const realSearch = (text) => {
        const filteredList = data.filter((item) => { 
            const searchText = text.toLowerCase();
            const currentText = item.text.toLowerCase(); 

            return currentText.indexOf(searchText) > -1;
        })

        setList(filteredList);
    };


    const renderItem = ({item}) => {
        return(
            <TouchableOpacity 
                style={[styles.item_container, {borderColor:(selectedItem?.key == item?.key) ? "#888888" : "#E1E1E1"}]}
                activeOpacity={0.7}
                onPress={() => selectItem(item)}
            >
                <View style={styles.item}>
                    {(item?.icon) ? 
                        <Image
                            style={styles.icon}
                            resizeMode={"cover"}
                            source={item.icon}
                        />
                        :
                        null
                    }

                    <Text style={styles.text}>{(item?.text) ? item?.text : ""}</Text>
                </View>

                <View style={[styles.radio_button, {borderColor:(selectedItem?.key == item?.key) ? "#888888" : "#E1E1E1"}]}>
                    {(selectedItem?.key == item?.key) ? 
                        <View style={styles.dot}/>
                        :
                        null
                    }
                </View>
            </TouchableOpacity>
        )
    };

    const renderEmpty = () => {
        return(
            <Text style={styles.empty_text}>{empty_list_text}</Text>
        )
    };

    const renderFooter = () => {
        return(
            <View style={{marginBottom:60}}/>
        )
    };

    return(
        <>
            <TouchableOpacity
                style={[styles.selectbox, style]}
                activeOpacity={0.7}
                onPress={openSelectbox}
            >
                <View style={styles.selected_item_area}>
                    {(selectbox?.icon) ? 
                        <Image
                            style={styles.icon}
                            resizeMode={"cover"}
                            source={selectbox.icon}
                        />
                        :
                        null
                    }

                    <Text style={styles.text}>{(selectbox?.text) ? selectbox?.text : selectbox_placeholder}</Text>
                </View>

                {(modalShow) ?
                    <UpArrowIcon/>
                    :
                    <DownArrowIcon/>
                }
            </TouchableOpacity>

            <Modal   
                style={styles.modal}
                isOpen={modalShow}              
                isVisible={false}                  
                animationInTiming={300}            
                animationOutTiming={300}            
                coverScreen={true}                
                swipeToClose={true}  
                backButtonClose={true}     
                backdropPressToClose={false}           
                onClosed={() => closeSelectbox()}      
                onOpened={() => {}}       
                position={"center"}    
                entry={"center"}                                  
                isDisabled={false}                                                   
                //ref={"logoutmodal"}  
                backdrop={true}  
                backdropColor={"gray"}
                backdropOpacity={0.5}
                swipeThreshold={20}
                swipeArea={50} 
            >  

                <SafeAreaView>
                    <View style={styles.container}>
                        <TextInput
                            style={styles.search_bar}
                            //value={search} 
                            onChangeText={(text) => realSearch(text)}
                            placeholder={search_bar_placeholder}
                            placeholderTextColor={"#C5C5C7"}
                            keyboardType={"default"}
                            maxLength={50}
                            autoCapitalize={"none"}
                            autoComplete={"none"}
                            autoCorrect={false}
                            autoFocus={false}
                        />

                        <FlatList
                            style={styles.flatlist}
                            data={list}
                            keyExtractor={(item, index) => index}
                            renderItem={renderItem} 
                            ListEmptyComponent={renderEmpty} 
                            ListFooterComponent={renderFooter}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            refreshControl={ 
                                <RefreshControl                      
                                    refreshing={refreshing}              
                                    onRefresh={onRefresh}                   
                                />    
                            }  
                        />

                        <View style={styles.button_container}>
                            <TouchableOpacity 
                                style={styles.button}
                                onPress={closeSelectbox}
                            >   
                                <Text style={styles.button_text}>{cancel_button}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={styles.border_button}
                                onPress={saveSelectbox}
                            >   
                                <Text style={styles.border_button_text}>{select_button}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </Modal>
        </>
    );
};

export default Selectbox;