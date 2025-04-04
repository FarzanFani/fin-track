import React, { Dispatch, useRef, useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TextStyle,
  ViewStyle,
  Platform,
} from "react-native";
import {
  iNPUT_BG,
  INPUT_PLACEHOLDER,
  PRIMARY_DARK_BLUE,
  TEXT_PRIMARY,
} from "../../../constants/color";
import { FieldError } from "react-hook-form";

interface Props {
  value: string;
  setValue: Dispatch<React.SetStateAction<string>>;
  title?: string;
  placeholder?: string;
  error?: FieldError;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  secureTextEntry?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  titleStyle?: TextStyle;
  readOnly?: boolean;
  returnKeyType?: "next" | "go" | "done" | "send";
  onSubmitEditing?: () => void;
  setNextField?: Dispatch<React.SetStateAction<string>>;
  nextField?: string;
  hasFocus?: boolean;
}

export default function CustomInput({
  value,
  setValue,
  placeholder,
  title,
  error,
  keyboardType = "default",
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  titleStyle,
  readOnly,
  returnKeyType,
  onSubmitEditing,
  nextField,
  setNextField,
  hasFocus,
}: Props) {
  const [focus, setFocus] = useState(false);

  // const nextInputRef = useRef<TextInput | null>(null);

  // const submitHandler = () => {
  //   if (nextField && setNextField) setNextField(nextField);
  // };

  return (
    <View style={[styles.container, containerStyle, error && { marginBottom: 5 }]}>
      {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
      <TextInput
        // ref={nextInputRef}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        value={value}
        onChangeText={(text) => setValue(text)}
        placeholder={placeholder}
        placeholderTextColor={INPUT_PLACEHOLDER}
        style={[
          styles.input,
          inputStyle,
          focus && styles.focusInput,
          error && styles.errorInput,
        ]}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        autoCorrect={false}
        textAlign="left"
        readOnly={readOnly}
        returnKeyType={returnKeyType}
        // onSubmitEditing={submitHandler}
      />
      {error && <Text style={styles.errorText}>{error.message}</Text>}
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
    height: 45,
    borderColor: "rgba(0, 51, 102, 0.4)",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 12,
    fontSize: 17,
    color: TEXT_PRIMARY,
    backgroundColor: iNPUT_BG,
    alignItems: "center",
  },
  errorInput: {
    borderColor: "#ed0723",
    backgroundColor: "#edd5a8",
    borderWidth: 2,
  },
  errorText: {
    color: "red",
    fontSize: 13,
    marginTop: 2,
    marginLeft: 12,
  },
  focusInput: {
    borderColor: PRIMARY_DARK_BLUE, // Change the border color when focused
    borderWidth: 2,
  },
});
