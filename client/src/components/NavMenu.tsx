import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavMenu = () => {
  const { user, logout } = useContext(AuthContext) as AuthContextType;

  return (
    <Navbar
      expand="lg"
      bg="dark"
      data-bs-theme="dark"
      fixed="top"
      className="mb-4 p-0"
    >
      <Container>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {user ? (
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" onClick={logout}>
                Log Out
              </Nav.Link>
            </Nav>
          ) : (
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Sign Up
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavMenu;
