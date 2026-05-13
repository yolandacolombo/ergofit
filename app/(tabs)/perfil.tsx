import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { homeColors } from '@/features/home/constants/colors';
import { supabase } from '@/lib/supabase';

type UserProfileState = {
  name: string;
  email: string;
  physicalDifficulty: string;
  weeklyFrequency: string;
};

export default function ProfileRoute() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfileState>({
    name: 'Usuário',
    email: '---',
    physicalDifficulty: '---',
    weeklyFrequency: '---',
  });

  useEffect(() => {
    const loadProfile = async () => {
      if (!supabase) {
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      const user = session?.user;
      if (!user) {
        router.replace('/login');
        return;
      }

      const metadata = user.user_metadata ?? {};

      setProfile({
        name: metadata.name ?? user.email ?? 'Usuário',
        email: user.email ?? '---',
        physicalDifficulty: metadata.physical_difficulty ?? '---',
        weeklyFrequency: metadata.weekly_frequency ?? '---',
      });
    };

    loadProfile();
  }, [router]);

  async function handleLogout() {
    try {
      await supabase?.auth.signOut();
      router.replace('/login');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Não foi possível deslogar no momento.';
      Alert.alert('Erro ao sair', message);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Perfil</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Nome</Text>
          <Text style={styles.value}>{profile.name}</Text>

          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{profile.email}</Text>

          <Text style={styles.label}>Limitação física</Text>
          <Text style={styles.value}>{profile.physicalDifficulty}</Text>

          <Text style={styles.label}>Frequência semanal desejada</Text>
          <Text style={styles.value}>{profile.weeklyFrequency}</Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: homeColors.background,
  },
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: homeColors.hero,
    marginBottom: 18,
  },
  card: {
    backgroundColor: homeColors.white,
    borderRadius: 18,
    padding: 22,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    gap: 14,
  },
  label: {
    color: '#8C8C8C',
    fontSize: 13,
    textTransform: 'uppercase',
    marginTop: 10,
  },
  logoutButton: {
    marginTop: 28,
    height: 52,
    borderRadius: 18,
    backgroundColor: '#D94B43',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  value: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 6,
  },
});
