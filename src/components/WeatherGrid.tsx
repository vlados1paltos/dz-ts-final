import { Col, Row } from "react-bootstrap";
import { CityWeather } from "../types/weather";
import WeatherCard from "./WeatherCard";

interface WeatherGridProps {
  cities: CityWeather[];
}

/**
 * Bootstrap Grid:
 * xs=12 — одна карточка,
 * md=6 — две,
 * lg=4 — три.
 */
function WeatherGrid({ cities }: WeatherGridProps) {
  return (
    <Row className="g-4">
      {cities.map((city) => (
        <Col key={city.name} xs={12} md={6} lg={4}>
          <WeatherCard weather={city} />
        </Col>
      ))}
    </Row>
  );
}

export default WeatherGrid;
