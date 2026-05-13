import "react-native-url-polyfill/auto";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { Platform } from "react-native";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

const normalizedSupabaseUrl = supabaseUrl?.trim();
const normalizedSupabaseAnonKey = supabaseAnonKey?.trim();

const isPublicClientKey =
  normalizedSupabaseAnonKey?.startsWith("eyJ") ||
  normalizedSupabaseAnonKey?.startsWith("sb_publishable_");

export const supabaseConfigError = !normalizedSupabaseUrl
  ? "Configure EXPO_PUBLIC_SUPABASE_URL no arquivo .env."
  : !normalizedSupabaseAnonKey
    ? "Configure EXPO_PUBLIC_SUPABASE_ANON_KEY no arquivo .env."
    : normalizedSupabaseAnonKey.startsWith("sb_secret_")
      ? "EXPO_PUBLIC_SUPABASE_ANON_KEY esta usando uma chave secret. Use a anon/public ou publishable key do Supabase."
      : !isPublicClientKey
        ? "EXPO_PUBLIC_SUPABASE_ANON_KEY parece invalida. Confira a anon/public ou publishable key do projeto no Supabase."
        : null;

export const isSupabaseConfigured = supabaseConfigError === null;

if (!isSupabaseConfigured) {
  console.warn(supabaseConfigError);
}

const memoryStorage = new Map<string, string>();

const serverSafeStorage = {
  async getItem(key: string) {
    if (Platform.OS !== "web") {
      return AsyncStorage.getItem(key);
    }

    if (typeof window !== "undefined") {
      return window.localStorage.getItem(key);
    }

    return memoryStorage.get(key) ?? null;
  },
  async setItem(key: string, value: string) {
    if (Platform.OS !== "web") {
      await AsyncStorage.setItem(key, value);
      return;
    }

    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, value);
      return;
    }

    memoryStorage.set(key, value);
  },
  async removeItem(key: string) {
    if (Platform.OS !== "web") {
      await AsyncStorage.removeItem(key);
      return;
    }

    if (typeof window !== "undefined") {
      window.localStorage.removeItem(key);
      return;
    }

    memoryStorage.delete(key);
  },
};

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(normalizedSupabaseUrl!, normalizedSupabaseAnonKey!, {
      auth: {
        storage: serverSafeStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    })
  : null;
