import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { homeColors } from '@/features/home/constants/colors';

const availableDates = ['15 Mai', '16 Mai', '17 Mai', '18 Mai'];

export default function ScheduleAppointmentRoute() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Agendar consulta</Text>
        <Text style={styles.subtitle}>
          Selecione a data de sua disponibilidade. Os fisioterapeutas disponíveis serão filtrados conforme sua escolha.
        </Text>

        <View style={styles.card}> 
          {availableDates.map((date) => (
            <TouchableOpacity key={date} style={styles.dateButton}>
              <Text style={styles.dateText}>{date}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.note}>
          Após selecionar a data, você poderá ver apenas os profissionais que atendem nesse dia.
        </Text>
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
    gap: 20,
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
    gap: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  dateButton: {
    backgroundColor: '#F7F0E8',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  dateText: {
    color: homeColors.hero,
    fontSize: 16,
    fontWeight: '700',
  },
  note: {
    color: '#7A7A7A',
    fontSize: 14,
    lineHeight: 20,
  },
});
