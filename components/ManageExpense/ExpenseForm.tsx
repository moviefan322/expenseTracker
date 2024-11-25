import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { storeExpense, updateExpense as updateBackend } from "../../util/http";
import { addExpense, updateExpense } from "../../store/expenses";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/RootStackParamList";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ExpenseItem } from "../../types/ExpenseItem";

import Input from "./Input";
import Spinner from "../Spinner";
import ErrorOverlay from "../ErrorOverlay";
import Colors from "../../constants/Colors";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ExpenseFormProps {
  mode: "add" | "edit";
  propItem?: ExpenseItem;
}

const ExpenseForm = ({ mode, propItem }: ExpenseFormProps) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp>();
  const [isInvalid, setIsInvalid] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputValues, setInputValues] = useState({
    amount: {
      value: propItem ? propItem.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: propItem ? propItem.date : "",
      isValid: true,
    },
    item: {
      value: propItem ? propItem.item : "",
      isValid: true,
    },
  });

  const inputChangedHandler = (inputIdentifier: string, text: string) => {
    setInputValues((prev) => ({
      ...prev,
      [inputIdentifier]: { value: text, isValid: true },
    }));
  };

  const handleSubmit = async () => {
    const amountIsValid =
      !isNaN(+inputValues.amount.value) && +inputValues.amount.value > 0;

    const dateIsValid = inputValues.date.value.trim().length === 10;
    const descriptionIsValid = inputValues.item.value.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setIsInvalid(true);
      setInputValues((prev) => ({
        amount: {
          value: prev.amount.value,
          isValid: amountIsValid,
        },
        date: {
          value: prev.date.value,
          isValid: dateIsValid,
        },
        item: {
          value: prev.item.value,
          isValid: descriptionIsValid,
        },
      }));
      return;
    }

    if (mode === "add") {
      const expenseItem = {
        item: inputValues.item.value,
        amount: +inputValues.amount.value,
        date: inputValues.date.value,
        id: "",
      };
      const expenseItemNoId = {
        item: inputValues.item.value,
        amount: +inputValues.amount.value,
        date: inputValues.date.value,
      };
      setLoading(true);
      try {
        const firebaseRes = await storeExpense(expenseItemNoId);
        expenseItem.id = firebaseRes.toString();
        dispatch(addExpense(expenseItem));
        navigation.goBack();
      } catch (error: any) {
        setError(error.message);
      }
      setLoading(false);
    } else {
      if (!propItem) {
        return;
      }

      const updatedExpenseItem = {
        id: propItem.id.toString(),
        item: inputValues.item.value,
        amount: +inputValues.amount.value,
        date: inputValues.date.value,
      };
      setLoading(true);
      try {
        await updateBackend(updatedExpenseItem);
        dispatch(
          updateExpense({ id: propItem.id, updatedExpense: updatedExpenseItem })
        );
        navigation.goBack();
      } catch (error: any) {
        setError(error.message);
      }

      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }
  if (error && !loading) {
    return <ErrorOverlay message={error} onConfirm={() => setError(null)} />;
  }
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          label="Amount"
          invalid={!inputValues.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(null, "amount"),
            value: inputValues.amount.value,
          }}
        />
        <Input
          label="Date"
          invalid={!inputValues.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(null, "date"),
            value: inputValues.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputValues.item.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangedHandler.bind(null, "item"),
          value: inputValues.item.value,
          // autoCapitalize: "none",
          // autoCorrect: false,
        }}
      />
      {isInvalid && (
        <Text style={styles.errorText}>
          Please fill out all fields correctly
        </Text>
      )}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.button, { backgroundColor: Colors.purple1 }]}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>
            {mode === "edit" ? "Update" : "Add"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
    fontSize: 16,
  },
});
