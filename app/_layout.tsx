import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Stack} from "expo-router";
import {Provider} from "react-redux";
import {store} from "@/redux/store";

const _layout = () => {
    return (
        <Provider store={store}>
            <Stack>
                <Stack.Screen name={"index"} options={{headerShown: false}}/>
                <Stack.Screen name={"home/index"} options={{headerShown: false, headerTitle: "Home"}}/>
                <Stack.Screen name={"home/updateMotorbike"} options={{headerShown: true, headerTitle: "Edit Motorbike"}}/>
            </Stack>
        </Provider>
    );
};
export default _layout;
