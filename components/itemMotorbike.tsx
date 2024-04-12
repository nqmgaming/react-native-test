import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { Image } from "expo-image";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { deleteMotorbike } from "@/redux/actions";
import { router } from "expo-router";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOutDown,
  PinwheelIn,
  StretchInX,
} from "react-native-reanimated";
// @ts-ignore
const ItemMotorbike = ({ item }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    Alert.alert("Delete", "Are you sure you want to delete this motorbike?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
      },
      {
        text: "OK",
        onPress: () => {
          // @ts-ignore
          dispatch(deleteMotorbike(item.id));
          Alert.alert("Delete", "Delete successfully!");
        },
      },
    ]);
  };

  const handleUpdate = () => {
    router.navigate({
      pathname: "home/updateMotorbike",
      params: { ...item },
    });
  };
  return (
    <Animated.View
      entering={FadeInUp.springify()
        .damping(30)
        .mass(5)
        .stiffness(10)
        .overshootClamping(false)
        .restDisplacementThreshold(0.1)
        .restSpeedThreshold(5)}
      style={styles.container}
    >
      <Image style={styles.image} source={item?.hinh_anh_ph31902} />
      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          style={{
            fontSize: 20,
          }}
        >
          Tên xe: {item?.ten_xe_ph31902}
        </Text>
        <Text
          style={{
            fontSize: 16,
          }}
        >
          Giá: {item?.gia_ban_ph31902}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode={"tail"}
          style={{
            fontSize: 16,
          }}
        >
          Mô tả: {item?.mo_ta_ph31902}
        </Text>
        <Text>Màu sắc: {item?.mau_sac_ph31902}</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={handleDelete}>
          <AntDesign name={"delete"} size={24} color={"red"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleUpdate}>
          <AntDesign name={"edit"} size={24} color={"blue"} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginHorizontal: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 60,
  },
});

export default ItemMotorbike;
