import React, {useState} from 'react';
import {
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Modal,
    TextInput,
    Dimensions, KeyboardAvoidingView
} from 'react-native';
import {StatusBar} from "expo-status-bar";
import SlideShow from "@/components/slideShow";
import {AntDesign, MaterialCommunityIcons} from "@expo/vector-icons";
import FlatListMotorbike from "@/components/listMotorbike";
import * as ImagePicker from 'expo-image-picker';
import {Image} from 'expo-image';
import {createMotorbike} from "@/redux/actions";
import {useDispatch} from "react-redux";

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

const HomeScreen = () => {
    const [showModal, setShowModal] = useState(false);
    const [ten_xe_ph31902, setTen_xe_ph31902] = useState("");
    const [gia_ban_ph31902, setGia_ban_ph31902] = useState("");
    const [mo_ta_ph31902, setMo_ta_ph31902] = useState("");
    const [mau_sac_ph31902, setMau_sac_ph31902] = useState("");
    const [image, setImage] = useState(null);
    const dispatch = useDispatch();

    const addMotorbike = async () => {
        if (validateForm()) {
            const data = {
                ten_xe_ph31902,
                gia_ban_ph31902,
                mo_ta_ph31902,
                mau_sac_ph31902,
                hinh_anh_ph31902: image
            };
            // @ts-ignore
            dispatch(createMotorbike(data));
            setShowModal(false);
            resetForm();
        }
    };

    const validateForm = () => {
        if (!ten_xe_ph31902) {
            alert("Tên xe không được để trống");
            return false;
        }
        if (!gia_ban_ph31902) {
            alert("Giá bán không được để trống");
            return false;
        }
        if (!mo_ta_ph31902) {
            alert("Mô tả không được để trống");
            return false;
        }
        if (!mau_sac_ph31902) {
            alert("Màu sắc không được để trống");
            return false;
        }
        if (!image) {
            alert("Hình ảnh không được để trống");
            return false;
        }
        return true;
    }

    const resetForm = () => {
        setTen_xe_ph31902("");
        setGia_ban_ph31902("");
        setMo_ta_ph31902("");
        setMau_sac_ph31902("");
        setImage(null);
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            // @ts-ignore
            setImage(result.assets[0].uri);
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto"/>
            {/* slide show */}
            <SlideShow/>
            {/*list motorbike */}
            <View style={{
                flex: 1,
            }}>
                <Text style={styles.titleModal}>Danh sách xe máy</Text>
                <FlatListMotorbike/>
            </View>
            <Pressable
                onPress={() => setShowModal(true)}
                style={styles.fab}>
                <AntDesign name={"pluscircle"} size={60} color={"red"}/>
            </Pressable>
            <Modal visible={showModal} animationType={"slide"} transparent>
                <KeyboardAvoidingView style={styles.containerModal}>
                    <View style={styles.bgModal}>
                        <View style={styles.containerInput}>
                            <Text style={styles.titleModal}>Thêm xe máy</Text>
                            <Pressable
                                onPress={pickImage}
                                style={styles.buttonSelectImage}>
                                {
                                    image ? <Image source={{uri: image}} style={styles.image}/> :
                                        (
                                            <MaterialCommunityIcons name="image-plus" size={50} color="black"/>
                                        )
                                }
                            </Pressable>
                            <TextInput
                                style={styles.input}
                                placeholder={"Tên xe"}
                                value={ten_xe_ph31902}
                                onChangeText={setTen_xe_ph31902}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder={"Giá bán"}
                                value={gia_ban_ph31902}
                                onChangeText={setGia_ban_ph31902}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder={"Mô tả"}
                                value={mo_ta_ph31902}
                                onChangeText={setMo_ta_ph31902}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder={"Màu sắc"}
                                value={mau_sac_ph31902}
                                onChangeText={setMau_sac_ph31902}
                            />
                            <View style={styles.buttons}>
                                <Pressable
                                    onPress={() => setShowModal(false)}
                                    style={styles.buttonCancel}>
                                    <Text style={styles.titleButton}>Hủy</Text>
                                </Pressable>
                                <Pressable
                                    onPress={addMotorbike}
                                    style={styles.buttonAdd}>
                                    <Text style={styles.titleButton}>Thêm</Text>
                                </Pressable>
                            </View>
                        </View>

                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </SafeAreaView>
    )
        ;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        width: width - 90,
        marginHorizontal: 10
    },
    fab: {
        position: 'absolute',
        bottom: 60,
        right: 30
    },
    containerModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    bgModal: {
        width: '80%',
        height: '50%',
        backgroundColor: '#fff',
        borderRadius: 10

    },
    containerInput: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleModal: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonSelectImage: {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    image: {
        width: 100,
        height: 100
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        gap: 10
    },
    buttonCancel: {
        backgroundColor: 'yellow',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray'
    },
    buttonAdd: {
        backgroundColor: '#55ff2d',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray'
    },
    titleButton: {
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold'
    }
});

export default HomeScreen;
