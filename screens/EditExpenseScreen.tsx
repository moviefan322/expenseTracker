import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/RootStackParamList";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "EditExpense"
>;
type RoutePropType = RouteProp<RootStackParamList, "EditExpense">;

const EditExpenseScreen = () => {
  const route = useRoute<RoutePropType>();
  const navigation = useNavigation<NavigationProp>();
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.headerTab}>
        <Text style={styles.headerText}>Edit Expense</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity>
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
});
