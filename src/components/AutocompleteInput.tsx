import { useEffect, useState } from "react";
import { Form, ListGroup, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { searchCities } from "../api/openMeteo";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { GeocodingResult } from "../types/weather";
import { formatLocationName } from "../utils/location";

function AutocompleteInput() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const debouncedQuery = useDebouncedValue(query, 350);

  useEffect(() => {
    const value = debouncedQuery.trim();

    if (value.length < 2) {
      setResults([]);
      setOpen(false);
      setLoading(false);
      setError("");
      return;
    }

    const controller = new AbortController();

    setLoading(true);
    setError("");

    searchCities(value, 10, controller.signal)
      .then((items) => {
        setResults(items);
        setOpen(true);
      })
      .catch((requestError: unknown) => {
        if (
          requestError instanceof Error &&
          requestError.name === "AbortError"
        ) {
          return;
        }

        setResults([]);
        setOpen(true);
        setError("Не удалось загрузить варианты");
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [debouncedQuery]);

  const selectCity = (city: GeocodingResult) => {
    const fullName = formatLocationName(city);

    setQuery(fullName);
    setOpen(false);

    navigate(
      `/weather/${encodeURIComponent(city.name)}?lat=${city.latitude}&lng=${city.longitude}`,
    );
  };

  return (
    <div className="autocomplete">
      <Form.Label htmlFor="city-search" className="fw-semibold">
        Введите город
      </Form.Label>

      <Form.Control
        id="city-search"
        type="text"
        value={query}
        placeholder="Начните вводить название"
        autoComplete="off"
        aria-autocomplete="list"
        aria-expanded={open}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
        }}
        onFocus={() => {
          if (results.length > 0 || loading || error) {
            setOpen(true);
          }
        }}
      />

      {open && (
        <ListGroup className="autocomplete__list shadow-sm">
          {loading && (
            <ListGroup.Item className="d-flex align-items-center gap-2">
              <Spinner animation="border" size="sm" />
              Поиск...
            </ListGroup.Item>
          )}

          {!loading &&
            results.map((city) => (
              <ListGroup.Item
                key={`${city.id ?? city.name}-${city.latitude}-${city.longitude}`}
                action
                onClick={() => selectCity(city)}
              >
                {formatLocationName(city)}
              </ListGroup.Item>
            ))}

          {!loading && error && (
            <ListGroup.Item className="text-danger">{error}</ListGroup.Item>
          )}

          {!loading && !error && results.length === 0 && (
            <ListGroup.Item>Ничего не найдено</ListGroup.Item>
          )}
        </ListGroup>
      )}
    </div>
  );
}

export default AutocompleteInput;
