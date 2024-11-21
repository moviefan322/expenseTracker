import { View, FlatList, StyleSheet } from "react-native";

import ExpenseTopBar from "../components/ExpenseTopBar";
import ExpenseItem from "../components/ExpenseItem";
import Colors from "../constants/Colors";
import { expenses } from "../data/expenses";

const AllExpensesScreen = () => {
  return (
    <View style={styles.container}>
      <ExpenseTopBar text={"Total"} amount={18.59} />
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
