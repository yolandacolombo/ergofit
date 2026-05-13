import { supabase, supabaseConfigError } from "@/lib/supabase";

type LoginCredentials = {
  email: string;
  password: string;
};

type SignupCredentials = LoginCredentials & {
  name: string;
  difficulty: string;
};

export async function loginWithEmail({ email, password }: LoginCredentials) {
  if (!supabase) {
    throw new Error(
      supabaseConfigError ?? "Configure as variaveis do Supabase no arquivo .env.",
    );
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error) {
    throw error;
  }

  return data;
}

function getSupabaseErrorMessage(error: unknown) {
  if (!(error instanceof Error)) {
    return "Nao foi possivel concluir a operacao no Supabase.";
  }

  const details = error as Error & { code?: string; status?: number };
  const metadata = [
    details.code ? `codigo: ${details.code}` : null,
    details.status ? `status: ${details.status}` : null,
  ].filter(Boolean);

  return metadata.length > 0
    ? `${error.message} (${metadata.join(", ")})`
    : error.message;
}

export async function signupWithEmail({
  email,
  name,
  difficulty,
  password,
}: SignupCredentials) {
  if (!supabase) {
    throw new Error(
      supabaseConfigError ?? "Configure as variaveis do Supabase no arquivo .env.",
    );
  }

  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: {
      data: {
        name: name.trim(),
        physical_difficulty: difficulty.trim(),
      },
    },
  });

  if (error) {
    throw new Error(getSupabaseErrorMessage(error));
  }

  if (!data.user) {
    throw new Error("O Supabase nao retornou um usuario para este cadastro.");
  }

  return data;
}
