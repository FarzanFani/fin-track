import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import SignupScreen from "./src/screens/signupScreen";
import LoginScreen from "./src/screens/loginScreen";
import { NAV_TEXTS, PRIMARY_BLUE, PRIMARY_DARK_BLUE } from "./src/constants/color";
import { createUserTable, getCurrentUserIdInStorage } from "./src/util/database/db";
import { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/HomeScreen";
import { RootBottomTabParamList, RootStackParamList } from "./src/types/navigation";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function App() {
  const [userId, setUserId] = useState<string>();
  const [loading, setLoading] = useState(true);

  const Stack = createStackNavigator<RootStackParamList>();
  const BottomTab = createBottomTabNavigator<RootBottomTabParamList>();

  useEffect(() => {
    async function dbHandler() {
      await createUserTable();
      const id = await getCurrentUserIdInStorage();
      if (id) {
        setUserId(id);
      }
      setLoading(false);
    }
    dbHandler();
  }, [setUserId]);

  function BottomTabNavigator() {
    return (
      <BottomTab.Navigator
        screenOptions={{
          headerTintColor: NAV_TEXTS,
          headerStyle: { backgroundColor: PRIMARY_DARK_BLUE },
          tabBarStyle: { backgroundColor: PRIMARY_DARK_BLUE, height: 45 },
          tabBarLabelStyle: { fontSize: 14, fontWeight: "semibold" },
          tabBarInactiveTintColor: NAV_TEXTS,
          tabBarInactiveBackgroundColor: PRIMARY_DARK_BLUE,
          tabBarActiveBackgroundColor: NAV_TEXTS,
          tabBarActiveTintColor: PRIMARY_DARK_BLUE,
          tabBarShowLabel: false,
        }}
      >
        <BottomTab.Screen
          name="dashboard"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => <Ionicons name="home" size={26} color={color} />,
          }}
        />
        <BottomTab.Screen
          name="transactions"
          component={LoginScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="receipt-sharp" size={24} color={color} />
            ),
          }}
        />
        <BottomTab.Screen
          name="setting"
          component={LoginScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="settings" size={26} color={color} />
            ),
          }}
        />
      </BottomTab.Navigator>
    );
  }

  if (loading) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={userId ? "app" : "login"}
          screenOptions={{
            headerTintColor: NAV_TEXTS,
            headerShown: false,
            cardStyle: { backgroundColor: PRIMARY_BLUE },
          }}
        >
          <Stack.Screen
            name={"login"}
            component={LoginScreen}
            options={{ title: "Login" }}
          />
          <Stack.Screen name={"sign-up"} component={SignupScreen} />
          <Stack.Screen name={"app"} component={BottomTabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({});
