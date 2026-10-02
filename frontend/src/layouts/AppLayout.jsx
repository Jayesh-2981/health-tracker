import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth.js";
import { logout } from "../services/authService.js";

function AppLayout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      queryClient.removeQueries({
        queryKey: ["auth", "me"],
      });

      navigate("/login", { replace: true });
    }
  };

  return (
    <>
      <Navbar bg="white" expand="lg" className="border-bottom">
        <Container fluid>
          <Navbar.Brand as={NavLink} to="/">
            Health Tracker
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="health-tracker-navigation" />

          <Navbar.Collapse id="health-tracker-navigation">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/" end>
                Dashboard
              </Nav.Link>

              <Nav.Link as={NavLink} to="/blood-pressure">
                Blood Pressure
              </Nav.Link>
            </Nav>

            <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
              <div className="text-lg-end">
                <div className="fw-semibold">{user?.name || user?.email}</div>

                {user?.name && (
                  <div className="small text-muted">{user.email}</div>
                )}
              </div>

              <Button
                variant="outline-secondary"
                size="sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
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
