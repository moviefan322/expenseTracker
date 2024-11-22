import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { removeExpense, updateExpense } from "../store/expenses";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/RootStackParamList";
import { Ionicons } from "@expo/vector-icons";
import { ExpenseItem } from "../types/ExpenseItem";

import Colors from "../constants/Colors";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "EditExpense"
>;
type RoutePropType = RouteProp<RootStackParamList, "EditExpense">;

const EditExpenseScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const item: ExpenseItem = route.params.item as ExpenseItem;

  const [itemName, setItemName] = useState(item.item);
  const [amount, setAmount] = useState(item.amount.toString());
  const [year, setYear] = useState(item.date.split("-")[0]);
  const [month, setMonth] = useState(item.date.split("-")[1]);
  const [day, setDay] = useState(item.date.split("-")[2]);

  const handleUpdate = () => {
    const updatedExpenseItem = {
      id: item.id,
      item: itemName,
      amount: +amount,
      date: `${year}-${month}-${day}`,
    };
    dispatch(
      updateExpense({ id: item.id, updatedExpense: updatedExpenseItem })
    );
    navigation.goBack();
  };

  const handleDelete = () => {
    dispatch(removeExpense({ id: item.id }));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerTab}>
        <Text style={styles.headerText}>Edit Expense</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.button, { backgroundColor: Colors.purple1 }]}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleUpdate} style={styles.button}>
          <Text style={styles.buttonText}>Update</Text>
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
          <TextInput
            style={styles.formInput}
            value={amount}
            onChangeText={setAmount}
          />
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
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handleDelete}>
          <Ionicons name="trash" size={34} color={Colors.red} />
        </TouchableOpacity>
      </View>
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
});
