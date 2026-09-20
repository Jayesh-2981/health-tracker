import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <>
      <Navbar bg="white" expand="lg" className="border-bottom">
        <Container fluid>
          <Navbar.Brand as={NavLink} to="/">
            Health Tracker
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="health-tracker-navigation" />

          <Navbar.Collapse id="health-tracker-navigation">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/" end>
                Dashboard
              </Nav.Link>

              <Nav.Link as={NavLink} to="/blood-pressure">
                Blood Pressure
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;
