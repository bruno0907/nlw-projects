import { StyleSheet } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { theme } from "../../assets/theme";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: getBottomSpace() + 16,
    right: 16,
    backgroundColor: theme.colors.brand,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '0, 0, 0, 0.15',    
  }
})