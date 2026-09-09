import { BrowserRouter } from "react-router-dom";
import { Alert, Container, Spinner } from "react-bootstrap";
import { useHealthStatus } from "./hooks/useHealthStatus";

function App() {
  const { data, isLoading, isError } = useHealthStatus();

  return (
    <BrowserRouter>
      <Container className="py-4">
        <h1>Health Tracker</h1>

        <p className="text-muted">Your personal health tracking application.</p>

        {isLoading && (
          <div className="d-flex align-items-center gap-2">
            <Spinner size="sm" />
            <span>Connecting to API...</span>
          </div>
        )}

        {isError && (
          <Alert variant="danger">
            Unable to connect to the Health Tracker API.
          </Alert>
        )}

        {data?.success && (
          <Alert variant="success">API Connected successfully.</Alert>
        )}
      </Container>
    </BrowserRouter>
  );
}

export default App;
