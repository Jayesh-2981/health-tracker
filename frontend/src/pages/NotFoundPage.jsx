import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <Container className="py-5 text-center">
      <h1>Page Not Found</h1>
      <p className="text-muted">The page you are looking for does not exist.</p>

      <Button as={Link} to="/" variant="primary">
        Go to Dashboard
      </Button>
    </Container>
  );
}

export default NotFoundPage;
