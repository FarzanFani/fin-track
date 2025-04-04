import React from "react";
import {
  Text,
  Pressable,
  ViewStyle,
  TextStyle,
  StyleSheet,
  Platform,
} from "react-native";
import { BTN_TEXTS, PRIMARY_BTN } from "../../../constants/color";

interface ButtonProps {
  title: string;
  onPress: () => void;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
}

export default function CustomButton({
  title,
  onPress,
  buttonStyle,
  textStyle,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, buttonStyle, pressed && styles.pressed]}
      android_ripple={{ color: "#D3D3D3" }}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: PRIMARY_BTN,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    minWidth: 100,
  },
  text: {
    color: BTN_TEXTS,
    fontSize: 16,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.7,
  },
});
