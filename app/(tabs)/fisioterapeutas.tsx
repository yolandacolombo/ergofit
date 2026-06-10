import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { homeColors } from "@/features/home/constants/colors";
import {
  getPhysiotherapists,
  type Physiotherapist,
} from "@/features/home/services/physiotherapists-service";

const stateFilters = ["RS", "PR", "SC"];

type AvailabilityFilter = boolean | null;

export default function PhysiotherapistsRoute() {
  const router = useRouter();
  const [professionals, setProfessionals] = useState<Physiotherapist[]>([]);
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] =
    useState<AvailabilityFilter>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isActive = true;

    setIsLoading(true);
    setErrorMessage("");

    getPhysiotherapists({
      search,
      state: stateFilter,
      available: availabilityFilter,
    })
      .then((remoteProfessionals) => {
        if (isActive) {
          setProfessionals(remoteProfessionals);
        }
      })
      .catch((error) => {
        if (isActive) {
          setProfessionals([]);
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Nao foi possivel carregar os fisioterapeutas.",
          );
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [availabilityFilter, search, stateFilter]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Fisioterapeutas</Text>
        <Text style={styles.subtitle}>
          Profissionais carregados do Supabase com filtros aplicados no banco.
        </Text>

        <View style={styles.filters}>
          <View style={styles.searchBox}>
            <MaterialCommunityIcons
              name="magnify"
              size={20}
              color={homeColors.button}
            />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Buscar por nome, CREFITO ou especialidade"
              placeholderTextColor="#9B9B9B"
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
            />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}
          >
            <FilterChip
              active={!stateFilter}
              label="Todos"
              onPress={() => setStateFilter("")}
            />
            {stateFilters.map((state) => (
              <FilterChip
                key={state}
                active={stateFilter === state}
                label={state}
                onPress={() => setStateFilter(state)}
              />
            ))}
          </ScrollView>

          <View style={styles.filterRow}>
            <FilterChip
              active={availabilityFilter === null}
              label="Todos"
              onPress={() => setAvailabilityFilter(null)}
            />
            <FilterChip
              active={availabilityFilter === true}
              label="Disponiveis"
              onPress={() => setAvailabilityFilter(true)}
            />
            <FilterChip
              active={availabilityFilter === false}
              label="Indisponiveis"
              onPress={() => setAvailabilityFilter(false)}
            />
          </View>
        </View>

        {isLoading ? (
          <View style={styles.feedbackBox}>
            <ActivityIndicator color={homeColors.button} />
            <Text style={styles.feedbackText}>Carregando profissionais...</Text>
          </View>
        ) : null}

        {!isLoading && errorMessage ? (
          <View style={styles.feedbackBox}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : null}

        {!isLoading && !errorMessage && professionals.length === 0 ? (
          <View style={styles.feedbackBox}>
            <Text style={styles.feedbackText}>
              Nenhum fisioterapeuta encontrado para esses filtros.
            </Text>
          </View>
        ) : null}

        {professionals.map((professional) => (
          <View key={professional.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.avatar}>
                <MaterialCommunityIcons
                  name="account-heart-outline"
                  size={30}
                  color={homeColors.button}
                />
              </View>
              <View style={styles.cardTitle}>
                <Text style={styles.professionalName}>
                  {professional.name}
                </Text>
                <Text style={styles.professionalMeta}>
                  {professional.crefito}
                </Text>
              </View>
            </View>
            <Text style={styles.specialty}>{professional.specialty}</Text>
            <Text style={styles.state}>{professional.state}</Text>
            <Text style={styles.rating}>
              Avaliacao: {professional.rating.toFixed(1)}
            </Text>
            <Text
              style={[
                styles.availability,
                !professional.available && styles.unavailable,
              ]}
            >
              {professional.available ? "Disponivel agora" : "Indisponivel"}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/treino")}
            >
              <Text style={styles.buttonText}>Ver treino recomendado</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

type FilterChipProps = {
  active: boolean;
  label: string;
  onPress: () => void;
};

function FilterChip({ active, label, onPress }: FilterChipProps) {
  return (
    <TouchableOpacity
      style={[styles.filterChip, active && styles.activeFilterChip]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.filterChipText,
          active && styles.activeFilterChipText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: homeColors.background,
  },
  content: {
    padding: 24,
    paddingBottom: 110,
    gap: 18,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: homeColors.hero,
    marginBottom: 6,
  },
  subtitle: {
    color: "#5D5D5D",
    fontSize: 15,
    marginBottom: 4,
  },
  filters: {
    gap: 12,
  },
  searchBox: {
    height: 48,
    backgroundColor: homeColors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ECECEC",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: "#333333",
    fontSize: 14,
  },
  filterRow: {
    flexDirection: "row",
    gap: 10,
  },
  filterChip: {
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: homeColors.white,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  activeFilterChip: {
    borderColor: homeColors.button,
    backgroundColor: homeColors.button,
  },
  filterChipText: {
    color: "#595959",
    fontSize: 13,
    fontWeight: "700",
  },
  activeFilterChipText: {
    color: "#FFFFFF",
  },
  feedbackBox: {
    backgroundColor: homeColors.white,
    borderRadius: 14,
    padding: 18,
    alignItems: "center",
    gap: 10,
  },
  feedbackText: {
    color: "#5D5D5D",
    fontSize: 14,
    textAlign: "center",
  },
  errorText: {
    color: "#D94B43",
    fontSize: 14,
    textAlign: "center",
  },
  card: {
    backgroundColor: homeColors.white,
    borderRadius: 18,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    gap: 10,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#FFE7D4",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    flex: 1,
  },
  professionalName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333333",
  },
  professionalMeta: {
    color: "#8C8C8C",
    marginTop: 4,
  },
  specialty: {
    color: "#4D4D4D",
    fontSize: 14,
    lineHeight: 20,
  },
  state: {
    color: "#8C8C8C",
    fontSize: 13,
  },
  rating: {
    color: "#4D4D4D",
    fontSize: 14,
    fontWeight: "600",
  },
  availability: {
    color: homeColors.button,
    fontSize: 13,
    fontWeight: "700",
  },
  unavailable: {
    color: "#9B9B9B",
  },
  button: {
    backgroundColor: homeColors.button,
    borderRadius: 14,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
