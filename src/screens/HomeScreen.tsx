import { Text, View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { PRIMARY_BLUE } from "../constants/color";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.moneyBox}>
        <Text>Income: ${}</Text>
        <Text>Expense: ${}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  moneyBox: {
    width: "90%",
    backgroundColor: PRIMARY_BLUE,
    borderWidth: 2,
    borderColor: PRIMARY_BLUE,
    borderRadius: 8,
    elevation: 3,
    marginTop: 40,
  },
});
