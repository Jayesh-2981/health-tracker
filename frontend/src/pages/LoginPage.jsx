import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={7} lg={5}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4 p-md-5 text-center">
              <h1 className="h3 mb-3">Sign in to Health Tracker</h1>

              <p className="text-muted mb-4">
                Sign in with Google to access your personal health tracking
                data.
              </p>

              <Button variant="primary" size="lg" className="w-100" disabled>
                Google Sign-In
              </Button>

              <p className="small text-muted mt-3 mb-0">
                Google authentication will be connected in the authentication
                milestone.
              </p>

              <div className="mt-4">
                <Link to="/">Return to Dashboard</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
