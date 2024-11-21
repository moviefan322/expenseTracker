import "./gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "./types/RootStackParamList";
import { Ionicons } from "@expo/vector-icons";

import RecentExpensesScreen from "./screens/RecentExpensesScreen";
import AllExpensesScreen from "./screens/AllExpensesScreen";
import AddExpenseButton from "./components/AddExpenseButton";

import Colors from "./constants/Colors";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

export default function App() {
  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.purple2 },
          headerRight: () => (
            <AddExpenseButton />
          ),
          headerTintColor: "white",
          tabBarActiveTintColor: Colors.yellow,
          tabBarStyle: { backgroundColor: Colors.purple2 },
          tabBarLabelStyle: {
            fontSize: 14,
            fontFamily: "Georgia",
            fontWeight: 300,
          },
        }}
      >
        <Tab.Screen
          name="RecentExpenses"
          component={RecentExpensesScreen}
          options={{
            title: "Recent Expenses",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="AllExpenses"
          component={AllExpensesScreen}
          options={{
            title: "All Expenses",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            headerStyle: { backgroundColor: Colors.purple2 },
            headerTintColor: "white",
            contentStyle: {
              backgroundColor: Colors.purple1,
            },
          }}
        >
          <Stack.Screen name="BottomTab" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.purple2, // Optional global background
  },
});
