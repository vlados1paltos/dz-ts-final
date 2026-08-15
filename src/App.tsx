import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WeatherPage from "./pages/WeatherPage";

/**
 * HashRouter удобен для GitHub Pages:
 * прямые переходы по страницам не требуют настройки сервера.
 */
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/weather/:city" element={<WeatherPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
