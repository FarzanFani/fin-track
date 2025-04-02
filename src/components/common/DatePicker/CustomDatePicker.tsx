import React, { useState } from "react";
import { StyleSheet, View, Text, Button, Pressable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomInput from "../Input/Input";
import BottomModal from "../Modal";

export default function CostumeDatePicker() {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  // Function to handle the date change
  const onChange = (event: any, selectedDate: Date | undefined) => {
    console.log(date);

    const currentDate = selectedDate || date; // if no date is selected, keep the previous date
    setShow(false); // hide the picker
    setDate(currentDate); // set the selected date
  };

  // Function to show the date picker
  const showDatePicker = () => {
    setShow(true); // show the picker when button is pressed
  };

  return (
    <>
      <Pressable
        style={{ width: "100%", backgroundColor: "white", height: 50 }}
        onPress={() => setShow(true)}
      >
        {/* <CustomInput
          value=""
          onChangeText={() => setShow(true)}
          placeholder="Add date"
          title="Birth Date"
          readOnly={true}
        /> */}
      </Pressable>

      {show && <DateTimePicker value={date} mode="date" onChange={onChange} />}
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    marginBottom: 20,
    backgroundColor: "white",
    width: "100%",
    textAlign: "center",
  },
});
