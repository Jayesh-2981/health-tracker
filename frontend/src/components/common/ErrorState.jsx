import { Alert, Button } from "react-bootstrap";

function ErrorState({
  message = "Something went wrong. Please try again.",
  onRetry,
}) {
  return (
    <Alert variant="danger" role="alert">
      <Alert.Heading>Unable to load this content</Alert.Heading>

      <p className="mb-3">{message}</p>

      {onRetry && (
        <Button variant="outline-danger" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </Alert>
  );
}

export default ErrorState;
