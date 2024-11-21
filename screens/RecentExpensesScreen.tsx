import { View, Text, StyleSheet } from "react-native";

import ExpenseTopBar from "../components/ExpenseTopBar";
import ExpenseItem from "../components/ExpenseItem";
import Colors from "../constants/Colors";

const item = {
  name: "Groceries",
  date: "12/12/2021",
  amount: 18.59,
};

const RecentExpensesScreen = () => {
  return (
    <View style={styles.container}>
      <ExpenseTopBar text={"Last 7 Days"} amount={18.59} />
      <View style={styles.expensesList}>
       <ExpenseItem item={item}/>
      </View>
    </View>
  );
};

export default RecentExpensesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.purple1,
  },
  expensesList: {
    marginVertical: 20,
    flex: 1,
  },
});
