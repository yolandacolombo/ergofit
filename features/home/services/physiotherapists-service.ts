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
}: PhysiotherapistFilters = {}): Promise<Physiotherapist[]> {
  if (!supabase) {
    return [];
  }

  let query = supabase
    .from("physiotherapists")
    .select("id, name, crefito, state, specialty, rating, available")
    .order("available", { ascending: false })
    .order("rating", { ascending: false });

  const normalizedSearch = search?.trim();
  if (normalizedSearch) {
    const pattern = `%${normalizedSearch}%`;
    query = query.or(
      `name.ilike.${pattern},crefito.ilike.${pattern},specialty.ilike.${pattern}`,
    );
  }

  const normalizedState = state?.trim().toUpperCase();
  if (normalizedState) {
    query = query.eq("state", normalizedState);
  }

  if (typeof available === "boolean") {
    query = query.eq("available", available);
  }

  const { data, error } = await query;

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
