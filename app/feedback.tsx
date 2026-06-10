import { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { homeColors } from '@/features/home/constants/colors';
import { supabase } from '@/lib/supabase';

export default function FeedbackRoute() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [video, setVideo] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [isSending, setIsSending] = useState(false);

  async function handlePickVideo() {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['video/*'],
      copyToCacheDirectory: true,
      multiple: false,
    });

    if (result.canceled || !result.assets?.length) {
      return;
    }

    setVideo(result.assets[0]);
  }

  async function handleSendFeedback() {
    if (!supabase) {
      Alert.alert('Erro', 'O Supabase não está configurado.');
      return;
    }

    if (!message.trim()) {
      Alert.alert('Campo obrigatório', 'Digite uma mensagem para o feedback.');
      return;
    }

    setIsSending(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        Alert.alert('Erro', 'Faça login para enviar feedback.');
        return;
      }

      let videoUrl: string | null = null;

      if (video) {
        const fileName = `feedback-${user.id}-${Date.now()}-${video.name ?? 'video.mp4'}`;
        const uploadResult = await supabase.storage.from('feedback-videos').upload(fileName, {
          uri: video.uri,
          name: fileName,
          type: video.mimeType ?? 'video/mp4',
        } as any, {
          cacheControl: '3600',
          upsert: false,
        });

        if (uploadResult.error) {
          Alert.alert('Aviso', 'O vídeo não pôde ser enviado agora, mas sua mensagem foi registrada.');
        } else {
          const publicUrl = supabase.storage.from('feedback-videos').getPublicUrl(fileName);
          videoUrl = publicUrl.data.publicUrl ?? null;
        }
      }

      const { error: insertError } = await supabase.from('feedbacks').insert({
        user_id: user.id,
        message: message.trim(),
        video_url: videoUrl,
      });

      if (insertError) {
        throw insertError;
      }

      Alert.alert('Feedback enviado', 'Obrigado por compartilhar sua experiência.');
      router.back();
    } catch (error) {
      Alert.alert('Erro', error instanceof Error ? error.message : 'Não foi possível enviar o feedback.');
    } finally {
      setIsSending(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Enviar feedback</Text>
        <Text style={styles.subtitle}>Conte como foi o treino e, se quiser, anexe um vídeo.</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Mensagem</Text>
          <TextInput
            multiline
            numberOfLines={6}
            placeholder="Descreva sua experiência, dor, melhora ou sugestão..."
            placeholderTextColor="#9B9B9B"
            style={styles.input}
            value={message}
            onChangeText={setMessage}
          />

          <Text style={styles.label}>Vídeo (opcional)</Text>
          <TouchableOpacity style={styles.attachButton} onPress={handlePickVideo}>
            <Text style={styles.attachButtonText}>{video ? `Vídeo selecionado: ${video.name}` : 'Selecionar vídeo'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleSendFeedback} disabled={isSending}>
            {isSending ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Enviar</Text>}
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
    lineHeight: 20,
  },
  card: {
    backgroundColor: homeColors.white,
    borderRadius: 18,
    padding: 18,
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  label: {
    color: '#333333',
    fontSize: 14,
    fontWeight: '700',
  },
  input: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 14,
    padding: 14,
    textAlignVertical: 'top',
    color: '#333333',
  },
  attachButton: {
    borderWidth: 1,
    borderColor: homeColors.button,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  attachButtonText: {
    color: homeColors.button,
    fontWeight: '700',
  },
  button: {
    backgroundColor: homeColors.button,
    borderRadius: 14,
    height: 50,
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
