import {
  Alert,
  Badge,
  Card,
  Col,
  Container,
  Row,
  Spinner,
} from "react-bootstrap";
import { useHealthStatus } from "../hooks/useHealthStatus.js";

function DashboardPage() {
  const { data, isLoading, isError, error } = useHealthStatus();

  const healthData = data?.data;

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="h3 mb-1">Dashboard</h1>
          <p className="text-body-secondary mb-0">
            Health Tracker application overview.
          </p>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col xs={12} md={6} lg={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>API Status</Card.Title>

              {isLoading && (
                <div className="d-flex align-items-center gap-2">
                  <Spinner animation="border" size="sm" />
                  <span>Checking API...</span>
                </div>
              )}

              {isError && (
                <Alert variant="danger" className="mb-0">
                  <Alert.Heading className="h6">API unavailable</Alert.Heading>

                  <p className="mb-0">
                    {error?.message || "Unable to connect to the backend API."}
                  </p>
                </Alert>
              )}

              {!isLoading && !isError && healthData && (
                <>
                  <div className="mb-3">
                    <Badge bg="success">Connected</Badge>
                  </div>

                  <dl className="row mb-0">
                    <dt className="col-sm-5">Status</dt>
                    <dd className="col-sm-7">{healthData.status}</dd>

                    <dt className="col-sm-5">Service</dt>
                    <dd className="col-sm-7">{healthData.service}</dd>
                  </dl>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={6} lg={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Blood Pressure</Card.Title>
              <Card.Text className="text-body-secondary">
                Track and manage your blood pressure readings.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={6} lg={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Health Tracker</Card.Title>
              <Card.Text className="text-body-secondary">
                Additional health trackers will be added here as the application
                grows.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DashboardPage;
