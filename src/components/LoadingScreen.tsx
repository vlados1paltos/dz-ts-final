import { Spinner } from "react-bootstrap";

interface LoadingScreenProps {
  text?: string;
}

function LoadingScreen({ text = "Загрузка..." }: LoadingScreenProps) {
  return (
    <div className="loading-screen" aria-live="polite">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">{text}</span>
      </Spinner>
      <span>{text}</span>
    </div>
  );
}

export default LoadingScreen;
