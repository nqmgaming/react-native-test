import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
export interface TextInputCustomProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
}

const TextInputCustom = (props: TextInputCustomProps) => {
  const { value, onChangeText, placeholder } = props;
  return (
    <TextInput
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      style={{
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        width: 200,
        margin: 5,
        padding: 5,
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TextInputCustom;
