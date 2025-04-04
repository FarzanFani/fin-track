import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import CustomButton from "../../common/Button/Button";
import { LOGIN_FORM_BG_BORDER, PRIMARY_DARK_BLUE } from "../../../constants/color";
import CustomInput from "../../common/Input/Input";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";

export default function LoginForm() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (text: string) => {
    setEmail(text);
  };
  const onChangePassword = (text: string) => {
    console.log(password, text);
    setPassword(text);
  };

  const navigationSignUp = () => {
    navigation.replace("sign-up");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={style.screen}>
          <View
            style={{
              marginTop: -40,
              width: "85%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../../../assets/icon.png")}
              style={style.logoIcon}
            />
            <View style={style.formContainer}>
              <CustomInput
                title="Email"
                placeholder="example@mail.com"
                keyboardType="email-address"
                value={email}
                setValue={setEmail}
              />
              <CustomInput
                title="Password"
                placeholder="Password"
                value={password}
                setValue={setPassword}
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
                title="Don't have an account?"
                onPress={navigationSignUp}
              />
            </View>
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
    // paddingTop: 90,
  },
  logoIcon: {
    width: "100%",
    // height: 250,
    backgroundColor: "white",
    marginBottom: 12,
  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    paddingVertical: 20,
    width: "100%",
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
  loginButton: {
    width: "100%",
    marginTop: 8,
  },
  navigationButton: {
    backgroundColor: LOGIN_FORM_BG_BORDER,
    width: "auto",
    marginTop: 8,
    elevation: 0,
  },
});
