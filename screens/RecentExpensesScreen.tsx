import { View, FlatList, StyleSheet } from "react-native";

import ExpenseTopBar from "../components/ExpenseTopBar";
import ExpenseItem from "../components/ExpenseItem";
import Colors from "../constants/Colors";
import { expenses } from "../data/expenses";

const item = {
  item: "Groceries",
  date: "12/12/2021",
  amount: 18.59,
};

const RecentExpensesScreen = () => {
  const today = new Date();
  const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  const last7DaysExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= lastWeek && expenseDate <= today;
  });

  return (
    <View style={styles.container}>
      <ExpenseTopBar text={"Last 7 Days"} amount={18.59} />
      <View style={styles.expensesList}>
        <FlatList
          data={last7DaysExpenses}
          renderItem={({ item }) => <ExpenseItem item={item} />}
        />
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
