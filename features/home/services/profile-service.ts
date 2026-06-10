import { supabase } from "@/lib/supabase";

export type WorkoutHistoryEntry = {
  completedAt: string;
  objective: string;
  professional: string;
};

export type ProgressData = {
  totalCompleted: number;
  monthlyCompleted: number;
  history: WorkoutHistoryEntry[];
};

export async function getCompletedWorkoutsCount(): Promise<number> {
  if (!supabase) {
    return 0;
  }

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return 0;
    }

    const { count, error } = await supabase
      .from("workout_completions")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    if (error) {
      console.error("Erro ao buscar treinos concluídos:", error);
      return 0;
    }

    return count ?? 0;
  } catch (error) {
    console.error("Erro inesperado:", error);
    return 0;
  }
}

export async function getProgressData(): Promise<ProgressData> {
  if (!supabase) {
    return { totalCompleted: 0, monthlyCompleted: 0, history: [] };
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { totalCompleted: 0, monthlyCompleted: 0, history: [] };
  }

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [totalResult, monthlyResult, historyResult] = await Promise.all([
    supabase
      .from("workout_completions")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id),

    supabase
      .from("workout_completions")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .gte("completed_at", startOfMonth.toISOString()),

    supabase
      .from("workout_completions")
      .select("completed_at, workouts(objective, professional)")
      .eq("user_id", user.id)
      .order("completed_at", { ascending: false })
      .limit(10),
  ]);

  const history: WorkoutHistoryEntry[] = (historyResult.data ?? []).map(
    (row: any) => ({
      completedAt: row.completed_at,
      objective: row.workouts?.objective ?? "Treino",
      professional: row.workouts?.professional ?? "",
    })
  );

  return {
    totalCompleted: totalResult.count ?? 0,
    monthlyCompleted: monthlyResult.count ?? 0,
    history,
  };
}

export async function isWorkoutCompleted(workoutId: number): Promise<boolean> {
  if (!supabase) {
    return false;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return false;
  }

  const { count } = await supabase
    .from("workout_completions")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("workout_id", workoutId);

  return (count ?? 0) > 0;
}

export async function markWorkoutAsCompleted(workoutId: number): Promise<void> {
  if (!supabase) {
    throw new Error("Supabase não inicializado.");
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw new Error("Erro ao verificar autenticação.");
  }

  if (!user) {
    throw new Error("Você precisa estar logado para marcar o treino.");
  }

  const { error } = await supabase.from("workout_completions").insert({
    user_id: user.id,
    workout_id: workoutId,
  });

  if (error) {
    console.error("Erro ao registrar conclusão:", error);
    throw new Error(error.message || "Não foi possível registrar o treino.");
  }
}
