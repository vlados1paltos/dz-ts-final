import { useCallback } from "react";
import { Container } from "react-bootstrap";
import { getWeatherForCity } from "../api/openMeteo";
import AutocompleteInput from "../components/AutocompleteInput";
import ErrorMessage from "../components/ErrorMessage";
import LoadingScreen from "../components/LoadingScreen";
import PageTitle from "../components/PageTitle";
import WeatherGrid from "../components/WeatherGrid";
import { FAVORITE_CITIES } from "../constants/cities";
import { useRequest } from "../hooks/useRequest";
import { CityWeather } from "../types/weather";

function HomePage() {
  const loadWeather = useCallback(
    (): Promise<CityWeather[]> =>
      Promise.all(
        FAVORITE_CITIES.map((city) =>
          getWeatherForCity(city.name, city.searchName),
        ),
      ),
    [],
  );

  const { data, loading, error } = useRequest(loadWeather);

  return (
    <Container className="page py-4 py-md-5">
      <section className="mb-5">
        <PageTitle>Введите город</PageTitle>
        <AutocompleteInput />
      </section>

      <section>
        <PageTitle>Погода в избранных городах</PageTitle>

        {loading && <LoadingScreen text="Получаем текущую погоду..." />}
        {error && <ErrorMessage message={error} />}
        {data && <WeatherGrid cities={data} />}
      </section>
    </Container>
  );
}

export default HomePage;
