import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignupScreen from "./src/screens/signupScreen";
import LoginScreen from "./src/screens/loginScreen";
import { LOGIN, SIGN_UP } from "./src/constants/screens";
import { NAV_TEXTS, PRIMARY_BLUE } from "./src/constants/color";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: NAV_TEXTS,
            headerShown: false,
            cardStyle: { backgroundColor: PRIMARY_BLUE },
          }}
        >
          <Stack.Screen
            name={LOGIN}
            component={LoginScreen}
            options={{ title: "Login" }}
          />
          <Stack.Screen name={SIGN_UP} component={SignupScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({});
