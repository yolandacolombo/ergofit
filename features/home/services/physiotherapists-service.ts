import { supabase } from "@/lib/supabase";

export type Physiotherapist = {
  id: number;
  name: string;
  crefito: string;
  state: string;
  specialty: string;
  rating: number;
  available: boolean;
};

export type PhysiotherapistFilters = {
  search?: string;
  state?: string;
  available?: boolean | null;
  date?: string;
};

type PhysiotherapistRow = {
  id: number;
  name: string;
  crefito: string;
  state: string;
  specialty: string;
  rating: number | string;
  available: boolean;
};

export async function getPhysiotherapists({
  search,
  state,
  available,
  date,
}: PhysiotherapistFilters = {}): Promise<Physiotherapist[]> {
  if (!supabase) {
    return [];
  }

  const normalizedSearch = search?.trim();
  const normalizedState = state?.trim().toUpperCase();
  const normalizedDate = date?.trim();

  if (normalizedDate) {
    const { data: availabilityData, error: availabilityError } = await supabase
      .from("physiotherapist_availabilities")
      .select("physiotherapist_id")
      .eq("available_date", normalizedDate);

    const isMissingAvailabilityTable =
      availabilityError?.message?.toLowerCase().includes("could not find the table") ||
      availabilityError?.message?.toLowerCase().includes("schema cache") ||
      availabilityError?.message?.toLowerCase().includes("does not exist");

    if (availabilityError) {
      if (!isMissingAvailabilityTable) {
        throw new Error(
          availabilityError.message ||
            "Falha ao consultar disponibilidade de fisioterapeutas.",
        );
      }

      return [];
    }

    if (!availabilityError) {
      const ids =
        availabilityData
          ?.map((row) => Number(row.physiotherapist_id))
          .filter((id) => !Number.isNaN(id)) ?? [];

      if (ids.length === 0) {
        return [];
      }

      const filteredQuery = supabase
        .from("physiotherapists")
        .select("id, name, crefito, state, specialty, rating, available")
        .in("id", ids)
        .order("available", { ascending: false })
        .order("rating", { ascending: false });

      if (normalizedSearch) {
        const pattern = `%${normalizedSearch}%`;
        filteredQuery.or(
          `name.ilike.${pattern},crefito.ilike.${pattern},specialty.ilike.${pattern}`,
        );
      }

      if (normalizedState) {
        filteredQuery.eq("state", normalizedState);
      }

      if (typeof available === "boolean") {
        filteredQuery.eq("available", available);
      }

      const { data, error } = await filteredQuery;
      if (error) {
        throw new Error(error.message || "Falha ao buscar fisioterapeutas.");
      }

      return (data ?? []).map(mapPhysiotherapistRow);
    }

    return [];
  }

  const baseQuery = supabase
    .from("physiotherapists")
    .select("id, name, crefito, state, specialty, rating, available")
    .order("available", { ascending: false })
    .order("rating", { ascending: false });

  if (normalizedSearch) {
    const pattern = `%${normalizedSearch}%`;
    baseQuery.or(
      `name.ilike.${pattern},crefito.ilike.${pattern},specialty.ilike.${pattern}`,
    );
  }

  if (normalizedState) {
    baseQuery.eq("state", normalizedState);
  }

  if (typeof available === "boolean") {
    baseQuery.eq("available", available);
  }

  const { data, error } = await baseQuery;

  if (error) {
    throw error;
  }

  return (data ?? []).map(mapPhysiotherapistRow);
}

function mapPhysiotherapistRow(row: PhysiotherapistRow): Physiotherapist {
  return {
    id: row.id,
    name: row.name,
    crefito: row.crefito,
    state: row.state,
    specialty: row.specialty,
    rating: Number(row.rating),
    available: row.available,
  };
}
