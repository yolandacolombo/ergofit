import { StyleSheet, Text, View } from "react-native";

import { homeColors } from "../constants/colors";
import type { BottomNavigationItem } from "../types/home";

type BottomNavigationProps = {
  items: BottomNavigationItem[];
};

export function BottomNavigation({ items }: BottomNavigationProps) {
  return (
    <View style={styles.bottomNav}>
      {items.map((item) => (
        <View key={item.id} style={styles.navItem}>
          <Text style={styles.navIcon}>{item.icon}</Text>
          <Text style={item.active ? styles.navTextActive : styles.navText}>
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    height: 74,
    backgroundColor: homeColors.white,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#EFEFEF",
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    width: 80,
  },
  navIcon: {
    fontSize: 23,
    color: homeColors.navText,
    marginBottom: 2,
  },
  navText: {
    fontSize: 9,
    color: homeColors.navText,
  },
  navTextActive: {
    fontSize: 9,
    color: homeColors.navTextActive,
  },
});
