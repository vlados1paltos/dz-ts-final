import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CityWeather } from "../types/weather";
import { getWeatherDescription } from "../utils/weather";

interface WeatherCardProps {
  weather: CityWeather;
}

function WeatherCard({ weather }: WeatherCardProps) {
  const navigate = useNavigate();

  const openForecast = () => {
    const city = encodeURIComponent(weather.name);

    navigate(
      `/weather/${city}?lat=${weather.latitude}&lng=${weather.longitude}`,
    );
  };

  return (
    <Card className="weather-card h-100 shadow-sm">
      <Card.Body className="d-flex flex-column">
        <Card.Title>{weather.name}</Card.Title>

        <div className="weather-card__info">
          <p>
            <strong>Температура:</strong> {weather.temperature.toFixed(1)}°C
          </p>
          <p>
            <strong>Состояние:</strong>{" "}
            {getWeatherDescription(weather.weatherCode)}
          </p>
          <p>
            <strong>Скорость ветра:</strong> {weather.windSpeed.toFixed(2)} м/с
          </p>
        </div>

        <Button className="mt-auto align-self-start" onClick={openForecast}>
          Смотреть прогноз
        </Button>
      </Card.Body>
    </Card>
  );
}

export default WeatherCard;
