import { api } from "@/services/api";
import { toServices } from "@/utils/services";
import type { ApiService, Service } from "@/types/service";
import type { District, LocalBody, Taluk } from "@/types/location";

/* ---------- Masters for the forms, fetched in the browser ---------- */
// Services and districts normally arrive from the server page (initialX props); these
// calls are the fallback when the server could not reach the API. Taluks and local
// bodies depend on what the visitor picks, so they are always fetched here.

export async function fetchServices(): Promise<Service[] | null> {
  const res = await api.get<ApiService[]>("/services");
  return res.success && res.data ? toServices(res.data) : null;
}

export async function fetchDistricts(): Promise<District[] | null> {
  const res = await api.get<District[]>("/districts");
  return res.success ? (res.data ?? []) : null;
}

export async function fetchTaluks(districtId: string): Promise<Taluk[]> {
  const res = await api.get<Taluk[]>("/taluks", { district_id: districtId });
  return res.success ? (res.data ?? []) : [];
}

export async function fetchLocalBodies(districtId: string, talukId?: number): Promise<LocalBody[]> {
  const res = await api.get<LocalBody[]>("/local-bodies", { district_id: districtId, taluk_id: talukId });
  return res.success ? (res.data ?? []) : [];
}
