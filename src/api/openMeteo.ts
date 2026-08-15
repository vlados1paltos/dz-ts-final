import {
  CityWeather,
  CurrentWeatherResponse,
  DailyForecastResponse,
  ForecastRow,
  GeocodingResponse,
  GeocodingResult
} from "../types/weather";

const GEOCODING_API = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_API = "https://api.open-meteo.com/v1/forecast";

async function getJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`API returned ${response.status}`);
  }

  return response.json() as Promise<T>;
}

/**
 * Общий поиск городов.
 * Он используется и для получения координат карточек, и в автодополнении.
 */
export async function searchCities(
  name: string,
  count = 10,
  signal?: AbortSignal,
): Promise<GeocodingResult[]> {
  const params = new URLSearchParams({
    name,
    count: String(count),
    language: "en",
    format: "json",
  });

  const data = await getJson<GeocodingResponse>(
    `${GEOCODING_API}?${params.toString()}`,
    signal,
  );

  return data.results ?? [];
}

/**
 * Для шести городов из задания сначала ищем координаты.
 * Если API возвращает несколько вариантов, предпочитаем город из России.
 */
export async function getCityCoordinates(
  cityName: string,
): Promise<GeocodingResult> {
  const results = await searchCities(cityName, 10);
  const city =
    results.find((item) => item.country_code === "RU") ?? results[0];

  if (!city) {
    throw new Error(`Не удалось найти координаты города ${cityName}`);
  }

  return city;
}

/**
 * Второй запрос карточки — текущая погода уже по координатам.
 */
export async function getCurrentWeather(
  latitude: number,
  longitude: number,
): Promise<CurrentWeatherResponse> {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: "temperature_2m,weather_code,wind_speed_10m",
    wind_speed_unit: "ms",
    timezone: "auto",
  });

  const data = await getJson<CurrentWeatherResponse>(
    `${FORECAST_API}?${params.toString()}`,
  );

  if (!data.current) {
    throw new Error("API не вернул текущую погоду");
  }

  return data;
}

/**
 * Полный сценарий для одной карточки:
 * 1) координаты по названию;
 * 2) текущая погода по координатам.
 */
export async function getWeatherForCity(
  displayName: string,
  searchName: string,
): Promise<CityWeather> {
  const location = await getCityCoordinates(searchName);
  const weather = await getCurrentWeather(
    location.latitude,
    location.longitude,
  );

  return {
    name: displayName,
    latitude: location.latitude,
    longitude: location.longitude,
    temperature: weather.current.temperature_2m,
    weatherCode: weather.current.weather_code,
    windSpeed: weather.current.wind_speed_10m,
  };
}

/**
 * Получает прогноз на 7 дней для страницы выбранного города.
 */
export async function getDailyForecast(
  latitude: number,
  longitude: number,
): Promise<ForecastRow[]> {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    forecast_days: "7",
    timezone: "auto",
  });

  const data = await getJson<DailyForecastResponse>(
    `${FORECAST_API}?${params.toString()}`,
  );

  const daily = data.daily;

  if (
    !daily ||
    !Array.isArray(daily.time) ||
    !Array.isArray(daily.weather_code) ||
    !Array.isArray(daily.temperature_2m_max) ||
    !Array.isArray(daily.temperature_2m_min)
  ) {
    throw new Error("API вернул неполные данные прогноза");
  }

  return daily.time.slice(0, 7).map((date, index) => ({
    date,
    minTemperature: daily.temperature_2m_min[index],
    maxTemperature: daily.temperature_2m_max[index],
    weatherCode: daily.weather_code[index],
  }));
}
