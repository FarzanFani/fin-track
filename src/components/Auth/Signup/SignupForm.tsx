import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootBottomTabParamList, RootStackParamList } from "../../../types/navigation";
import CustomInput from "../../common/Input/Input";
import CustomDatePicker from "../../common/DatePicker/CustomDatePicker";
import { LOGIN_FORM_BG_BORDER, PRIMARY_DARK_BLUE } from "../../../constants/color";
import CustomButton from "../../common/Button/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { SignupForm } from "../../../types/user";
import { addUserToDatabase, setCurrentUserIdInStorage } from "../../../util/database/db";

export default function SignUpForm() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  // const tabNavigation = useNavigation<BottomTabBarProps<RootBottomTabParamList>>()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthDate, setBirthDate] = useState<Date>();
  const [name, setName] = useState("");

  const navigationLogin = () => {
    navigation.replace("login");
  };

  const emailRules = {
    value:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Email is not Valid",
  };

  const minLenRules = {
    value: 2,
    message: "mot enough characters",
  };

  const { setError, setValue, control, clearErrors, handleSubmit } =
    useForm<SignupForm>();

  useEffect(() => {
    setValue("fullName", name);
    clearErrors("fullName");
  }, [clearErrors, setValue, name]);
  useEffect(() => {
    setValue("date", birthDate ? birthDate.toString() : "");
    clearErrors("date");
  }, [clearErrors, setValue, birthDate]);
  useEffect(() => {
    setValue("email", email);
    clearErrors("email");
  }, [clearErrors, setValue, email]);
  useEffect(() => {
    setValue("password", password);
    clearErrors("password");
  }, [clearErrors, setValue, password]);
  useEffect(() => {
    setValue("confirmPass", confirmPassword);
    clearErrors("confirmPass");
  }, [clearErrors, setValue, confirmPassword]);

  const submitForm = async (data: SignupForm) => {
    if (data.confirmPass !== data.password) {
      setError("confirmPass", { message: "Passwords does not match" });
    }
    const id = await addUserToDatabase(data);
    if (id) {
      await setCurrentUserIdInStorage(id);
    }
    navigation.replace("app");
  };

  const [fieldHasFocus, setFieldHasFocus] = useState("");

  const whatFieldHasFocus = () => {};

  const onSubmitForm = () => {};

  return (
    <>
      <SafeAreaView></SafeAreaView>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={style.screen}>
            <View style={style.formContainer}>
              <Text style={style.titleText}>Sign up</Text>
              <Text style={style.sloganText}>to manage your incomes</Text>
              <Controller
                name="fullName"
                control={control}
                rules={{ required: "This field cannot be empty", minLength: minLenRules }}
                render={({ field, fieldState: { error } }) => (
                  <CustomInput
                    title="Full Name"
                    placeholder="your name"
                    value={name}
                    setValue={setName}
                    error={error}
                    returnKeyType="next"
                    setNextField={setFieldHasFocus}
                    nextField={"email"}
                    hasFocus={field.name === fieldHasFocus}
                  />
                )}
              />
              <Controller
                name="date"
                control={control}
                rules={{ required: "This field cannot be empty" }}
                render={({ fieldState: { error } }) => (
                  <CustomDatePicker
                    date={birthDate}
                    setDate={setBirthDate}
                    mode="date"
                    display="spinner"
                    error={error}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                rules={{ required: "This field cannot be empty", pattern: emailRules }}
                render={({ field, fieldState: { error } }) => (
                  <CustomInput
                    title="Email"
                    placeholder="example@mail.com"
                    keyboardType="email-address"
                    value={email}
                    setValue={setEmail}
                    returnKeyType="next"
                    error={error}
                    setNextField={setFieldHasFocus}
                    nextField={"password"}
                    hasFocus={field.name === fieldHasFocus}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                rules={{ required: "This field cannot be empty" }}
                render={({ fieldState: { error } }) => (
                  <CustomInput
                    title="Password"
                    placeholder="Password"
                    value={password}
                    setValue={setPassword}
                    secureTextEntry
                    error={error}
                    returnKeyType="next"
                  />
                )}
              />
              <Controller
                name="confirmPass"
                control={control}
                rules={{ required: "This field cannot be empty" }}
                render={({ fieldState: { error } }) => (
                  <CustomInput
                    title="Confirm Password"
                    placeholder="Confirm your Password"
                    value={confirmPassword}
                    setValue={setConfirmPassword}
                    secureTextEntry
                    error={error}
                    returnKeyType="done"
                  />
                )}
              />

              <CustomButton
                buttonStyle={style.loginButton}
                title="Login"
                onPress={handleSubmit(submitForm)}
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
    </>
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
    width: "85%",
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
    marginBottom: 20,
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
