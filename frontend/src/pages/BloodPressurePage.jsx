import { Alert, Card } from "react-bootstrap";
import PageHeader from "../components/common/PageHeader";

function BloodPressurePage() {
  return (
    <>
      <PageHeader
        title="Blood Pressure"
        description="Record and review your blood pressure readings."
      />

      <Card className="shadow-sm">
        <Card.Body>
          <Alert variant="info" className="mb-0">
            The blood pressure tracker is ready for implementation. Recording,
            editing, deleting, and viewing readings will be added in the next
            development batch.
          </Alert>
        </Card.Body>
      </Card>
    </>
  );
}

export default BloodPressurePage;
