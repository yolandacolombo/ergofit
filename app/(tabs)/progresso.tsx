import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { homeColors } from '@/features/home/constants/colors';

const history = [
  { date: '10 Mai', workout: 'Treino de mobilidade' },
  { date: '08 Mai', workout: 'Treino para lombar' },
  { date: '05 Mai', workout: 'Treino de alongamento' },
];

export default function ProgressRoute() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Progresso</Text>
        <Text style={styles.subtitle}>Veja sua evolução semanal e mensal.</Text>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Treinos esta semana</Text>
          <Text style={styles.metricValue}>3</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Treinos no mês</Text>
          <Text style={styles.metricValue}>12</Text>
        </View>

        <View style={styles.historyCard}>
          <Text style={styles.historyTitle}>Histórico de treinos</Text>
          {history.map((item) => (
            <View key={item.date} style={styles.historyRow}>
              <Text style={styles.historyDate}>{item.date}</Text>
              <Text style={styles.historyWorkout}>{item.workout}</Text>
            </View>
          ))}
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
  historyWorkout: {
    color: '#333333',
    fontSize: 14,
    fontWeight: '600',
    maxWidth: '65%',
    textAlign: 'right',
  },
});
