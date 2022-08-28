import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { Container, Row, Col, Spinner, Table, Badge, Accordion } from 'react-bootstrap';
import { withParams } from '../utils/helper';
import API from '../utils/api';


class Anime extends Component {
    static propTypes = {
        params: PropTypes.shape({
            animeId: PropTypes.string.isRequired
        })
    }

    constructor(props) {
        super(props)
        this.state = {
            // empty object as placeholder
            anime: {},
            loading: true
        }
    }

    componentDidMount() {
        API.getAnime(this.props.params?.animeId)
            .then(anime => { this.setState({ anime }); return anime })
            .catch(console.error)
            .finally((() => { this.setState({ loading: false }) }))

    }
    render() {
        const { anime, loading } = this.state
        const ratingLevelColor = {
            "none": "success",
            "mild": "info",
            "moderate": "warning",
            "severe": "danger"
        }

        return (
            <Container fluid>
                <h1 className="my-2">
                    {/* Display spinner while loading */}
                    {loading && <Spinner animation="grow" variant="primary" />}
                    Anime
                </h1 >
                {!loading &&
                    <Container fluid>
                        <Row className="position-relative">

                            {/* Background image */}
                            <div className="position-absolute h-100" style={{
                                backgroundImage: `url(${anime.anime_banner_image_url || anime.anime_cover_image_full_url || anime.anime_cover_image_url})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                zIndex: "-1",
                                filter: "grayscale(0.8) blur(10px)",
                            }} />

                            <Col md={4}>
                                {/* Anime cover image */}
                                <div className="p-5 d-flex justify-content-center align-items-center h-100">
                                    <img style={{ width: "100%" }}
                                        className="rounded shadow"
                                        src={anime.anime_cover_image_full_url || anime.anime_cover_image_url}
                                        alt={anime.anime_name} />
                                </div>
                            </Col>

                            <Col md={8} className="d-flex flex-column justify-content-center p-5">
                                <div className="text-bg-dark opacity-75 p-4 rounded-3 shadow h-100">

                                    <h2> {anime.anime_name} </h2>


                                    <Accordion defaultActiveKey={["description", "info", "rating"]} alwaysOpen flush
                                        style={{
                                            "--bs-accordion-color": "auto",
                                            "--bs-accordion-bg": "none",
                                            "--bs-accordion-border-color": "none",
                                            "--bs-accordion-btn-padding-x": "0",
                                            "--bs-accordion-btn-padding-y": ".5rem",
                                            "--bs-accordion-btn-color": "auto",
                                            "--bs-accordion-btn-bg": "none",
                                            "--bs-accordion-body-padding-x": "auto",
                                            "--bs-accordion-body-padding-y": "auto",
                                            "--bs-accordion-active-color": "none",
                                            "--bs-accordion-active-bg": "none",
                                        }}
                                    >

                                        <Accordion.Item eventKey="description">
                                            <Accordion.Header>Description</Accordion.Header>
                                            <Accordion.Body>
                                                <p> {anime.anime_description}</p>
                                            </Accordion.Body>
                                        </Accordion.Item>

                                        <Accordion.Item eventKey="info">
                                            <Accordion.Header>Info</Accordion.Header>
                                            <Accordion.Body>
                                                {/* Anime info table */}
                                                <Table striped variant="dark" size="sm">
                                                    <tbody>
                                                        <tr><td>Year :        </td><td>{anime.anime_release_year}</td></tr>
                                                        <tr><td>Studio :        </td><td>{anime.more_info_result?.anime_studios}</td></tr>
                                                        <tr><td>Episodes :      </td><td>{anime.more_info_result?.episodes}</td></tr>
                                                        <tr><td>Rating :        </td><td>{anime.anime_rating}</td></tr>
                                                        <tr><td>Genres :        </td><td>{anime.anime_genres}</td></tr>
                                                        <tr><td>Duration :      </td><td>{anime.more_info_result?.duration}</td></tr>
                                                        <tr><td>Airing status : </td><td>{anime.anime_status}</td></tr>
                                                    </tbody>
                                                </Table>
                                            </Accordion.Body>
                                        </Accordion.Item>

                                        <Accordion.Item eventKey="rating">
                                            <Accordion.Header>Rating</Accordion.Header>
                                            <Accordion.Body>
                                                {/* Anime content ratings */}
                                                {anime.content_rating.map(rating =>
                                                    <Badge className="ms-2" bg={ratingLevelColor[rating.level]}>
                                                        {rating.content_type} : {rating.level}
                                                    </Badge>
                                                )}
                                            </Accordion.Body>
                                        </Accordion.Item>

                                    </Accordion>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="p-5 d-flex justify-content-center align-items-center">
                                    <ReactPlayer className="rounded shadow overflow-hidden" url={anime.more_info_result.trailer_url} controls light pip playing />
                                </div>
                            </Col>
                        </Row>
                    </Container>}
            </Container >
        )
    }
}

export default withParams(Anime)