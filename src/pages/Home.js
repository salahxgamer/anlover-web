import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { CollectionPlayFill, Play } from 'react-bootstrap-icons';

const Home = () => {
    return (
        <>
            <header>
                <Container className="d-flex flex-column align-items-center justify-content-center" style={{ height: "100vh" }}>
                    <h1>Welcome to AnLover</h1>
                    <h4>The free Anime Lovers space</h4>
                    <hr />
                    <Button variant="outline-primary" size="lg" className="mt-3 px-4" href="#one"><Play size={30} /> Start</Button>
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
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default Home;
