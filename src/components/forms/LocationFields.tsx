"use client";

import { fetchLocalBodies, fetchTaluks, fetchVillages } from "@/services/catalog-api";
import type { District, LocalBody, Place, Taluk, Village } from "@/types/location";
import Field from "./Field";
import { useKeyedList } from "./useKeyedList";

/*
  District -> taluk -> panchayat / municipality (-> village), each a list from the API (the
  API rejects names that are not in these lists). Picking a level clears the levels below it.
  `withVillage`: the enquiry form also asks for the revenue village.
*/
export default function LocationFields({
  districts,
  value,
  onChange,
  withVillage = false,
  idPrefix,
}: {
  districts: District[] | null;
  value: Place;
  onChange: (p: Place) => void;
  withVillage?: boolean;
  idPrefix: string;
}) {
  const taluks = useKeyedList<Taluk>(value.districtId, () => fetchTaluks(value.districtId));
  const talukId = taluks.items.find((t) => t.name === value.taluk)?.id;
  const bodiesKey = value.districtId && talukId ? `${value.districtId}:${talukId}` : "";
  const bodies = useKeyedList<LocalBody>(bodiesKey, () => fetchLocalBodies(value.districtId, talukId));
  const bodyId = bodies.items.find((b) => b.name === value.panchayat)?.id;
  const villagesKey = withVillage && bodyId ? `${bodyId}:${talukId}` : "";
  const villages = useKeyedList<Village>(villagesKey, () => fetchVillages(bodyId!, talukId));

  const id = (name: string) => `${idPrefix}-${name}`;

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <Field label="State" required htmlFor={id("state")}>
        <input id={id("state")} className="field-input" value="Kerala" disabled />
      </Field>

      <Field label="District" required htmlFor={id("district")}>
        <select
          id={id("district")}
          required
          className="field-input"
          value={value.districtId}
          disabled={!districts}
          onChange={(e) => onChange({ ...value, districtId: e.target.value, taluk: "", panchayat: "", village: "" })}
        >
          <option value="">{districts ? "Select district" : "Loading districts…"}</option>
          {districts?.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Taluk" required htmlFor={id("taluk")}>
        <select
          id={id("taluk")}
          required
          className="field-input"
          value={value.taluk}
          disabled={!value.districtId || taluks.loading}
          onChange={(e) => onChange({ ...value, taluk: e.target.value, panchayat: "", village: "" })}
        >
          <option value="">{!value.districtId ? "Select a district first" : taluks.loading ? "Loading taluks…" : "Select taluk"}</option>
          {taluks.items.map((t) => (
            <option key={t.id} value={t.name}>
              {t.name}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Panchayat / municipality" required htmlFor={id("panchayat")}>
        <select
          id={id("panchayat")}
          required
          className="field-input"
          value={value.panchayat}
          disabled={!talukId || bodies.loading}
          onChange={(e) => onChange({ ...value, panchayat: e.target.value, village: "" })}
        >
          <option value="">{!talukId ? "Select a taluk first" : bodies.loading ? "Loading…" : "Select panchayat / municipality"}</option>
          {bodies.items.map((b) => (
            <option key={b.id} value={b.name}>
              {b.name}
            </option>
          ))}
        </select>
      </Field>

      {withVillage && (
        <Field label="Village" required htmlFor={id("village")}>
          <select
            id={id("village")}
            required
            className="field-input"
            value={value.village}
            disabled={!bodyId || villages.loading}
            onChange={(e) => onChange({ ...value, village: e.target.value })}
          >
            <option value="">{!bodyId ? "Select a panchayat first" : villages.loading ? "Loading villages…" : "Select village"}</option>
            {villages.items.map((v) => (
              <option key={v.id} value={v.name}>
                {v.name}
              </option>
            ))}
          </select>
        </Field>
      )}
    </div>
  );
}
