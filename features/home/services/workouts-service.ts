import { supabase } from "@/lib/supabase";

import type { Workout } from "../types/home";

type WorkoutRow = {
  id: number;
  professional: string;
  objective: string;
  condition: string;
  duration: string;
  location: string;
  crefito: string;
  published: string;
};

export async function getWorkouts(): Promise<Workout[]> {
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("workouts")
    .select(
      "id, professional, objective, condition, duration, location, crefito, published",
    )
    .order("id", { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []).map(mapWorkoutRow);
}

function mapWorkoutRow(row: WorkoutRow): Workout {
  return {
    id: row.id,
    professional: row.professional,
    objective: row.objective,
    condition: row.condition,
    duration: row.duration,
    location: row.location,
    crefito: row.crefito,
    published: row.published,
  };
}
