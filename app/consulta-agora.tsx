import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { homeColors } from '@/features/home/constants/colors';

const professionalsNow = [
  { id: '1', name: 'Roberta da Silva', crefito: 'CREFITO-5 123456-F', available: true },
  { id: '2', name: 'Paula de Oliveira', crefito: 'CREFITO-5 123456-F', available: true },
];

export default function QuickAppointmentRoute() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Realizar consulta agora</Text>
        <Text style={styles.subtitle}>
          Profissionais disponíveis neste momento para atendimento imediato.
        </Text>

        {professionalsNow.map((professional) => (
          <View key={professional.id} style={styles.card}>
            <Text style={styles.professionalName}>{professional.name}</Text>
            <Text style={styles.professionalMeta}>{professional.crefito}</Text>
            <Text style={styles.availability}>Disponível agora</Text>
          </View>
        ))}
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
});
