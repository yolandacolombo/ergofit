import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { loginWithEmail } from "@/features/auth/services/auth-service";
import { homeColors } from "@/features/home/constants/colors";

export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !password) {
      Alert.alert("Login", "Preencha email e senha.");
      return;
    }

    try {
      setIsLoading(true);
      await loginWithEmail({ email, password });
      router.replace("/");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Não foi possível entrar.";
      Alert.alert("Erro ao entrar", message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.screen}
      >
        <View style={styles.hero}>
          <View style={styles.heroContent}>
            <Text style={styles.greeting}>Olá!</Text>
            <Text style={styles.welcome}>Bem-vindo ao ErgoFit</Text>

            <View style={styles.heartPulse}>
              <MaterialCommunityIcons
                name="heart-pulse"
                size={64}
                color="#FFFFFF"
              />
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.form}>
            <Text style={styles.title}>Entrar</Text>

            <View style={styles.inputGroup}>
              <Ionicons
                name="mail-outline"
                size={22}
                color={homeColors.button}
                style={styles.inputIcon}
              />
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                placeholder="Email"
                placeholderTextColor="#A6A6A6"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputGroup}>
              <Ionicons
                name="lock-closed-outline"
                size={22}
                color={homeColors.button}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Senha"
                placeholderTextColor="#A6A6A6"
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <TouchableOpacity style={styles.forgotButton}>
              <Text style={styles.forgotText}>Esqueceu sua senha?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={isLoading}
              style={[styles.loginButton, isLoading && styles.disabledButton]}
              onPress={handleLogin}
            >
              <Text style={styles.loginButtonText}>
                {isLoading ? "Entrando..." : "Entrar"}
              </Text>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Ou entre com</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialButton}>
                <FontAwesome name="facebook" size={24} color="#1877F2" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton}>
                <FontAwesome name="google" size={24} color="#DB4437" />
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Não possui conta? </Text>
              <TouchableOpacity onPress={() => router.push("/signup")}>
                <Text style={styles.signUpText}>Cadastre-se</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: homeColors.hero,
  },
  screen: {
    flex: 1,
    backgroundColor: homeColors.hero,
  },
  hero: {
    flex: 0.38,
    backgroundColor: homeColors.hero,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  heroContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  greeting: {
    color: "#FFFFFF",
    fontSize: 48,
    fontWeight: "800",
    marginBottom: 6,
  },
  welcome: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "500",
    marginBottom: 28,
  },
  heartPulse: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "rgba(255, 255, 255, 0.16)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.24)",
  },
  card: {
    flex: 0.62,
    backgroundColor: homeColors.white,
    borderTopLeftRadius: 42,
    borderTopRightRadius: 42,
    paddingHorizontal: 24,
    paddingTop: 34,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 12,
  },
  form: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
  },
  title: {
    color: "#5F4B3A",
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 24,
  },
  inputGroup: {
    height: 58,
    backgroundColor: "#F4F4F4",
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: "#4A4A4A",
    fontSize: 16,
  },
  forgotButton: {
    alignSelf: "flex-end",
    marginTop: -2,
    marginBottom: 24,
  },
  forgotText: {
    color: homeColors.button,
    fontSize: 13,
    fontWeight: "600",
  },
  loginButton: {
    height: 58,
    backgroundColor: homeColors.button,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: homeColors.button,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.24,
    shadowRadius: 12,
    elevation: 5,
  },
  disabledButton: {
    opacity: 0.72,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 28,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E4E4E4",
  },
  dividerText: {
    color: "#9B9B9B",
    fontSize: 13,
    marginHorizontal: 14,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 18,
  },
  socialButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#EFEFEF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28,
  },
  footerText: {
    color: "#8C8C8C",
    fontSize: 14,
  },
  signUpText: {
    color: homeColors.button,
    fontSize: 14,
    fontWeight: "800",
  },
});
