import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from "react-native";
import CustomInput from "../components/common/Input/Input";
import CustomButton from "../components/common/Button/Button";
import { LOGIN_FORM_BG_BORDER, PRIMARY_DARK_BLUE } from "../constants/color";
import { RootStackParamList } from "../types/navigation";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import CostumeDatePicker from "../components/common/DatePicker/CustomDatePicker";

export default function SignupScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [name, setName] = useState("");

  const onChangeEmail = (text: string) => {
    setEmail(text);
  };
  const onChangePassword = (text: string) => {
    setPassword(text);
  };
  const onChangeName = (text: string) => {
    setName(text);
  };
  const onChangeBirthDate = (text: string) => {
    setBirthDate(text);
  };
  const onChangeConfirmationPassword = (text: string) => {
    setConfirmPassword(text);
  };

  const navigationLogin = () => {
    navigation.replace("login");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={style.screen}>
          <View style={style.formContainer}>
            <Text style={style.titleText}>Sign up</Text>
            <Text style={style.sloganText}>to manage your incomes</Text>
            <CustomInput
              title="Full Name"
              placeholder="your name"
              value={name}
              onChangeText={onChangeName}
            />
            <CustomInput
              title="Birth Date"
              placeholder="your birth date"
              value={name}
              onChangeText={onChangeBirthDate}
            />
            <CustomInput
              title="Email"
              placeholder="example@mail.com"
              keyboardType="email-address"
              value={email}
              onChangeText={onChangeEmail}
            />
            <CustomInput
              title="Password"
              placeholder="Password"
              value={password}
              onChangeText={onChangePassword}
              secureTextEntry
            />
            <CustomInput
              title="Confirm Password"
              placeholder="Confirm your Password"
              value={confirmPassword}
              onChangeText={onChangeConfirmationPassword}
              secureTextEntry
            />
            <CustomButton
              buttonStyle={style.loginButton}
              title="Login"
              onPress={() => {}}
            />
            <CustomButton
              buttonStyle={style.navigationButton}
              textStyle={{ color: PRIMARY_DARK_BLUE }}
              title="Already have an account?"
              onPress={navigationLogin}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    paddingBottom: 20,
    width: "80%",
    borderColor: LOGIN_FORM_BG_BORDER,
    borderWidth: 2,
    backgroundColor: LOGIN_FORM_BG_BORDER,
    borderRadius: 12,
    elevation: 5,
    shadowColor: PRIMARY_DARK_BLUE,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  titleText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: 800,
    marginBottom: 4,
  },
  sloganText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: 400,
    marginBottom: 24,
  },
  loginButton: {
    width: "100%",
    marginTop: 8,
  },
  navigationButton: {
    backgroundColor: LOGIN_FORM_BG_BORDER,
    width: "auto",
    marginTop: 8,
  },
});
