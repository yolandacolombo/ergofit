import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

import { HomeHero } from "./components/HomeHero";
import { WorkoutList } from "./components/WorkoutList";
import { homeColors } from "./constants/colors";
import {
  fallbackWorkouts,
  quickActions,
  userProfile,
} from "./data/home-data";
import { getWorkouts } from "./services/workouts-service";
import { supabase } from "@/lib/supabase";
import type { Workout, UserProfile } from "./types/home";

export function HomeScreen() {
  const [workouts, setWorkouts] = useState<Workout[]>(fallbackWorkouts);
  const [user, setUser] = useState<UserProfile>(userProfile);
  const router = useRouter();

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

    const loadUserProfile = async () => {
      if (!supabase) {
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      const name = session?.user?.user_metadata?.name;
      if (name) {
        setUser((current) => ({
          ...current,
          name,
        }));
      }
    };

    loadUserProfile();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <HomeHero
            user={user}
            actions={quickActions}
            onActionPress={(route: string) => router.push(route as any)}
          />
          <WorkoutList workouts={workouts} onWorkoutPress={() => router.push('/treino' as any)} />
        </ScrollView>
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
