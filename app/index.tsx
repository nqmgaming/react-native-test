import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {router} from "expo-router";

const SplashScreen = () => {
    useEffect(() => {
        const timer = setTimeout(() => {
           router.replace("/home/");
        }, 1);
        return () => clearTimeout(timer);
    }, []);
    return (
        <View style={styles.container}>
            <Text>SplashScreen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SplashScreen;
