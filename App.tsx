import "./gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { RootStackParamList } from "./types/RootStackParamList";
import { Ionicons } from "@expo/vector-icons";

import RecentExpensesScreen from "./screens/RecentExpensesScreen";
import AllExpensesScreen from "./screens/AllExpensesScreen";
import AddExpenseButton from "./components/AddExpenseButton";
import EditExpenseScreen from "./screens/EditExpenseScreen";
import AddExpenseScreen from "./screens/AddExpenseScreen";

import Colors from "./constants/Colors";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

export default function App() {
  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.purple2 },
          headerRight: () => <AddExpenseButton />,
          headerTintColor: "white",
          tabBarActiveTintColor: Colors.yellow,
          tabBarStyle: { backgroundColor: Colors.purple2, height: 60 },
          tabBarLabelStyle: {
            fontSize: 16,
            fontFamily: "Georgia",
            fontWeight: 500,
          },
          tabBarInactiveTintColor: Colors.gray,
        }}
      >
        <Tab.Screen
          name="RecentExpenses"
          component={RecentExpensesScreen}
          options={{
            title: "Recent Expenses",
            tabBarIcon: ({ color }) => (
              <Ionicons name="hourglass-outline" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="AllExpenses"
          component={AllExpensesScreen}
          options={{
            title: "All Expenses",
            tabBarIcon: ({ color }) => (
              <Ionicons name="calendar" color={color} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Group screenOptions={{ presentation: "card" }}>
              <Stack.Screen
                name="Tabs"
                component={TabNavigator}
                options={{
                  headerShown: false,
                  presentation: "card",
                  animation: "none",
                }}
              />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: "modal" }}>
              <Stack.Screen
                name="EditExpense"
                component={EditExpenseScreen}
                options={{
                  title: "Edit Expense",
                  headerShown: false,
                  presentation: "modal",
                  gestureEnabled: true,
                  animation: "slide_from_bottom",
                }}
              />
              <Stack.Screen
                name="AddExpense"
                component={AddExpenseScreen}
                options={{
                  title: "Add Expense",
                  headerShown: false,
                  presentation: "modal",
                  gestureEnabled: true,
                  animation: "slide_from_bottom",
                }}
              />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.purple2, // Optional global background
  },
});
