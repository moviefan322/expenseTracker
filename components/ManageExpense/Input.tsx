import { View, Text, TextInput, StyleSheet } from "react-native";

import { KeyboardTypeOptions } from "react-native";

import Colors from "../../constants/Colors";

interface TextInputConfig {
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  value: string;
}

interface InputProps {
  label: string;
  textInputConfig: TextInputConfig;
  invalid?: boolean;
}

const Input = ({ label, invalid, textInputConfig }: InputProps) => {
  let inputStyles: {}[] = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View
      style={[
        styles.inputContainer,
        textInputConfig && !textInputConfig.multiline && { flex: 1 },
      ]}
    >
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[inputStyles, invalid && styles.invalidInput]}
        {...textInputConfig}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
    paddingHorizontal: 12,
  },
  label: {
    fontSize: 12,
    color: Colors.white,
    marginBottom: 4,
  },
  input: {
    backgroundColor: Colors.purplepale,
    color: Colors.purpledark,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: "red",
  },
  invalidInput: {
    backgroundColor: "#f9c0c0",
    borderColor: "red",
    borderWidth: 1,
  },
});
