import { useCallback } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getDailyForecast } from "../api/openMeteo";
import ErrorMessage from "../components/ErrorMessage";
import LoadingScreen from "../components/LoadingScreen";
import PageTitle from "../components/PageTitle";
import { useRequest } from "../hooks/useRequest";
import { ForecastRow } from "../types/weather";
import { formatForecastDate } from "../utils/date";
import { getWeatherDescription } from "../utils/weather";

function WeatherPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { city = "Город" } = useParams<{ city: string }>();

  const params = new URLSearchParams(location.search);
  const latitude = Number(params.get("lat"));
  const longitude = Number(params.get("lng"));

  const displayCity = decodeURIComponent(city);
  const hasCoordinates =
    Number.isFinite(latitude) && Number.isFinite(longitude);

  const loadForecast = useCallback((): Promise<ForecastRow[]> => {
    if (!hasCoordinates) {
      return Promise.reject(new Error("В ссылке нет корректных координат"));
    }

    return getDailyForecast(latitude, longitude);
  }, [hasCoordinates, latitude, longitude]);

  const { data, loading, error } = useRequest(loadForecast);

  return (
    <Container className="page py-4 py-md-5">
      <Button
        variant="link"
        className="back-link px-0 mb-3"
        onClick={() => navigate("/")}
      >
        ← Назад
      </Button>

      <PageTitle>Прогноз погоды в городе {displayCity}</PageTitle>

      {loading && <LoadingScreen text="Получаем прогноз на 7 дней..." />}
      {error && <ErrorMessage message={error} />}

      {data && (
  <>
    {/* На планшетах и desktop оставляем таблицу в формате из задания. */}
    <div className="d-none d-md-block">
      <Table
        bordered
        hover
        responsive
        className="forecast-table bg-white align-middle"
      >
        <thead>
          <tr>
            <th>Показатель</th>

            {data.map((day) => (
              <th key={day.date}>{formatForecastDate(day.date)}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr>
            <th>Мин. темп.</th>

            {data.map((day) => (
              <td key={`min-${day.date}`}>
                {day.minTemperature.toFixed(1)}°C
              </td>
            ))}
          </tr>

          <tr>
            <th>Макс. темп.</th>

            {data.map((day) => (
              <td key={`max-${day.date}`}>
                {day.maxTemperature.toFixed(1)}°C
              </td>
            ))}
          </tr>

          <tr>
            <th>Погода</th>

            {data.map((day) => (
              <td key={`weather-${day.date}`}>
                {getWeatherDescription(day.weatherCode)}
              </td>
            ))}
          </tr>
        </tbody>
      </Table>
    </div>

    {/* На телефоне разворачиваем данные вертикально,
        чтобы весь прогноз помещался без горизонтальной прокрутки. */}
    <div className="d-md-none">
      <Table bordered hover className="mobile-forecast-table bg-white">
        <thead>
          <tr>
            <th>Дата</th>
            <th>Мин.</th>
            <th>Макс.</th>
            <th>Погода</th>
          </tr>
        </thead>

        <tbody>
          {data.map((day) => (
            <tr key={day.date}>
              <td>{formatForecastDate(day.date)}</td>
              <td>{day.minTemperature.toFixed(1)}°C</td>
              <td>{day.maxTemperature.toFixed(1)}°C</td>
              <td>{getWeatherDescription(day.weatherCode)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  </>
)}
    </Container>
  );
}

export default WeatherPage;
