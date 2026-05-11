import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

import { BottomNavigation } from "./components/BottomNavigation";
import { HomeHero } from "./components/HomeHero";
import { WorkoutList } from "./components/WorkoutList";
import { homeColors } from "./constants/colors";
import {
  bottomNavigationItems,
  fallbackWorkouts,
  quickActions,
  userProfile,
} from "./data/home-data";
import { getWorkouts } from "./services/workouts-service";
import type { Workout } from "./types/home";

export function HomeScreen() {
  const [workouts, setWorkouts] = useState<Workout[]>(fallbackWorkouts);

  useEffect(() => {
    getWorkouts()
      .then((remoteWorkouts) => {
        if (remoteWorkouts.length > 0) {
          setWorkouts(remoteWorkouts);
        }
      })
      .catch(() => {
        setWorkouts(fallbackWorkouts);
      });
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <HomeHero user={userProfile} actions={quickActions} />
          <WorkoutList workouts={workouts} />
        </ScrollView>

        <BottomNavigation items={bottomNavigationItems} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: homeColors.hero,
  },
  container: {
    flex: 1,
    backgroundColor: homeColors.background,
  },
  scrollContent: {
    paddingBottom: 95,
  },
});
