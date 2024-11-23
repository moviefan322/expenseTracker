import { StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { addExpense } from "../store/expenses";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/RootStackParamList";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AddExpense"
>;

const AddExpenseButton = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();

  const onPress = () => {
    navigation.navigate("AddExpense");
  };

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name="add-outline" size={28} color={Colors.white} />
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
