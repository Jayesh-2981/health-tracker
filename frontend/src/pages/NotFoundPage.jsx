import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <Container className="py-5 text-center">
      <h1 className="display-4">404</h1>

      <h2 className="h4 mb-3">Page not found</h2>

      <p className="text-muted mb-4">
        The page you are looking for does not exist.
      </p>

      <Button as={Link} to="/" variant="primary">
        Back to Dashboard
      </Button>
    </Container>
  );
}

export default NotFoundPage;
