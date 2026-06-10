import { supabase } from "@/lib/supabase";

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

    const { data, error } = await supabase
      .from("profiles")
      .select("completed_workouts")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      console.error("Erro ao buscar perfil:", error);
      return 0;
    }

    return Number(data?.completed_workouts ?? 0);
  } catch (error) {
    console.error("Erro inesperado:", error);
    return 0;
  }
}

export async function markWorkoutAsCompleted(): Promise<number> {
  if (!supabase) {
    throw new Error("Supabase não inicializado.");
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.error("Erro ao obter usuário:", userError);
    throw new Error("Erro ao verificar autenticação.");
  }

  if (!user) {
    throw new Error("Você precisa estar logado para marcar o treino.");
  }

  const { data: currentProfile, error: fetchError } = await supabase
    .from("profiles")
    .select("completed_workouts")
    .eq("id", user.id)
    .maybeSingle();

  if (fetchError) {
    console.error("Erro ao buscar perfil:", fetchError);
    throw new Error(fetchError.message);
  }

  if (!currentProfile) {
    throw new Error(
      "Perfil não encontrado. Faça logout e login novamente."
    );
  }

  const nextCount = Number(currentProfile.completed_workouts ?? 0) + 1;

  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      completed_workouts: nextCount,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (updateError) {
    console.error("Erro ao atualizar perfil:", updateError);

    throw new Error(
      updateError.message ||
        "Não foi possível atualizar o treino."
    );
  }

  return nextCount;
}