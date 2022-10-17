import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AnimeDetails from '../components/AnimeDetails';
import AnimeTrailer from '../components/AnimeTrailer';
import AnimeSuggestions from '../components/AnimeSuggestions';
import EpisodeSelector from '../components/EpisodeSelector';
import ScrollToTop from '../components/ScrollToTop';
import AnimeModel from '../models/Anime';
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
            /** @type {?AnimeModel} */
            anime: null,
            loading: true,
            error: null
        }
    }

    componentDidMount() {
        this.fetchAnime(this.props.params?.animeId);
    }

    componentDidUpdate(prevProps) {
        if (this.props.params?.animeId !== prevProps.params?.animeId) {
            this.fetchAnime(this.props.params?.animeId);
        }
    }

    fetchAnime(animeId) {
        this.setState({ loading: true, error: null });
        toast.promise(API.getAnime(animeId),
            {
                pending: 'Loading anime ...',
                success: 'Anime loaded successfuly',
                error: 'Couldn\'t load anime'
            }, { toastId: "PAGE_LOADING", autoClose: 500 })
            .then(rsp => rsp.data)
            .then(serializedAnime => new AnimeModel(serializedAnime))
            .then(anime => { this.setState({ anime }); })
            .catch((error) => { this.setState({ anime: null, error }); })
            .finally((() => { this.setState({ loading: false }); }));
    }

    render() {
        const { anime, loading, error } = this.state


        if (loading) return (
            <div className="h-100 d-flex align-items-center justify-content-center">
                <Spinner animation="border" variant="primary" />
            </div>
        )


        if (error || !anime) return (
            <div className="h-100 d-flex flex-column align-items-center justify-content-center">
                <h1>Ops, couldn&apos;t find this anime.</h1>
                <p className="text-muted">{error.message}</p>
                <Link to="/animes" className="btn btn-link btn-sm">Go back to animes page</Link>
            </div>
        )

        return (
            <Container fluid>
                <Helmet><title>{`Anime : ${anime?.title}`}</title></Helmet>
                <ScrollToTop />
                <Row as="section">
                    <AnimeDetails anime={anime} />
                </Row>
                <Container>
                    <Row as="section" className="mt-3" id="trailer">
                        <h2>Trailer :</h2>
                        <Col>
                            <AnimeTrailer trailerUrl={anime.trailerUrl} />
                        </Col>
                    </Row>
                    <Row as="section" className="mt-3" id="episodes">
                        <h2 >Episodes : {anime.episodesCount}</h2>
                        <Col>
                            <EpisodeSelector episodes={anime.episodes} />
                        </Col>
                    </Row>
                    <Row as="section" className="mt-3" id="related">
                        <h2 >Related :</h2>
                        <Col>
                            <AnimeSuggestions animes={anime.relatedAnimes} />
                        </Col>
                    </Row>
                    <Row as="section" className="mt-3" id="recommended">
                        <h2 >Recommended :</h2>
                        <Col>
                            <AnimeSuggestions animes={anime.recommendations} />
                        </Col>
                    </Row>
                </Container>
            </Container >
        )
    }
}

export default withParams(Anime)