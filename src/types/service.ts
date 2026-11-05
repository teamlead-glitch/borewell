// GET /services (MasterController@services)
export interface ApiService {
  id: number;
  name: string;
  short_description: string | null;
  description: string | null;
  image_url: string | null;
  // Not selectable on provider registration; granted by the admin after verification
  is_verified_only: boolean;
}

// What the UI uses: always has an image and a short line
export interface Service {
  id: number;
  name: string;
  short: string;
  description: string;
  image: string;
  verifiedOnly: boolean;
}
