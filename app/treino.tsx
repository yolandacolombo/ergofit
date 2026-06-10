import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { homeColors } from '@/features/home/constants/colors';
import { markWorkoutAsCompleted } from '@/features/home/services/profile-service';

export default function WorkoutRoute() {
  const router = useRouter();
  const [completed, setCompleted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  async function handleMarkCompleted(value: boolean) {
    if (!value || completed) {
      setCompleted(value);
      return;
    }

    setIsSaving(true);
    try {
      const nextCount = await markWorkoutAsCompleted();
      setCompleted(true);
      Alert.alert('Treino marcado', `Você concluiu este treino. Agora possui ${nextCount} treino(s) realizado(s).`);
    } catch (error) {
      Alert.alert('Erro', error instanceof Error ? error.message : 'Não foi possível atualizar o treino.');
    } finally {
      setIsSaving(false);
    }
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Detalhes do treino</Text>
        <Text style={styles.subtitle}>Aqui estão as informações completas sobre o treino selecionado.</Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Objetivo</Text>
          <Text style={styles.text}>Hipertrofia muscular e fortalecimento da lombar.</Text>

          <Text style={styles.sectionTitle}>Condição</Text>
          <Text style={styles.text}>Dor na lombar e mobilidade reduzida.</Text>

          <Text style={styles.sectionTitle}>Duração</Text>
          <Text style={styles.text}>1 hora</Text>

          <Text style={styles.sectionTitle}>Local recomendado</Text>
          <Text style={styles.text}>Academia ou casa com apoio adequado.</Text>

          <Text style={styles.sectionTitle}>Profissional</Text>
          <Text style={styles.text}>Roberta da Silva • CREFITO-5 123456-F</Text>

          <Text style={styles.sectionTitle}>Vídeos</Text>
          <Text style={styles.text}>Acompanhe os exercícios com instruções em vídeo.</Text>

          <Text style={styles.sectionTitle}>Feedback</Text>
          <Text style={styles.text}>Deixe sua avaliação ao finalizar o treino.</Text>

          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => handleMarkCompleted(!completed)}
            disabled={isSaving}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name={completed ? 'checkbox-marked' : 'checkbox-blank-outline'}
              size={24}
              color={completed ? homeColors.button : '#9E9E9E'}
            />
            <Text style={styles.checkboxLabel}>{isSaving ? 'Salvando...' : 'Treino realizado'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => router.push('/feedback')}>
            <Text style={styles.buttonText}>Enviar feedback</Text>
          </TouchableOpacity>
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
    fontSize: 15,
    marginTop: 6,
  },
  card: {
    backgroundColor: homeColors.white,
    borderRadius: 18,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    gap: 14,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333333',
    marginTop: 14,
  },
  text: {
    color: '#575757',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },
  button: {
    backgroundColor: homeColors.button,
    borderRadius: 14,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
  },
  checkboxLabel: {
    color: '#333333',
    fontSize: 15,
    fontWeight: '600',
  },
});
