import { Container, Navbar } from "react-bootstrap";

function AppNavbar({ onMenuClick }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container fluid className="px-3 px-lg-4">
        <Navbar.Brand href="/" className="fw-semibold">
          Health Tracker
        </Navbar.Brand>

        <Navbar.Toggle aria-label="Open navigation" onClick={onMenuClick} />
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
