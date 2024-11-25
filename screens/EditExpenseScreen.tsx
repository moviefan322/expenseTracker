import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/RootStackParamList";
import { ExpenseItem } from "../types/ExpenseItem";

import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import DeleteExpense from "../components/ManageExpense/DeleteExpense";
import Colors from "../constants/Colors";

type RoutePropType = RouteProp<RootStackParamList, "EditExpense">;

const EditExpenseScreen = () => {
  const route = useRoute<RoutePropType>();
  const item: ExpenseItem = route.params.item as ExpenseItem;

  return (
    <View style={styles.container}>
      <View style={styles.headerTab}>
        <Text style={styles.headerText}>Edit Expense</Text>
      </View>
      <ExpenseForm mode="edit" propItem={item} />
      <DeleteExpense item={item} />
    </View>
  );
};

export default EditExpenseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.purple1,
  },
  headerTab: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: Colors.purple2,
  },
  headerText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "bold",
  },
  editForm: {
    width: "70%",
    margin: 20,
    padding: 10,
    backgroundColor: Colors.purplepale,
    borderRadius: 5,
    alignSelf: "center",
  },
  formRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  formInput: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 5,
    width: "70%",
  },
  dateInput: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 5,
    width: 40,
    marginHorizontal: 5,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "72%",
  },
});
