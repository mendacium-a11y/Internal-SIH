import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../Assets/App.css';

function NavbarMain() {
  return (
    <Navbar expand="lg" className="bg-dark border-bottom border-body" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand className='navHeading' href="#home">LegalBuddy</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className='navItem' href="#home">RapidServe</Nav.Link>
            <Nav.Link className='navItem' href="#link">People Near You</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarMain;