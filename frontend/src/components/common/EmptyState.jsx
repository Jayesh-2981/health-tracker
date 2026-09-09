import { Card } from "react-bootstrap";

function EmptyState({
  title = "Nothing here yet",
  message = "There is no information to display.",
  action,
}) {
  return (
    <Card className="border-0 shadow-sm">
      <Card.Body className="text-center py-5">
        <h2 className="h5">{title}</h2>

        <p className="text-muted mb-0">{message}</p>

        {action && <div className="mt-3">{action}</div>}
      </Card.Body>
    </Card>
  );
}

export default EmptyState;
