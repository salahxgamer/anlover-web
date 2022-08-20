import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { ChatLeftHeart, PersonCircle } from 'react-bootstrap-icons';

import { useLocation, useNavigate } from 'react-router-dom';


function NavBar() {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" onSelect={navigate} >
            <Container>
                <Navbar.Brand eventKey="/">AnLover <ChatLeftHeart color="red" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto" activeKey={location.pathname}>
                        <Nav.Link eventKey="/">Animes</Nav.Link>
                        <Nav.Link eventKey="/animes">Latest</Nav.Link>
                        <NavDropdown menuVariant="dark" title="More" id="collasible-nav-dropdown">
                            <NavDropdown.Item eventKey="/news">News</NavDropdown.Item>
                            <NavDropdown.Item eventKey="/characters">Characters</NavDropdown.Item>
                            <NavDropdown.Item eventKey="/movies">Movies</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item eventKey="/import">Import lists</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav activeKey={location.pathname}>
                        <Nav.Link eventKey="/lists">My Lists</Nav.Link>
                        <Nav.Link eventKey="/profile"><PersonCircle size={20} /></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;