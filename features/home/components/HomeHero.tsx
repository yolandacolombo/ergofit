import { StyleSheet, Text, View } from "react-native";

import { homeColors } from "../constants/colors";
import type { QuickAction, UserProfile } from "../types/home";
import { QuickActionButton } from "./QuickActionButton";

type HomeHeroProps = {
  user: UserProfile;
  actions: QuickAction[];
  onActionPress: (route: string) => void;
};

export function HomeHero({ user, actions, onActionPress }: HomeHeroProps) {
  return (
    <View style={styles.hero}>
      <View style={styles.header}>
        <View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userLevel}>{user.level}</Text>
        </View>

        <View style={styles.completedBox}>
          <Text style={styles.medal}>🏅</Text>
          <Text style={styles.completedText}>
            {user.completedWorkouts} treinos{"\n"}realizados
          </Text>
        </View>
      </View>

      {actions.map((action) => (
        <QuickActionButton
          key={action.id}
          action={action}
          onPress={() => onActionPress(action.route)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: homeColors.hero,
    paddingHorizontal: 38,
    paddingTop: 58,
    paddingBottom: 32,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.22,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  userName: {
    fontSize: 42,
    color: "#FFFFFF",
    fontWeight: "800",
  },
  userLevel: {
    color: "#FFFFFF",
    fontSize: 14,
    marginTop: 2,
  },
  completedBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  medal: {
    fontSize: 24,
    marginRight: 6,
  },
  completedText: {
    color: "#FFFFFF",
    fontSize: 13,
    lineHeight: 16,
  },
});
