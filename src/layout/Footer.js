import React from 'react'
import { ChatLeftHeart } from 'react-bootstrap-icons';
import { Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function Footer() {
    return (
        <Container as="footer" className="pt-4 my-md-5 pt-md-5 border-top">
            <Row>
                <Col md>
                    <NavLink to="/" className="link-dark text-decoration-none h2">AnLover <ChatLeftHeart color="red" /></NavLink>
                    <small className="d-block mb-3 text-muted">© Copyright {new Date().getFullYear()}</small>
                </Col>
                <Col sm="6" md>
                    <h5>Anime</h5>
                    <ul className="list-unstyled text-small">
                        <li><NavLink className="text-muted text-decoration-none" to="/">Animes</NavLink></li>
                        <li><NavLink className="text-muted text-decoration-none" to="/">Top Animes</NavLink></li>
                        <li><NavLink className="text-muted text-decoration-none" to="/">Latest Animes</NavLink></li>
                        <li><NavLink className="text-muted text-decoration-none" to="/">Top Episodes</NavLink></li>
                        <li><NavLink className="text-muted text-decoration-none" to="/">Latest Episodes</NavLink></li>
                        <li><NavLink className="text-muted text-decoration-none" to="/">Top Characters</NavLink></li>
                    </ul>
                </Col>
                <Col sm="6" md>
                    <h5>Community</h5>
                    <ul className="list-unstyled text-small">
                        <li><NavLink className="text-muted text-decoration-none" to="/">Discussions</NavLink></li>
                        <li><NavLink className="text-muted text-decoration-none" to="/">Anime News</NavLink></li>
                        <li><NavLink className="text-muted text-decoration-none" to="/">Release Dates</NavLink></li>
                        <li><NavLink className="text-muted text-decoration-none" to="/">Anime Suggestions</NavLink></li>
                    </ul>
                </Col>
                <Col sm="6" md>
                    < h5 > About</h5 >
                    <ul className="list-unstyled text-small">
                        <li><NavLink className="text-muted text-decoration-none" to="/">Team</NavLink></li>
                        <li><NavLink className="text-muted text-decoration-none" to="/">Locations</NavLink></li>
                        <li><NavLink className="text-muted text-decoration-none" to="/">Privacy</NavLink></li>
                        <li><NavLink className="text-muted text-decoration-none" to="/">Terms</NavLink></li>
                        <li><NavLink className="text-muted text-decoration-none" to="/">Feedback</NavLink></li>
                    </ul>
                </Col >
            </Row >
        </Container >
    )
}
