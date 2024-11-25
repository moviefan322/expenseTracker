import { View, Text, StyleSheet, Button } from "react-native";

import Colors from "../constants/Colors";

interface ErrorOverlayProps {
  message: string;
  onConfirm: () => void;
}

const ErrorOverlay = ({ message, onConfirm }: ErrorOverlayProps) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An Error Occured</Text>
      <Text style={styles.text}>{message}</Text>
      <Button title="Close" onPress={onConfirm} />
    </View>
  );
};

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: Colors.purple1,
  },
  text: {
    textAlign: "center",
    marginBottom: 8,
    color: Colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  message: {
    color: Colors.white,
  },
});
