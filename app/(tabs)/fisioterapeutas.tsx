import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { homeColors } from '@/features/home/constants/colors';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const professionals = [
  {
    id: '1',
    name: 'Roberta da Silva',
    crefito: 'CREFITO-5 123456-F',
    state: 'RS',
    specialty: 'Dores na lombar',
    rating: 4.5,
    available: true,
  },
  {
    id: '2',
    name: 'Paula de Oliveira',
    crefito: 'CREFITO-5 123456-F',
    state: 'PR',
    specialty: 'Mobilidade reduzida',
    rating: 4.8,
    available: true,
  },
];

export default function PhysiotherapistsRoute() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Fisioterapeutas</Text>
        <Text style={styles.subtitle}>
          Aqui estão os profissionais disponíveis na plataforma.
        </Text>
        {professionals.map((professional) => (
          <View key={professional.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarIcon}>👩‍⚕️</Text>
              </View>
              <View style={styles.cardTitle}>
                <Text style={styles.professionalName}>{professional.name}</Text>
                <Text style={styles.professionalMeta}>{professional.crefito}</Text>
              </View>
            </View>
            <Text style={styles.specialty}>{professional.specialty}</Text>
            <Text style={styles.state}>{professional.state}</Text>
            <Text style={styles.rating}>Avaliação: {professional.rating.toFixed(1)}</Text>
            <Text style={styles.availability}>
              {professional.available ? 'Disponível agora' : 'Indisponível'}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push('/treino')}
            >
              <Text style={styles.buttonText}>Ver treino recomendado</Text>
            </TouchableOpacity>
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
    marginBottom: 6,
  },
  subtitle: {
    color: '#5D5D5D',
    fontSize: 15,
    marginBottom: 18,
  },
  card: {
    backgroundColor: homeColors.white,
    borderRadius: 18,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    gap: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFE7D4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarIcon: {
    fontSize: 28,
  },
  cardTitle: {
    flex: 1,
  },
  professionalName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
  },
  professionalMeta: {
    color: '#8C8C8C',
    marginTop: 4,
  },
  specialty: {
    color: '#4D4D4D',
    fontSize: 14,
    lineHeight: 20,
  },
  state: {
    color: '#8C8C8C',
    fontSize: 13,
  },
  rating: {
    color: '#4D4D4D',
    fontSize: 14,
    fontWeight: '600',
  },
  availability: {
    color: homeColors.button,
    fontSize: 13,
    fontWeight: '700',
  },
  button: {
    backgroundColor: homeColors.button,
    borderRadius: 14,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
