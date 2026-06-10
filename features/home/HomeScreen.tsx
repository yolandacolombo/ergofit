import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

import { HomeHero } from "./components/HomeHero";
import { WorkoutList } from "./components/WorkoutList";
import { homeColors } from "./constants/colors";
import { getWorkouts } from "./services/workouts-service";
import { getCompletedWorkoutsCount } from "./services/profile-service";
import { supabase } from "@/lib/supabase";

import type {
  Workout,
  UserProfile,
  QuickAction,
} from "./types/home";

const quickActions: QuickAction[] = [
  {
    id: "schedule",
    label: "Agendar consulta online",
    route: "/agendar-consulta",
  },
  {
    id: "search-professionals",
    label: "Procurar fisioterapeutas",
    route: "/fisioterapeutas",
  },
  {
    id: "instant-appointment",
    label: "Realizar consulta agora",
    route: "/consulta-agora",
  },
];

export function HomeScreen() {
  const router = useRouter();

  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const [user, setUser] = useState<UserProfile>({
    name: "Usuário",
    level: "Intermediário",
    completedWorkouts: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const remoteWorkouts = await getWorkouts();
      setWorkouts(remoteWorkouts);

      if (!supabase) {
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      const currentUser = session?.user;

      if (!currentUser) {
        return;
      }

      const completedCount = await getCompletedWorkoutsCount();

      setUser({
        name:
          currentUser.user_metadata?.name ??
          currentUser.email ??
          "Usuário",
        level: "Intermediário",
        completedWorkouts: completedCount,
      });
    } catch (error) {
      console.error("Erro ao carregar dados da home:", error);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <HomeHero
            user={user}
            actions={quickActions}
            onActionPress={(route: string) =>
              router.push(route as any)
            }
          />

          <WorkoutList
            workouts={workouts}
            onWorkoutPress={() =>
              router.push("/treino" as any)
            }
          />
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