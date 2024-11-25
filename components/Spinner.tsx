import { View, ActivityIndicator, StyleSheet } from "react-native";

import Colors from "../constants/Colors";

const Spinner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};

export default Spinner;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: Colors.purple1,
    }
});