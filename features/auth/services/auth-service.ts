import { supabase, supabaseConfigError } from "@/lib/supabase";

type LoginCredentials = {
  email: string;
  password: string;
};

type SignupCredentials = LoginCredentials & {
  name: string;
  difficulty: string;
  frequency: string;
};

type PhysiotherapistSignupCredentials = LoginCredentials & {
  name: string;
  crefito: string;
  specialty: string;
  state: string;
  clinic?: string;
  phone: string;
};

export async function loginWithEmail({ email, password }: LoginCredentials) {
  if (!supabase) {
    throw new Error(
      supabaseConfigError ?? "Configure as variaveis do Supabase no arquivo .env.",
    );
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: normalizeEmail(email),
    password,
  });

  if (error) {
    throw new Error(getSupabaseErrorMessage(error, "login"));
  }

  return data;
}

function getSupabaseErrorMessage(error: unknown, context?: "login") {
  if (!(error instanceof Error)) {
    return "Nao foi possivel concluir a operacao no Supabase.";
  }

  const details = error as Error & { code?: string; status?: number };

  if (context === "login") {
    if (
      details.code === "invalid_credentials" ||
      error.message.toLowerCase().includes("invalid login credentials")
    ) {
      return "Email ou senha incorretos. Se voce acabou de se cadastrar, confirme se o cadastro foi salvo no Supabase e se o email ja foi confirmado.";
    }

    if (
      details.code === "email_not_confirmed" ||
      error.message.toLowerCase().includes("email not confirmed")
    ) {
      return "Confirme seu email antes de entrar. Verifique a caixa de entrada ou desative a confirmacao de email no painel do Supabase durante o desenvolvimento.";
    }
  }

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
  frequency,
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
        role: "user",
        name: name.trim(),
        physical_difficulty: difficulty.trim(),
        weekly_frequency: frequency.trim(),
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

export async function signupPhysiotherapistWithEmail({
  email,
  name,
  crefito,
  specialty,
  state,
  clinic,
  phone,
  password,
}: PhysiotherapistSignupCredentials) {
  if (!supabase) {
    throw new Error(
      supabaseConfigError ?? "Configure as variaveis do Supabase no arquivo .env.",
    );
  }

  const { data, error } = await supabase.auth.signUp({
    email: normalizeEmail(email),
    password,
    options: {
      data: {
        role: "physiotherapist",
        name: name.trim(),
        crefito: crefito.trim(),
        specialty: specialty.trim(),
        state: state.trim().toUpperCase(),
        clinic: clinic?.trim() ?? "",
        phone: phone.trim(),
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

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}
