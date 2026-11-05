export interface District {
  id: number;
  name: string;
}

export interface Taluk {
  id: number;
  name: string;
}

export interface LocalBody {
  id: number;
  name: string;
  type: string;
  type_label: string;
  taluk_ids: number[];
}

// Form value. The API validates taluk and panchayat by NAME within the district.
export type Place = { districtId: string; taluk: string; panchayat: string; ward: string };

export type Coords = { lat: number; lng: number };
