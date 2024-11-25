import { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { removeExpense } from "../../store/expenses";
import { deleteExpense } from "../../util/http";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/RootStackParamList";
import { ExpenseItem } from "../../types/ExpenseItem";

import Spinner from "../Spinner";
import ErrorOverlay from "../ErrorOverlay";
import Colors from "../../constants/Colors";

interface DeleteExpenseProps {
  item: ExpenseItem;
}

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "EditExpense"
>;

const DeleteExpense = ({ item }: DeleteExpenseProps) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteExpense(item.id);
      dispatch(removeExpense({ id: item.id }));
      navigation.goBack();
    } catch (error: any) {
      setError(error.message);
    }
    setLoading(false);
  };

  if (loading) {
    return <Spinner />;
  }
  if (error && !loading) {
    return <ErrorOverlay message={error} onConfirm={() => setError(null)} />;
  }
  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity onPress={handleDelete}>
        <Ionicons name="trash" size={34} color={Colors.red} />
      </TouchableOpacity>
    </View>
  );
};

export default DeleteExpense;

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
