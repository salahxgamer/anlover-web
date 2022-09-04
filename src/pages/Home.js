import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { CollectionPlayFill, Play } from 'react-bootstrap-icons';

const Home = () => {
    return (
        <>
            <header>
                <Container className="d-flex flex-column align-items-center justify-content-center" style={{ height: "100vh" }}>
                    <h1>Welcome to AnLover</h1>
                    <h4>The free Anime Lovers space</h4>
                    <hr />
                    <Button as={Link} variant="outline-primary" size="lg" className="mt-3 px-4" to="/animes"><Play size={30} /> Start Watching</Button>
                </Container>
            </header>
            <section id="one">
                <Container className="d-flex flex-column align-items-center justify-content-center" style={{ height: "100vh" }}>
                    <Row className="bg-primary text-white p-5" style={{ height: "60%" }} >
                        <Col md className="d-flex align-items-center justify-content-center">
                            <CollectionPlayFill size={100} />
                        </Col>
                        <Col className="d-flex align-items-center justify-content-center">
                            <p>
                                This is a free website to whatch anime with many features that are coming
                                Just click start watching button above and create a free account to start watching,
                                it is still in developement phase so a lot of changes are gonna happen in the feature.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default Home;
