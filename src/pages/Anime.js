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
            .then(anime => { this.setState({ anime }) })
            .catch(err => { this.setState({ anime: null }) }) // setting anime to null to test for it later
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
                <Helmet><title>{`Anime : ${anime.anime_name}`}</title></Helmet>
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
                                                <p> {anime.anime_description}</p>
                                            </Accordion.Body>
                                        </Accordion.Item>

                                        <Accordion.Item eventKey="details">
                                            <Accordion.Header><h5 className="m-0">Details</h5></Accordion.Header>
                                            <Accordion.Body>
                                                {/* Anime details table */}
                                                <Table striped variant="dark" size="sm">
                                                    <tbody>
                                                        <tr><td>Year        </td><td>{anime.anime_release_year}</td></tr>
                                                        <tr><td>Studio        </td><td>{anime.more_info_result?.anime_studios}</td></tr>
                                                        <tr><td>Episodes      </td><td>{anime.more_info_result?.episodes || anime.episodes?.data?.length}</td></tr>
                                                        <tr><td>Rating        </td><td>{anime.anime_rating}</td></tr>
                                                        <tr><td>Genres        </td><td>{anime.anime_genres}</td></tr>
                                                        <tr><td>Duration      </td><td>{anime.more_info_result?.duration}</td></tr>
                                                        <tr><td>Airing status </td><td>{anime.anime_status}</td></tr>
                                                    </tbody>
                                                </Table>
                                            </Accordion.Body>
                                        </Accordion.Item>

                                        <Accordion.Item eventKey="rating">
                                            <Accordion.Header><h5 className="m-0">Rating</h5></Accordion.Header>
                                            <Accordion.Body>
                                                {/* Anime content ratings */}
                                                {anime.content_rating?.map(rating =>
                                                    <Badge key={rating.content_type} bg={ratingLevelColor[rating.level]} className={`ms-2 text-bg-${ratingLevelColor[rating.level]}`}>
                                                        {rating?.content_type?.replaceAll('_', ' ')} : {rating?.level}
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
                                    <ReactPlayer className="rounded shadow overflow-hidden" url={anime.more_info_result?.trailer_url} controls light pip playing />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h2 id="episodes">Episodes : {anime.more_info_result?.episodes || anime.episodes?.data?.length}</h2>

                                <EpisodeSelector episodes={anime?.episodes?.data} />


                                {/* <div className="p-2 d-flex justify-content-center align-items-center flex-wrap">
                                    {anime.episodes?.data?.map(episode =>
                                        <Link key={episode.episode_number} to={`/episode/${episode.episode_id}`} className="text-decoration-none text-reset">
                                            <Card className="shadow-sm m-2" bg="light" style={{ width: "10rem" }}>
                                                <Card.Body>
                                                    <Card.Title className="h6 text-truncate" title={episode.episode_name}>{episode.episode_name}</Card.Title>
                                                    <Card.Text className="d-flex justify-content-between align-items-center">
                                                        <Badge bg="warning" className="me-2"><StarFill size={10} className="align-center" /> {episode.episode_rating}</Badge>
                                                        <ChatLeftText />
                                                        {episode.episode_watched_history ? <EyeFill /> : <EyeSlashFill />}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Link>
                                    )}
                                </div> */}

                            </Col>
                        </Row>
                    </Container>}
                {!loading && !anime &&
                    <div className="h-100 d-flex align-items-center justify-content-center"><h1>Ops, couldn't find this anime :(</h1></div>
                }
            </Container >
        )
    }
}

export default withParams(Anime)