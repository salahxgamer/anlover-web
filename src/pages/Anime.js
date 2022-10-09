import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import { Accordion, Badge, Col, Container, Row, Spinner, Table } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { toast } from 'react-toastify';
import EpisodeSelector from '../components/EpisodeSelector';
import ScrollToTop from '../components/ScrollToTop';
import API from '../utils/api';
import { withParams } from '../utils/helper';
import AnimeModel from '../models/Anime';


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
        toast.promise(API.getAnime(this.props.params?.animeId),
            {
                pending: 'Loading anime ...',
                success: 'Anime loaded successfuly',
                error: 'Couldn\'t load anime'
            }, { toastId: "PAGE_LOADING", autoClose: 500 })
            .then(rsp => rsp.data)
            .then(serializedAnime => new AnimeModel(serializedAnime))
            .then(anime => { this.setState({ anime }) })
            .catch(() => { this.setState({ anime: null }) }) // setting anime to null to test for it later
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
                <Helmet><title>{`Anime : ${anime?.title}`}</title></Helmet>
                <ScrollToTop />
                <h1 className="my-2">
                    {/* Display spinner while loading */}
                    {loading && <Spinner animation="grow" variant="primary" />}
                    Anime
                </h1 >
                {!loading && anime &&
                    <Container fluid>
                        <Row className="position-relative mb-5">

                            {/* Background image */}
                            <div className="position-absolute h-100" style={{
                                backgroundImage: `url(${anime.images.banner || anime.images.coverFull || anime.images.cover})`,
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
                                        src={anime.images.coverFull || anime.images.cover}
                                        alt={anime.title} />
                                </div>
                            </Col>

                            <Col md={8} className="d-flex flex-column justify-content-center p-5">
                                <div className="text-bg-dark opacity-75 p-4 rounded-3 shadow h-100">

                                    <h2> {anime.title} </h2>


                                    <Accordion defaultActiveKey={["description", "details", "rating"]} alwaysOpen flush
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
                                            <Accordion.Header><h5 className="m-0">Description</h5></Accordion.Header>
                                            <Accordion.Body>
                                                <p> {anime.description}</p>
                                            </Accordion.Body>
                                        </Accordion.Item>

                                        <Accordion.Item eventKey="details">
                                            <Accordion.Header><h5 className="m-0">Details</h5></Accordion.Header>
                                            <Accordion.Body>
                                                {/* Anime details table */}
                                                <Table striped variant="dark" size="sm">
                                                    <tbody>
                                                        <tr><td>Year        </td><td>{anime.releaseYear}</td></tr>
                                                        <tr><td>Studio        </td><td>{anime.studiosLabels}</td></tr>
                                                        <tr><td>Episodes      </td><td>{anime.episodesCount}</td></tr>
                                                        <tr><td>Rating        </td><td>{anime.rating}</td></tr>
                                                        <tr><td>Genres        </td><td>{anime.genresLabels.join(" ")}</td></tr>
                                                        <tr><td>Duration      </td><td>{anime.duration}</td></tr>
                                                        <tr><td>Airing status </td><td>{anime.status}</td></tr>
                                                    </tbody>
                                                </Table>
                                            </Accordion.Body>
                                        </Accordion.Item>

                                        <Accordion.Item eventKey="rating">
                                            <Accordion.Header><h5 className="m-0">Rating</h5></Accordion.Header>
                                            <Accordion.Body>
                                                {/* Anime content ratings */}
                                                {anime.contentRating?.map(rating =>
                                                    <Badge key={rating.content_type} bg={ratingLevelColor[rating.level]} className={`ms-2 text-bg-${ratingLevelColor[rating.level]}`}>
                                                        {rating.label} : {rating.level}
                                                    </Badge>
                                                )}
                                            </Accordion.Body>
                                        </Accordion.Item>

                                    </Accordion>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <h2>Trailer :</h2>
                            <Col>
                                <div className="p-5 d-flex justify-content-center align-items-center">
                                    <ReactPlayer className="rounded shadow overflow-hidden" url={anime.trailerUrl} controls light pip playing />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h2 id="episodes">Episodes : {anime.episodesCount}</h2>

                                <EpisodeSelector episodes={anime.episodes} />

                            </Col>
                        </Row>
                    </Container>}
                {!loading && !anime &&
                    <div className="h-100 d-flex align-items-center justify-content-center"><h1>Ops, couldn&apos;t find this anime :(</h1></div>
                }
            </Container >
        )
    }
}

export default withParams(Anime)