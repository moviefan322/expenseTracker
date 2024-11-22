import { View, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import ExpenseTopBar from "../components/ExpenseTopBar";
import ExpenseItem from "../components/ExpenseItem";
import Colors from "../constants/Colors";
import { ExpenseItem as ExpenseItemType } from "../types/ExpenseItem";

const item = {
  item: "Groceries",
  date: "12/12/2021",
  amount: 18.59,
};

const RecentExpensesScreen = () => {
  const expenses = useSelector(
    (state: { expenses: ExpenseItemType[] }) => state.expenses
  );

  const today = new Date();
  const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  const last7DaysExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= lastWeek && expenseDate <= today;
  });
  const totalExpenses = last7DaysExpenses
    .reduce((acc, item) => acc + item.amount, 0)
    .toFixed(2);

  return (
    <View style={styles.container}>
      <ExpenseTopBar text={"Last 7 Days"} amount={totalExpenses} />
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
