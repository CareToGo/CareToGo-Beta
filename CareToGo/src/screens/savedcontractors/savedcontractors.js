import { View, StyleSheet, Text, SafeAreaView } from "react-native";

export default function SavedContractors() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Saved Contrators Screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
