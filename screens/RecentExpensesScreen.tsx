import { View, Text, StyleSheet } from "react-native";

const RecentExpensesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Recent Expenses</Text>
    </View>
  );
};

export default RecentExpensesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  text: {
    fontSize: 20,
    color: "black",
  },
});
