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

// Revenue village (LGD) of a panchayat / municipality
export interface Village {
  id: number;
  name: string;
}

// Form value. The API validates taluk, panchayat and village by NAME within the district.
export type Place = { districtId: string; taluk: string; panchayat: string; village: string };

export type Coords = { lat: number; lng: number };
