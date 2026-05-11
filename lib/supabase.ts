import "react-native-url-polyfill/auto";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { Platform } from "react-native";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn("Supabase env vars are missing. Using local fallback data.");
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
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        storage: serverSafeStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    })
  : null;
