import { View, Text, StyleSheet } from "react-native";

import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import Colors from "../constants/Colors";

const AddExpenseScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerTab}>
        <Text style={styles.headerText}>Add Expense</Text>
      </View>
      <ExpenseForm mode="add" />
    </View>
  );
};

export default AddExpenseScreen;

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
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
    paddingBottom: 10,
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
  },
  button: {
    backgroundColor: Colors.purple2,
    paddingHorizontal: 18,
    paddingVertical: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
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
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 5,
    paddingHorizontal: 5,
    width: "70%",
  },
  dollarSign: {
    fontSize: 16,
    color: Colors.black,
    paddingLeft: 5,
  },
});
