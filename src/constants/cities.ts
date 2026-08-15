import { FavoriteCity } from "../types/weather";

/**
 * Названия для отображения оставлены как в задании.
 * searchName используется только для более точного поиска координат через API.
 */
export const FAVORITE_CITIES: FavoriteCity[] = [
  { name: "Moscow", searchName: "Moscow" },
  { name: "St Petersburg", searchName: "Saint Petersburg" },
  { name: "Rostov-on-Don", searchName: "Rostov-on-Don" },
  { name: "Vladivostok", searchName: "Vladivostok" },
  { name: "Krasnodar", searchName: "Krasnodar" },
  { name: "Yekaterinburg", searchName: "Yekaterinburg" }
];
