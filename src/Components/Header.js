import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Header() {
  return (
    <Navbar
      expand="lg"
      sticky="top"
      bg="dark"
      data-bs-theme="dark"
      className="ms-auto"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img
            src="./bookmyshow-logo.svg"
            alt="BookMyShow Logo"
            height="30"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          <Link to="/search" className="nav-link ms-auto">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Link>
          <Nav className="me-auto my-2 my-lg-0">
            <Link to="/wishlist" className="nav-link ms-auto">
              Wishlist
            </Link>
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
