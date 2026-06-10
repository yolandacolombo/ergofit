import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { homeColors } from '@/features/home/constants/colors';
import { getProgressData, type ProgressData } from '@/features/home/services/profile-service';

function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}

export default function ProgressRoute() {
  const [data, setData] = useState<ProgressData>({ totalCompleted: 0, monthlyCompleted: 0, history: [] });

  useEffect(() => {
    getProgressData().then(setData).catch(() => {});
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Progresso</Text>
        <Text style={styles.subtitle}>Veja sua evolução semanal e mensal.</Text>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Treinos realizados</Text>
          <Text style={styles.metricValue}>{data.totalCompleted}</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Treinos no mês</Text>
          <Text style={styles.metricValue}>{data.monthlyCompleted}</Text>
        </View>

        <View style={styles.historyCard}>
          <Text style={styles.historyTitle}>Histórico de treinos</Text>
          {data.history.length === 0 ? (
            <Text style={styles.emptyText}>Nenhum treino concluído ainda.</Text>
          ) : (
            data.history.map((item, index) => (
              <View key={index} style={styles.historyRow}>
                <Text style={styles.historyDate}>{formatDate(item.completedAt)}</Text>
                <View style={styles.historyRight}>
                  <Text style={styles.historyWorkout}>{item.objective}</Text>
                  <Text style={styles.historyProfessional}>{item.professional}</Text>
                </View>
              </View>
            ))
          )}
        </View>
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
    marginTop: 6,
    fontSize: 15,
  },
  metricCard: {
    backgroundColor: homeColors.white,
    borderRadius: 18,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  metricLabel: {
    color: '#8C8C8C',
    fontSize: 14,
  },
  metricValue: {
    marginTop: 10,
    fontSize: 36,
    fontWeight: '800',
    color: homeColors.hero,
  },
  historyCard: {
    backgroundColor: homeColors.white,
    borderRadius: 18,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  historyDate: {
    color: '#5D5D5D',
    fontSize: 14,
  },
  historyRight: {
    alignItems: 'flex-end',
    maxWidth: '65%',
  },
  historyWorkout: {
    color: '#333333',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
  },
  historyProfessional: {
    color: '#8C8C8C',
    fontSize: 12,
    textAlign: 'right',
    marginTop: 2,
  },
  emptyText: {
    color: '#9E9E9E',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});
