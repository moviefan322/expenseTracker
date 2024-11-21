import { View, Text, StyleSheet } from "react-native";

import Colors from "../constants/Colors";

interface ExpenseItemProps {
  item: {
    item: string;
    date: string;
    amount: number;
  };
}

const ExpenseItem = ({ item }: ExpenseItemProps) => {
  return (
    <View style={styles.expense}>
      <View>
        <Text style={styles.expenseTextTop}>{item.item}</Text>
        <Text style={styles.expenseText}>{item.date}</Text>
      </View>
      <View>
        <Text style={styles.expenseAmt}>${item.amount}</Text>
      </View>
    </View>
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
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 5,
    color: Colors.purpledark,
    fontWeight: "bold",
    fontSize: 14,
  },
});
