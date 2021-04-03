import { Navbar, Nav, Form, FormControl, Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { LinkContainer } from 'react-router-bootstrap'


const Navigation = () => {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="#home">Pixelpedia</Navbar.Brand>
        <Nav className="mr-auto">
        </Nav>
        <Button variant="outline-secondary">☀️</Button>
        <Button variant="outline-info" href="/signIn">Sign In</Button>
      </Navbar>
    </>

  );
}

export default Navigation;