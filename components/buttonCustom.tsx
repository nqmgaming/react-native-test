import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export interface ButtonCustomProps {
    title: string;
    onPress: () => void;
}

const ButtonCustom = (props: ButtonCustomProps) => {
    const {title, onPress} = props;
    return (
        <TouchableOpacity onPress={onPress}>
            <Text>{title}</Text>
        </TouchableOpacity>
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

export default ButtonCustom;
