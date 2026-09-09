import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function NavigationLinks({ onNavigate }) {
  return (
    <Nav className="flex-column gap-1">
      <Nav.Link as={NavLink} to="/" end onClick={onNavigate}>
        Dashboard
      </Nav.Link>

      <Nav.Link as={NavLink} to="/blood-pressure" onClick={onNavigate}>
        Blood Pressure
      </Nav.Link>

      <Nav.Link as={NavLink} to="/login" onClick={onNavigate}>
        Sign In
      </Nav.Link>
    </Nav>
  );
}

export default NavigationLinks;
