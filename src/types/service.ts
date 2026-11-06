// GET /services (MasterController@services)
export interface ApiService {
  id: number;
  name: string;
  short_description: string | null;
  description: string | null;
  image_url: string | null;
  // Team-only service (set in the database): left out of provider registration, never shown
  is_verified_only: boolean;
}

// What the UI uses: always has an image and a short line
export interface Service {
  id: number;
  name: string;
  short: string;
  description: string;
  image: string;
  // False for team-only services: only used to leave them out of provider registration
  providerSelectable: boolean;
}
