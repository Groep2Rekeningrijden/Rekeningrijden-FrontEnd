import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navbar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" class="navbar navbar-expand-lg navbar-dark bg-primary">
      <Container>
        <Navbar.Brand href="#home">Rekeningrijden</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#cars">Mijn Auto's</Nav.Link>
            <Nav.Link href="#pricing">Factures</Nav.Link>
            <Nav.Link href="#routes">Ritten</Nav.Link>            
          </Nav>         
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar;