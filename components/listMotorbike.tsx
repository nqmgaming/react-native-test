import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {FlashList} from "@shopify/flash-list";
import {fetchMotorbikes} from "@/redux/actions";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {RootState} from "@/redux/store";
import ItemMotorbike from "@/components/itemMotorbike";

const FlatListMotorbike = () => {
    const dispatch = useDispatch();
    const listMotorbikes = useSelector((state: RootState) => state.listMotorbike.listMotorbike);

    const fetchMotorbike = async () => {
        // @ts-ignore
        dispatch(fetchMotorbikes());
    };

    useEffect(() => {
        fetchMotorbike();
    }, [dispatch]);

    if (listMotorbikes.length < 1) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Dữ liệu trống
                </Text>
            </View>
        )
    }

    return (
        <FlashList
            data={listMotorbikes}
            renderItem={({item}) => {
                return (
                    <ItemMotorbike item={item}/>
                )
            }}
            estimatedItemSize={37}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default FlatListMotorbike;
