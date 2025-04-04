import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const MonthPicker: React.FC = () => {
  // State to store selected month
  const [selectedMonth, setSelectedMonth] = useState<string>("January");

  // List of months
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Month:</Text>
      <Picker
        selectedValue={selectedMonth}
        onValueChange={(itemValue) => setSelectedMonth(itemValue)}
        style={styles.picker}
      >
        {months.map((month) => (
          <Picker.Item key={month} label={month} value={month} />
        ))}
      </Picker>
      <Text style={styles.selectedMonth}>Selected Month: {selectedMonth}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    width: 250,
    height: 50,
    marginBottom: 20,
  },
  selectedMonth: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default MonthPicker;
