import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { updateMotorbike } from "@/redux/actions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
type Motorbike = {
  ten_xe_ph31902?: string;
  gia_ban_ph31902?: string;
  mo_ta_ph31902?: string;
  mau_sac_ph31902?: string;
  hinh_anh_ph31902?: string;
};
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOutDown,
  PinwheelIn,
  StretchInX,
} from "react-native-reanimated";
const UpdateMotorbikeScreen = () => {
  const [motorbike, setMotorbike] = useState<Motorbike>({});
  const item = useLocalSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (item) {
      setMotorbike(item);
    }
  }, []);

  const handleChange = (field: keyof Motorbike, value: string) => {
    setMotorbike({ ...motorbike, [field]: value });
  };

  const isValidData = (data: Motorbike) => {
    const fields = [
      "ten_xe_ph31902",
      "gia_ban_ph31902",
      "mo_ta_ph31902",
      "mau_sac_ph31902",
      "hinh_anh_ph31902",
    ];
    return fields.every((field) => data[field]);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      // @ts-ignore
      setImage(result.assets[0].uri);
      handleChange("hinh_anh_ph31902", result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Pressable
        onPress={pickImage}
        style={{
          backgroundColor: "gray",
          padding: 10,
          borderRadius: 5,
          marginTop: 10,
        }}
      >
        {image ? (
          <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
        ) : (
          <Image
            source={motorbike?.hinh_anh_ph31902}
            style={{ width: 100, height: 100 }}
          />
        )}
      </Pressable>
      {[
        "ten_xe_ph31902",
        "gia_ban_ph31902",
        "mo_ta_ph31902",
        "mau_sac_ph31902",
      ].map((field, index) => (
        <Animated.View
          entering={FadeInUp.springify().delay(100 * (index + 1))}
          key={index}
        >
          <TextInput
            style={styles.input}
            value={motorbike[field]}
            onChangeText={(value) =>
              handleChange(field as keyof Motorbike, value)
            }
            placeholder={field}
          />
        </Animated.View>
      ))}
      <Animated.View entering={StretchInX.delay(200).randomDelay()}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (isValidData(motorbike)) {
              dispatch(
                updateMotorbike({
                  data: {
                    id: item?.id,
                    motorbike,
                  },
                })
              ).then(() => {
                Alert.alert("Update", "Update motorbike successfully", [
                  {
                    text: "OK",
                    onPress: () => {
                      router.back();
                    },
                  },
                ]);
              });
            } else {
              Alert.alert("Error", "Please fill in all fields");
            }
          }}
        >
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  input: {
    width: 270,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
    marginTop: 10,
  },
  button: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: 270,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default UpdateMotorbikeScreen;
