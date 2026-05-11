import { StyleSheet, View } from "react-native";

import type { Workout } from "../types/home";
import { WorkoutCard } from "./WorkoutCard";

type WorkoutListProps = {
  workouts: Workout[];
};

export function WorkoutList({ workouts }: WorkoutListProps) {
  return (
    <View style={styles.cardsArea}>
      {workouts.map((workout) => (
        <WorkoutCard key={workout.id} workout={workout} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  cardsArea: {
    paddingTop: 24,
    alignItems: "center",
  },
});
