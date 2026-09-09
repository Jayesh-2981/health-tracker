import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import AppNavbar from "../components/navigation/AppNavbar";
import Sidebar from "../components/navigation/Sidebar";

function AppLayout() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  function handleMenuClick() {
    setShowMobileMenu(true);
  }

  function handleHideMobileMenu() {
    setShowMobileMenu(false);
  }

  return (
    <div className="min-vh-100 bg-light">
      <AppNavbar onMenuClick={handleMenuClick} />

      <Container fluid>
        <Row className="g-0">
          <Col lg={2}>
            <Sidebar
              showMobileMenu={showMobileMenu}
              onHideMobileMenu={handleHideMobileMenu}
            />
          </Col>

          <Col lg={10}>
            <main className="p-3 p-md-4">
              <Outlet />
            </main>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AppLayout;
