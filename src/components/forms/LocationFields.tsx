"use client";

import { fetchLocalBodies, fetchTaluks } from "@/services/catalog-api";
import type { District, LocalBody, Place, Taluk } from "@/types/location";
import Field from "./Field";
import { useKeyedList } from "./useKeyedList";

/*
  District -> taluk -> panchayat / municipality, each a list from the API (the API rejects
  names that are not in these lists). Ward is typed in. Picking a district clears the
  taluk and panchayat; picking a taluk clears the panchayat.
*/
export default function LocationFields({
  districts,
  value,
  onChange,
  withWard = true,
  idPrefix,
}: {
  districts: District[] | null;
  value: Place;
  onChange: (p: Place) => void;
  withWard?: boolean;
  idPrefix: string;
}) {
  const taluks = useKeyedList<Taluk>(value.districtId, () => fetchTaluks(value.districtId));
  const talukId = taluks.items.find((t) => t.name === value.taluk)?.id;
  const bodiesKey = value.districtId && talukId ? `${value.districtId}:${talukId}` : "";
  const bodies = useKeyedList<LocalBody>(bodiesKey, () => fetchLocalBodies(value.districtId, talukId));

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
          onChange={(e) => onChange({ ...value, districtId: e.target.value, taluk: "", panchayat: "" })}
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
          onChange={(e) => onChange({ ...value, taluk: e.target.value, panchayat: "" })}
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
          onChange={(e) => onChange({ ...value, panchayat: e.target.value })}
        >
          <option value="">{!talukId ? "Select a taluk first" : bodies.loading ? "Loading…" : "Select panchayat / municipality"}</option>
          {bodies.items.map((b) => (
            <option key={b.id} value={b.name}>
              {b.name}
            </option>
          ))}
        </select>
      </Field>

      {withWard && (
        <Field label="Ward" required htmlFor={id("ward")}>
          <input
            id={id("ward")}
            required
            maxLength={100}
            className="field-input"
            placeholder="Ward name or number"
            value={value.ward}
            onChange={(e) => onChange({ ...value, ward: e.target.value })}
          />
        </Field>
      )}
    </div>
  );
}
