import { Building2, CircleCheck, CircleHelp, CircleX, Footprints, House, Route, Sprout, Truck } from "lucide-react";
import { EXTENT_UNITS } from "@/constants/forms";
import ChoiceCards, { type Choice } from "@/components/forms/ChoiceCards";
import Field from "@/components/forms/Field";
import FormCard from "@/components/forms/FormCard";
import UnitInput from "@/components/forms/UnitInput";
import type { EnquiryFormState, SetEnquiryField } from "../enquiry-form-state";

// Values match the API (Enquiry::*_LABELS)
const PROPERTY_OPTIONS: Choice[] = [
  { value: "residential", label: "Residential", hint: "Home or villa", icon: House },
  { value: "agricultural", label: "Agricultural", hint: "Farm or plantation", icon: Sprout },
  { value: "commercial", label: "Commercial", hint: "Shop, office or factory", icon: Building2 },
];
const ROAD_OPTIONS: Choice[] = [
  { value: "motorable", label: "Motorable road", hint: "Vehicles reach the gate", icon: Truck },
  { value: "narrow_lane", label: "Narrow lane", hint: "Small vehicles only", icon: Route },
  { value: "no_road", label: "No road", hint: "Walk-in access", icon: Footprints },
];
const RIG_OPTIONS: Choice[] = [
  { value: "yes", label: "Yes", icon: CircleCheck },
  { value: "no", label: "No", icon: CircleX },
  { value: "not_sure", label: "Not sure", hint: "We'll check on site", icon: CircleHelp },
];

export default function PropertyStep({ form, set }: { form: EnquiryFormState; set: SetEnquiryField }) {
  return (
    <FormCard step="Step 4 of 4" title="About the property" active>
      <Field label="Property type">
        <ChoiceCards label="Property type" name="ptype" value={form.propertyType} onChange={(v) => set("propertyType", v)} options={PROPERTY_OPTIONS} />
      </Field>
      <Field label="Property extent" htmlFor="e-extent" hint="A rough figure is fine." className="sm:max-w-[320px]">
        <UnitInput
          id="e-extent"
          placeholder="e.g. 10"
          value={form.extent}
          onChange={(v) => set("extent", v)}
          unit={form.unit}
          onUnit={(u) => set("unit", u)}
          units={EXTENT_UNITS}
        />
      </Field>
      <Field label="Road access to the site" required>
        <ChoiceCards label="Road access" name="road" value={form.road} onChange={(v) => set("road", v)} options={ROAD_OPTIONS} />
      </Field>
      <Field label="Can a rig lorry reach the spot?" required hint="Drilling rigs need about 3 m (10 ft) of clear width.">
        <ChoiceCards label="Rig access" name="rig" value={form.rig} onChange={(v) => set("rig", v)} options={RIG_OPTIONS} />
      </Field>
      <Field label="Nearby well or borewell" htmlFor="e-nearby">
        <textarea
          id="e-nearby"
          rows={2}
          maxLength={2000}
          className="field-input"
          placeholder="E.g. neighbour's borewell ~200 ft, good water"
          value={form.nearby}
          onChange={(e) => set("nearby", e.target.value)}
        />
      </Field>
    </FormCard>
  );
}
