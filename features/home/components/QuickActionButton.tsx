import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { homeColors } from "../constants/colors";
import type { QuickAction } from "../types/home";

type QuickActionButtonProps = {
  action: QuickAction;
  onPress: () => void;
};

export function QuickActionButton({ action, onPress }: QuickActionButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{action.label}</Text>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: homeColors.button,
    height: 49,
    borderRadius: 9,
    paddingHorizontal: 14,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  arrow: {
    color: "#FFFFFF",
    fontSize: 36,
    marginTop: -4,
    fontWeight: "300",
  },
});
