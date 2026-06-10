import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { homeColors } from '@/features/home/constants/colors';
import { supabase } from '@/lib/supabase';

type Physiotherapist = {
  id: number;
  name: string;
  crefito: string;
  available: boolean;
};

export default function QuickAppointmentRoute() {
  const [professionals, setProfessionals] = useState<Physiotherapist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfessionals();
  }, []);

  async function loadProfessionals() {
    try {
      const { data, error } = await supabase
        .from('physiotherapists')
        .select('id, name, crefito, available')
        .eq('available', true)
        .order('rating', { ascending: false });

      if (error) {
        throw error;
      }

      setProfessionals(data ?? []);
    } catch (error) {
      console.error('Erro ao carregar fisioterapeutas:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Realizar consulta agora</Text>

        <Text style={styles.subtitle}>
          Profissionais disponíveis neste momento para atendimento imediato.
        </Text>

        {loading ? (
          <Text style={styles.message}>Carregando profissionais...</Text>
        ) : professionals.length === 0 ? (
          <Text style={styles.message}>
            Nenhum profissional disponível no momento.
          </Text>
        ) : (
          professionals.map((professional) => (
            <View key={professional.id} style={styles.card}>
              <Text style={styles.professionalName}>
                {professional.name}
              </Text>

              <Text style={styles.professionalMeta}>
                {professional.crefito}
              </Text>

              <Text style={styles.availability}>
                Disponível agora
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: homeColors.background,
  },
  content: {
    padding: 24,
    gap: 18,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: homeColors.hero,
  },
  subtitle: {
    color: '#5D5D5D',
    fontSize: 15,
    marginTop: 6,
  },
  card: {
    backgroundColor: homeColors.white,
    borderRadius: 18,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  professionalName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
  },
  professionalMeta: {
    color: '#8C8C8C',
    marginTop: 8,
  },
  availability: {
    marginTop: 12,
    color: homeColors.button,
    fontWeight: '700',
  },
  message: {
    marginTop: 20,
    color: '#666',
    fontSize: 15,
  },
});