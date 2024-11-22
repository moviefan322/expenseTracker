import { View, Text, StyleSheet } from "react-native";

import Colors from "../constants/Colors";

interface ExpenseTopBarProps {
  text: string;
  amount: number;
}

const ExpenseTopBar = ({ text, amount }: ExpenseTopBarProps) => {
  return (
    <View style={styles.lastDays}>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.amountText}>${amount}</Text>
    </View>
  );
};

export default ExpenseTopBar;

const styles = StyleSheet.create({
  lastDays: {
    backgroundColor: Colors.purplepale,
    borderRadius: 10,
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: Colors.purpledark,
  },
  amountText: {
    fontSize: 18,
    color: Colors.purpledark,
    fontWeight: "bold",
  },
});
