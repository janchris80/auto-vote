import { useCallback } from 'react';
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from 'slices/auth';

function Header() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onClick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);


  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
          <Button
            variant="dark"
            className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
            onClick={mobileSidebarToggle}
          >
            <i className="fas fa-ellipsis-v"></i>
          </Button>
          <Navbar.Brand
            as={Link}
            to="/"
            className="mr-2 font-weight-bold text-black"
          >
            <span className='text-red'>Hive</span>Vote
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav mr-auto" navbar>
            <Nav.Item>
              <Nav.Link as={Link} to="/faq" className="m-0">
                FAQ
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/donations" className="m-0">
                <span className="d-lg-block">Donations</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav className="ml-auto" navbar>
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle
                aria-expanded={false}
                aria-haspopup={true}
                as={Nav.Link}
                data-toggle="dropdown"
                id="navbarDropdownMenuLink"
                variant="default"
                className="m-0"
              >
                <span className="no-icon">Support</span>
              </Dropdown.Toggle>

              <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink">
                <Dropdown.Item as={Link} to="/help-video">
                  Help Video
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/contact-us">
                  Contact Us
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {
              isLoggedIn
                ? (<Nav.Item>
                  <Nav.Link as={Link} onClick={handleLogout} className="m-0">
                    Logout
                  </Nav.Link>
                </Nav.Item>)
                : ''
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;