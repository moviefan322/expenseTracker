import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/RootStackParamList";

import Colors from "../constants/Colors";

interface ExpenseItemProps {
  item: {
    item: string;
    date: string;
    amount: number;
  };
}

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "EditExpense"
>;

const ExpenseItem = ({ item }: ExpenseItemProps) => {
  const navigation = useNavigation<NavigationProp>();

  const navigateToEdit = () => {
    navigation.navigate("EditExpense", {
        item: item,
        currentScreen: "AllExpenses",
    });
  };

  return (
    <TouchableOpacity onPress={navigateToEdit} style={styles.expense}>
      <View>
        <Text style={styles.expenseTextTop}>{item.item}</Text>
        <Text style={styles.expenseText}>{item.date}</Text>
      </View>
      <View>
        <Text style={styles.expenseAmt}>${item.amount}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  expense: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: Colors.purple2,
    borderRadius: 5,
    marginBottom: 10,
  },
  expenseTextTop: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  expenseText: {
    color: Colors.white,
  },
  expenseAmt: {
    backgroundColor: Colors.white,
    width: 75,
    textAlign: "center",
    paddingVertical: 12,
    borderRadius: 5,
    color: Colors.purpledark,
    fontWeight: "bold",
    fontSize: 14,
  },
});
