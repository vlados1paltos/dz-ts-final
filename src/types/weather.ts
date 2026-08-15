export interface FavoriteCity {
  name: string;
  searchName: string;
}

export interface GeocodingResult {
  id?: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  country_code?: string;
  admin1?: string;
  timezone?: string;
}

export interface GeocodingResponse {
  results?: GeocodingResult[];
}

export interface CurrentWeatherResponse {
  current: {
    time: string;
    temperature_2m: number;
    weather_code: number;
    wind_speed_10m: number;
  };
}

export interface DailyForecastResponse {
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

export interface CityWeather {
  name: string;
  latitude: number;
  longitude: number;
  temperature: number;
  weatherCode: number;
  windSpeed: number;
}

export interface ForecastRow {
  date: string;
  minTemperature: number;
  maxTemperature: number;
  weatherCode: number;
}
