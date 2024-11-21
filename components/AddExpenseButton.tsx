import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const AddExpenseButton = () => {
  const onPress = () => {
    console.log("Button pressed");
  };

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name="add-outline" size={28} color={Colors.white}/>
    </TouchableOpacity>
  );
};

export default AddExpenseButton;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
