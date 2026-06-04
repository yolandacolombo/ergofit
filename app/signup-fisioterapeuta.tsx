import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { homeColors } from "@/features/home/constants/colors";

const { height } = Dimensions.get("window");

export default function ProfessionalSignupRoute() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    crefito: "",
    specialty: "",
    state: "",
    clinic: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  function updateField(field: keyof typeof form, value: string) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  async function handleSignup() {
    if (
      !form.email.trim() ||
      !form.name.trim() ||
      !form.crefito.trim() ||
      !form.specialty.trim() ||
      !form.state.trim() ||
      !form.phone.trim() ||
      !form.password ||
      !form.confirmPassword
    ) {
      Alert.alert("Cadastro", "Preencha todos os campos obrigatórios.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      Alert.alert("Cadastro", "As senhas não conferem.");
      return;
    }

    if (form.password.length < 6) {
      Alert.alert(
        "Cadastro",
        "A senha precisa ter pelo menos 6 caracteres.",
      );
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        "Cadastro recebido",
        "Cadastro de fisioterapeuta enviado. Este fluxo é demonstrativo e não adiciona o profissional ao banco neste momento.",
      );
      router.replace("/login");
    }, 800);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="always"
      >
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
          <Text style={styles.title}>Cadastro de Fisioterapeuta</Text>
          <Text style={styles.subtitle}>
            Preencha os dados do seu perfil profissional.
          </Text>

          <View style={styles.fields}>
            <RequiredInput
              placeholder="Email profissional"
              value={form.email}
              onChangeText={(value) => updateField("email", value)}
              keyboardType="email-address"
            />
            <RequiredInput
              placeholder="Nome completo"
              value={form.name}
              onChangeText={(value) => updateField("name", value)}
            />
            <RequiredInput
              placeholder="CREFITO"
              value={form.crefito}
              onChangeText={(value) => updateField("crefito", value)}
            />
            <RequiredInput
              placeholder="Especialidade"
              value={form.specialty}
              onChangeText={(value) => updateField("specialty", value)}
            />
            <RequiredInput
              placeholder="Estado (UF)"
              value={form.state}
              onChangeText={(value) => updateField("state", value)}
            />

            <RequiredInput
              placeholder="Telefone para contato"
              value={form.phone}
              onChangeText={(value) => updateField("phone", value)}
            />
            <RequiredInput
              placeholder="Senha"
              value={form.password}
              onChangeText={(value) => updateField("password", value)}
              secureTextEntry
            />
            <RequiredInput
              placeholder="Confirmar senha"
              value={form.confirmPassword}
              onChangeText={(value) => updateField("confirmPassword", value)}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            disabled={isLoading}
            style={[styles.signupButton, isLoading && styles.disabledButton]}
            onPress={handleSignup}
          >
            <Text style={styles.signupButtonText}>
              {isLoading ? "Enviando..." : "Enviar cadastro"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.secondaryButtonText}>Voltar ao login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120,
    justifyContent: "flex-start",
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
    backgroundColor: homeColors.white,
    borderRadius: 28,
    paddingHorizontal: 28,
    paddingTop: 28,
    paddingBottom: 40,
    minHeight: height * 0.7,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    color: homeColors.button,
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 6,
  },
  subtitle: {
    color: "#8C8C8C",
    fontSize: 14,
    marginBottom: 24,
  },
  fields: {
    gap: 14,
  },
  inputBox: {
    height: 42,
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
    marginLeft: 6,
  },
  signupButton: {
    height: 46,
    borderRadius: 23,
    backgroundColor: homeColors.button,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28,
    shadowColor: homeColors.button,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 4,
  },
  secondaryButton: {
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: homeColors.button,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  secondaryButtonText: {
    color: homeColors.button,
    fontSize: 16,
    fontWeight: "800",
  },
  disabledButton: {
    opacity: 0.72,
  },
  signupButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
});
