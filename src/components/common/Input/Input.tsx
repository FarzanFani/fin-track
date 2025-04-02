import React from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TextStyle,
  ViewStyle,
  Platform,
} from "react-native";
import { iNPUT_BG, INPUT_PLACEHOLDER, TEXT_PRIMARY } from "../../../constants/color";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  title?: string;
  placeholder?: string;
  error?: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  secureTextEntry?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  titleStyle?: TextStyle;
  readOnly?: boolean;
}

export default function CustomInput({
  value,
  onChangeText,
  placeholder,
  title,
  error,
  keyboardType = "default",
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  titleStyle,
  readOnly,
}: Props) {
  return (
    <View style={[styles.container, containerStyle]}>
      {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={INPUT_PLACEHOLDER}
        style={[styles.input, inputStyle]}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        autoCorrect={false}
        textAlign="left"
        readOnly={readOnly}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    width: "100%",
  },
  title: {
    marginBottom: 4,
    color: "black",
    fontWeight: "800",
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: "rgba(0, 51, 102, 0.4)",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 12,
    fontSize: 16,
    color: TEXT_PRIMARY,
    backgroundColor: iNPUT_BG,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 12,
  },
});
