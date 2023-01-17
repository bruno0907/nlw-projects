import { ActivityIndicator, View, StyleSheet } from "react-native";

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="#7c3aed" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090a',    
    alignItems: 'center',
    justifyContent: 'center',
  }
});