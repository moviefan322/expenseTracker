import { View, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import ExpenseTopBar from "../components/ExpenseTopBar";
import ExpenseItem from "../components/ExpenseItem";
import Colors from "../constants/Colors";

interface ExpenseItem {
  id: number;
  item: string;
  date: string;
  amount: number;
}

const AllExpensesScreen = () => {
  const expenses = useSelector(
    (state: { expenses: ExpenseItem[] }) => state.expenses
  );

  const totalExpenses = expenses
    .reduce((acc, item) => acc + item.amount, 0)
    .toFixed(2);

  console.log(expenses);

  return (
    <View style={styles.container}>
      <ExpenseTopBar text={"Total"} amount={totalExpenses} />
      <View style={styles.expensesList}>
        <FlatList
          data={expenses}
          renderItem={({ item }) => <ExpenseItem item={item} />}
        />
      </View>
    </View>
  );
};

export default AllExpensesScreen;

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
