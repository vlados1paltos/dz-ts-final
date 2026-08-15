import { GeocodingResult } from "../types/weather";

export function formatLocationName(location: GeocodingResult): string {
  return [location.name, location.country].filter(Boolean).join(", ");
}
