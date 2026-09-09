import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";

function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Overview of your health tracking activity."
      />

      <Row className="g-4">
        <Col md={6} xl={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Blood Pressure</Card.Title>

              <Card.Text className="text-muted">
                Record and review your blood pressure readings.
              </Card.Text>

              <Link to="/blood-pressure" className="btn btn-primary">
                Open Tracker
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} xl={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Recent Activity</Card.Title>

              <Card.Text className="text-muted">
                Your recent health records will appear here once tracking is
                available.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} xl={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Health Trackers</Card.Title>

              <Card.Text className="text-muted">
                Blood Pressure is currently the first available tracker.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default DashboardPage;
