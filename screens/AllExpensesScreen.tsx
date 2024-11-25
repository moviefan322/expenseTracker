import { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setExpenses } from "../store/expenses";
import { fetchExpenses } from "../util/http";

import Spinner from "../components/Spinner";
import ErrorOverlay from "../components/ErrorOverlay";
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
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const expenses = useSelector(
    (state: { expenses: ExpenseItem[] }) => state.expenses
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

  const totalExpenses = expenses
    .reduce((acc, item) => acc + item.amount, 0)
    .toFixed(2);

  console.log(expenses);

  if (isFetching) {
    return <Spinner />;
  }
  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={() => setError(null)} />;
  }
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
    paddingBottom: 5,
    backgroundColor: Colors.purple1,
  },
  expensesList: {
    marginTop: 20,
    flex: 1,
  },
});
