import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { homeColors } from "../constants/colors";
import type { Workout } from "../types/home";

type WorkoutCardProps = {
  workout: Workout;
};

export function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarIcon}>○</Text>
        </View>

        <Text style={styles.madeBy}>
          Feito por{" "}
          <Text style={styles.professional}>{workout.professional}</Text>
        </Text>

        <View style={styles.crefitoBox}>
          <Text style={styles.crefitoText}>{workout.crefito}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.leftLine} />

        <View style={styles.info}>
          <Text style={styles.infoText}>
            Objetivo: <Text style={styles.infoValue}>{workout.objective}</Text>
          </Text>
          <Text style={styles.infoText}>
            Condição: <Text style={styles.infoValue}>{workout.condition}</Text>
          </Text>
          <Text style={styles.infoText}>
            Duração: <Text style={styles.infoValue}>{workout.duration}</Text>
          </Text>
          <Text style={styles.infoText}>
            Local: <Text style={styles.infoValue}>{workout.location}</Text>
          </Text>
        </View>
      </View>

      <Text style={styles.published}>{workout.published}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "65%",
    minHeight: 132,
    backgroundColor: homeColors.white,
    borderRadius: 10,
    marginBottom: 18,
    padding: 10,
    position: "relative",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 31,
    height: 31,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#9C9C9C",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
  },
  avatarIcon: {
    fontSize: 28,
    color: "#9C9C9C",
    marginTop: -4,
  },
  madeBy: {
    color: homeColors.mutedText,
    fontSize: 13,
    flex: 1,
  },
  professional: {
    fontWeight: "700",
  },
  crefitoBox: {
    backgroundColor: homeColors.hero,
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 2,
    marginLeft: 4,
  },
  crefitoText: {
    color: "#FFFFFF",
    fontSize: 9,
    textAlign: "center",
    lineHeight: 13,
  },
  cardBody: {
    flexDirection: "row",
    marginTop: 12,
    marginLeft: 18,
  },
  leftLine: {
    width: 2,
    backgroundColor: homeColors.line,
    marginRight: 9,
  },
  info: {
    gap: 4,
  },
  infoText: {
    color: homeColors.mutedText,
    fontSize: 11,
  },
  infoValue: {
    color: "#8E8E8E",
    fontWeight: "500",
  },
  published: {
    position: "absolute",
    right: 8,
    bottom: 9,
    color: "#A3A3A3",
    fontSize: 6,
  },
});
