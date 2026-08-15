import { Alert } from "react-bootstrap";

interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <Alert variant="danger">
      Не удалось получить данные. {message}
    </Alert>
  );
}

export default ErrorMessage;
