import { supabase } from "@/lib/supabase";

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
    throw new Error("Configure as variaveis do Supabase no arquivo .env.");
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

export async function signupWithEmail({
  email,
  name,
  difficulty,
  password,
}: SignupCredentials) {
  if (!supabase) {
    throw new Error("Configure as variaveis do Supabase no arquivo .env.");
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
    throw error;
  }

  return data;
}
