import { StyleSheet, View } from "react-native";

import type { Workout } from "../types/home";
import { WorkoutCard } from "./WorkoutCard";

type WorkoutListProps = {
  workouts: Workout[];
  onWorkoutPress: (workout: Workout) => void;
};

export function WorkoutList({ workouts, onWorkoutPress }: WorkoutListProps) {
  return (
    <View style={styles.cardsArea}>
      {workouts.map((workout) => (
        <WorkoutCard
          key={workout.id}
          workout={workout}
          onPress={() => onWorkoutPress(workout)}
        />
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
