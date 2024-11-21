import "./gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "./types/RootStackParamList";

import RecentExpensesScreen from "./screens/RecentExpensesScreen";
import AllExpensesScreen from "./screens/AllExpensesScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="RecentExpenses">
          <Stack.Screen
            name="RecentExpenses"
            component={RecentExpensesScreen}
          />
          <Stack.Screen name="AllExpenses" component={AllExpensesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rebeccapurple", // Optional global background
  },
});
