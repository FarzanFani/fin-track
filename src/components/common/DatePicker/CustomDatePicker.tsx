import { Dispatch, useState } from "react";
import { StyleSheet, Pressable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomInput from "../Input/Input";
import { format } from "date-fns";
import { FieldError } from "react-hook-form";

interface Props {
  date?: Date;
  setDate: Dispatch<React.SetStateAction<Date | undefined>>;
  title?: string;
  customFormat?: string;
  customOnChange?: (selectedDate: Date) => void;
  display?: "spinner" | "calendar";
  mode: "date" | "time";
  error?: FieldError;
}

export default function CustomDatePicker(props: Props) {
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [text, setText] = useState("");

  const onChange = (_, selectedDate?: Date) => {
    if (selectedDate) {
      setText(
        format(selectedDate, props.customFormat ? props.customFormat : "MMMM dd, yyyy")
      );
      props.setDate(selectedDate);
      props.customOnChange && props.customOnChange(selectedDate);
    }
    setShowPicker(false);
  };

  return (
    <>
      <Pressable onPress={() => setShowPicker(true)} style={styles.container}>
        <CustomInput
          value={text}
          setValue={() => {}}
          readOnly
          title="Birth Date"
          placeholder="YYYY/MM/DD"
          error={props.error}
        />
      </Pressable>
      {showPicker && (
        <DateTimePicker
          value={props.date ?? new Date()}
          mode={props.mode}
          display="spinner"
          onChange={onChange}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%" },
});
