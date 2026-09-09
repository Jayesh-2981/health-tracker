import { Offcanvas } from "react-bootstrap";
import NavigationLinks from "./NavigationLinks";

function Sidebar({ showMobileMenu, onHideMobileMenu }) {
  return (
    <>
      <aside className="d-none d-lg-block border-end min-vh-100 p-3">
        <NavigationLinks />
      </aside>

      <Offcanvas
        show={showMobileMenu}
        onHide={onHideMobileMenu}
        responsive="lg"
        placement="start"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Health Tracker</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <NavigationLinks onNavigate={onHideMobileMenu} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;
