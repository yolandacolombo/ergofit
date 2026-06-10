import { useMemo } from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { homeColors } from '@/features/home/constants/colors';

const monthNames = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();
const screenWidth = Dimensions.get('window').width;
const dayTileSize = Math.floor((screenWidth - 96) / 7);

function formatDate(date: Date) {
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

function buildCalendarDays(year: number, month: number) {
  const totalDays = new Date(year, month + 1, 0).getDate();
  const firstWeekday = new Date(year, month, 1).getDay();

  const paddingDays = Array.from({ length: firstWeekday }, (_, index) => index);
  const days = Array.from({ length: totalDays }, (_, index) => index + 1);

  return { paddingDays, days };
}

export default function ScheduleAppointmentRoute() {
  const router = useRouter();
  const calendar = useMemo(
    () => buildCalendarDays(currentYear, currentMonth),
    [],
  );

  function handleSelectDate(dateString: string) {
    router.push({
      pathname: "/fisioterapeutas",
      params: { date: dateString },
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Agendar consulta online</Text>
        <Text style={styles.subtitle}>
          Escolha um dia no calendário e veja apenas os fisioterapeutas com horário nesse dia.
        </Text>

        <View style={styles.calendarCard}>
          <Text style={styles.calendarTitle}>{monthNames[currentMonth]} {currentYear}</Text>
          <View style={styles.weekDaysRow}>
            {weekDays.map((day) => (
              <Text key={day} style={styles.weekDayLabel}>{day}</Text>
            ))}
          </View>
          <View style={styles.daysGrid}>
            {calendar.paddingDays.map((index) => (
              <View key={`empty-${index}`} style={[styles.dayTile, styles.dayTileEmpty]} />
            ))}
            {calendar.days.map((day) => {
              const dateString = formatDate(new Date(currentYear, currentMonth, day));
              return (
                <TouchableOpacity
                  key={dateString}
                  style={[styles.dayTile, styles.dayTileDefault]}
                  onPress={() => handleSelectDate(dateString)}
                >
                  <Text style={styles.dayText}>{day}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <Text style={styles.note}>
          Ao tocar no dia, você será levado para a lista de fisioterapeutas disponíveis nesta data.
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
  calendarCard: {
    backgroundColor: homeColors.white,
    borderRadius: 18,
    padding: 18,
    gap: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  calendarTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weekDayLabel: {
    width: dayTileSize,
    textAlign: 'center',
    color: '#999999',
    fontSize: 12,
    fontWeight: '700',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dayTile: {
    width: dayTileSize,
    height: dayTileSize,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayTileEmpty: {
    backgroundColor: 'transparent',
  },
  dayTileDefault: {
    backgroundColor: '#F5F2EE',
  },
  dayText: {
    color: '#333333',
    fontWeight: '700',
  },
  note: {
    color: '#7A7A7A',
    fontSize: 14,
    lineHeight: 20,
  },
});
