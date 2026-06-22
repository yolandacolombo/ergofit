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
const contentHorizontalPadding = 24;
const cardHorizontalPadding = 18;
const dayGridGap = 8;
const dayTileSize = Math.floor(
  (screenWidth - contentHorizontalPadding * 2 - cardHorizontalPadding * 2 - dayGridGap * 6) / 7,
);

function formatDate(date: Date) {
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

type CalendarDay = {
  label: number;
  dateString: string;
  isCurrentMonth: boolean;
};

function buildCalendarDays(year: number, month: number) {
  const totalDays = new Date(year, month + 1, 0).getDate();
  const firstWeekday = new Date(year, month, 1).getDay();
  const previousMonthTotalDays = new Date(year, month, 0).getDate();
  const days: CalendarDay[] = [];

  for (let offset = firstWeekday; offset > 0; offset -= 1) {
    const day = previousMonthTotalDays - offset + 1;
    const date = new Date(year, month - 1, day);
    days.push({
      label: day,
      dateString: formatDate(date),
      isCurrentMonth: false,
    });
  }

  for (let day = 1; day <= totalDays; day += 1) {
    const date = new Date(year, month, day);
    days.push({
      label: day,
      dateString: formatDate(date),
      isCurrentMonth: true,
    });
  }

  const totalCells = Math.ceil(days.length / 7) * 7;
  for (let day = 1; days.length < totalCells; day += 1) {
    const date = new Date(year, month + 1, day);
    days.push({
      label: day,
      dateString: formatDate(date),
      isCurrentMonth: false,
    });
  }

  return days;
}

export default function ScheduleAppointmentRoute() {
  const router = useRouter();
  const calendarDays = useMemo(() => buildCalendarDays(currentYear, currentMonth), []);

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
            {calendarDays.map((day) => {
              return (
                <TouchableOpacity
                  key={day.dateString}
                  style={[
                    styles.dayTile,
                    day.isCurrentMonth ? styles.dayTileDefault : styles.dayTileMuted,
                  ]}
                  onPress={() => handleSelectDate(day.dateString)}
                >
                  <Text
                    style={[
                      styles.dayText,
                      !day.isCurrentMonth && styles.dayTextMuted,
                    ]}
                  >
                    {day.label}
                  </Text>
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
    padding: contentHorizontalPadding,
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
    padding: cardHorizontalPadding,
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
    gap: dayGridGap,
  },
  dayTile: {
    width: dayTileSize,
    height: dayTileSize,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayTileDefault: {
    backgroundColor: '#F5F2EE',
  },
  dayTileMuted: {
    backgroundColor: '#FBF8F4',
  },
  dayText: {
    color: '#333333',
    fontWeight: '700',
  },
  dayTextMuted: {
    color: '#B8B0A4',
  },
  note: {
    color: '#7A7A7A',
    fontSize: 14,
    lineHeight: 20,
  },
});
