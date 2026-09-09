import { Spinner } from "react-bootstrap";

function LoadingState({ message = "Loading..." }) {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center py-5"
      role="status"
      aria-live="polite"
    >
      <Spinner animation="border" className="mb-3" />

      <span className="text-muted">{message}</span>
    </div>
  );
}

export default LoadingState;
