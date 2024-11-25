import { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setExpenses } from "../store/expenses";
import { fetchExpenses } from "../util/http";

import ExpenseTopBar from "../components/ExpenseTopBar";
import ExpenseItem from "../components/ExpenseItem";
import Spinner from "../components/Spinner";
import ErrorOvleray from "../components/ErrorOverlay";
import Colors from "../constants/Colors";
import { ExpenseItem as ExpenseItemType } from "../types/ExpenseItem";

const RecentExpensesScreen = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const expenses = useSelector(
    (state: { expenses: ExpenseItemType[] }) => state.expenses
  );

  useEffect(() => {
    const getExpenses = async () => {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        dispatch(setExpenses(expenses));
      } catch (error: any) {
        setError(error.message);
      }
      setIsFetching(false);
    };

    getExpenses();
  }, []);

  const today = new Date();
  const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  const last7DaysExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= lastWeek && expenseDate <= today;
  });
  const totalExpenses = last7DaysExpenses
    .reduce((acc, item) => acc + item.amount, 0)
    .toFixed(2);

  if (isFetching) {
    return <Spinner />;
  }
  if (error && !isFetching) {
    return <ErrorOvleray message={error} onConfirm={() => setError(null)} />;
  }
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
    paddingBottom: 5,
    backgroundColor: Colors.purple1,
  },
  expensesList: {
    marginTop: 20,
    flex: 1,
  },
});
