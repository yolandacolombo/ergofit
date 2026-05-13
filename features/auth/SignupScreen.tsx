import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { signupWithEmail } from "@/features/auth/services/auth-service";
import { homeColors } from "@/features/home/constants/colors";
import { supabaseConfigError } from "@/lib/supabase";

const { height } = Dimensions.get("window");

type SignupField =
  | "email"
  | "name"
  | "difficulty"
  | "frequency"
  | "password"
  | "confirmPassword";

export function SignupScreen() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    difficulty: "",
    frequency: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const configError = supabaseConfigError;
  const isConfigInvalid = Boolean(configError);

  function updateField(field: SignupField, value: string) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  async function handleSignup() {
    if (
      !form.email.trim() ||
      !form.name.trim() ||
      !form.difficulty.trim() ||
      !form.frequency.trim() ||
      !form.password ||
      !form.confirmPassword
    ) {
      Alert.alert("Cadastro", "Preencha todos os campos obrigatorios.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      Alert.alert("Cadastro", "As senhas nao conferem.");
      return;
    }

    if (form.password.length < 6) {
      Alert.alert("Cadastro", "A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    try {
      setIsLoading(true);
      await signupWithEmail({
        email: form.email,
        name: form.name,
        difficulty: form.difficulty,
        frequency: form.frequency,
        password: form.password,
      });

      Alert.alert(
        "Cadastro criado",
        "Verifique seu email se a confirmacao estiver ativa no Supabase.",
      );
      router.replace("/login");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Nao foi possivel criar sua conta.";
      Alert.alert("Erro no cadastro", message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.header}>
          <View style={styles.iconWrapper}>
            <MaterialCommunityIcons
              name="heart-pulse"
              size={74}
              color="#FFFFFF"
            />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Cadastre-se</Text>

          <View style={styles.fields}>
            <RequiredInput
              placeholder="Email"
              value={form.email}
              onChangeText={(value) => updateField("email", value)}
              keyboardType="email-address"
            />

            <RequiredInput
              placeholder="Nome"
              value={form.name}
              onChangeText={(value) => updateField("name", value)}
            />

            <RequiredInput
              placeholder="Dificuldade física"
              value={form.difficulty}
              onChangeText={(value) => updateField("difficulty", value)}
            />

            <RequiredInput
              placeholder="Frequência semanal desejada"
              value={form.frequency}
              onChangeText={(value) => updateField("frequency", value)}
            />

            <RequiredInput
              placeholder="Senha"
              value={form.password}
              onChangeText={(value) => updateField("password", value)}
              secureTextEntry
            />

            <RequiredInput
              placeholder="Confirmar Senha"
              value={form.confirmPassword}
              onChangeText={(value) => updateField("confirmPassword", value)}
              secureTextEntry
            />
          </View>

          {configError ? (
            <View style={styles.configErrorBox}>
              <Text style={styles.configErrorText}>{configError}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            disabled={isLoading || isConfigInvalid}
            style={[styles.signupButton, (isLoading || isConfigInvalid) && styles.disabledButton]}
            onPress={handleSignup}
          >
            <Text style={styles.signupButtonText}>
              {isLoading ? "Cadastrando..." : "Cadastrar"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

type RequiredInputProps = {
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: "default" | "email-address";
  secureTextEntry?: boolean;
};

function RequiredInput({
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  secureTextEntry = false,
}: RequiredInputProps) {
  return (
    <View style={styles.inputBox}>
      <TextInput
        autoCapitalize={keyboardType === "email-address" ? "none" : "sentences"}
        autoCorrect={false}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor="#A5A5A5"
        secureTextEntry={secureTextEntry}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
      <Text style={styles.requiredMark}>*</Text>
    </View>
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
  header: {
    height: Math.max(150, height * 0.23),
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },
  iconWrapper: {
    width: 102,
    height: 102,
    borderRadius: 51,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.14)",
  },
  card: {
    flex: 1,
    backgroundColor: homeColors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 28,
    paddingTop: 38,
  },
  title: {
    color: homeColors.button,
    fontSize: 34,
    fontWeight: "800",
    marginBottom: 30,
  },
  fields: {
    gap: 15,
  },
  inputBox: {
    height: 38,
    width: "100%",
    backgroundColor: "#FFFDFB",
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  input: {
    flex: 1,
    height: "100%",
    color: "#4F4F4F",
    fontSize: 14,
  },
  requiredMark: {
    color: "#D94B43",
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 4,
  },
  signupButton: {
    height: 40,
    borderRadius: 20,
    backgroundColor: homeColors.button,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    shadowColor: homeColors.button,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 4,
  },
  disabledButton: {
    opacity: 0.72,
  },
  configErrorBox: {
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: "#FFE5E2",
    padding: 14,
  },
  configErrorText: {
    color: "#D94B43",
    fontSize: 14,
    lineHeight: 20,
  },
  signupButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
});
