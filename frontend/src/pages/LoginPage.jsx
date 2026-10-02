import { Button, Card, Container } from "react-bootstrap";
import { getGoogleLoginUrl } from "../services/authService";

function LoginPage() {
  const handleGoogleLogin = () => {
    window.location.href = getGoogleLoginUrl();
  };

  return (
    <Container classname="py-5">
      <div className="d-flex justify-content-center">
        <Card style={{ maxWidth: "420px", width: "100%" }}>
          <Card.Body className="p-4">
            <Card.Title className="mb-3">Health Tracker</Card.Title>

            <Card.Text className="text-muted">
              Sign in with your Google account to continue.
            </Card.Text>

            <Button
              variant="primary"
              className="w-100"
              onClick={handleGoogleLogin}
            >
              Continue with Google
            </Button>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

export default LoginPage;
