import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addExpense } from "../store/expenses";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/RootStackParamList";

import Colors from "../constants/Colors";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "EditExpense"
>;

const AddExpenseScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp>();
  const today = new Date();

  const [itemName, setItemName] = useState("");
  const [amount, setAmount] = useState("");
  const [year, setYear] = useState(today.getFullYear().toString());
  const [month, setMonth] = useState((today.getMonth() + 1).toString());
  const [day, setDay] = useState(today.getDate().toString());

  const handleAdd = () => {
    const expenseItemToAdd = {
      id: Math.floor(Math.random() * 1000),
      item: itemName,
      amount: +amount,
      date: `${year}-${month}-${day}`,
    };
    dispatch(addExpense({ expense: expenseItemToAdd }));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerTab}>
        <Text style={styles.headerText}>Add Expense</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.button, { backgroundColor: Colors.purple1 }]}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAdd} style={styles.button}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.editForm}>
        <View style={[styles.formRow, { paddingBottom: 10 }]}>
          <Text>Item:</Text>
          <TextInput
            style={styles.formInput}
            value={itemName}
            onChangeText={setItemName}
          />
        </View>
        <View style={[styles.formRow, { paddingBottom: 10 }]}>
          <Text>Amount:</Text>
          <View style={styles.amountInputContainer}>
            <Text style={styles.dollarSign}>$</Text>
            <TextInput
              style={[styles.formInput, { paddingLeft: 3 }]}
              value={amount}
              onChangeText={setAmount}
            />
          </View>
        </View>
        <View style={styles.formRow}>
          <View>
            <Text>Date:</Text>
          </View>
          <View style={styles.dateRow}>
            <TextInput
              style={[styles.dateInput, { width: 60 }]}
              value={year}
              onChangeText={setYear}
            />
            <TextInput
              style={styles.dateInput}
              value={month}
              onChangeText={setMonth}
            />
            <TextInput
              style={styles.dateInput}
              value={day}
              onChangeText={setDay}
            />
          </View>
        </View>
      </View>
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
