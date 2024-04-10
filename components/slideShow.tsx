import React, {useState} from 'react';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import Carousel from "react-native-reanimated-carousel/src/Carousel";

const SlidesShow = () => {
    const width = Dimensions.get('window').width;
    const [activeIndex, setActiveIndex] = useState(0)
    const data = [
        {
            id: "1",
            image: require("../assets/images/anh1.jpeg")
        },
        {
            id: "2",
            image: require("../assets/images/anh2.jpeg")
        },
        {
            id: "3",
            image: require("../assets/images/anh3.jpeg")
        }
    ]
    return (
        <View style={styles.container}>
            <Carousel
                width={width}
                data={data}
                loop={true}
                autoPlay={true}
                renderItem={({item}) => {
                    return (
                        <View>
                            <Image
                                source={item.image}
                                style={{width: width, height: 200,}}
                                resizeMode={'cover'}
                            />
                        </View>
                    )
                }}
                onSnapToItem={(index) => setActiveIndex(index)}
            />
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                {data.map((item, index) => {
                    return (
                        <View key={index} style={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: activeIndex === index ? 'red' : 'black',
                            margin: 5
                        }}/>
                    )
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 220,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default SlidesShow;
