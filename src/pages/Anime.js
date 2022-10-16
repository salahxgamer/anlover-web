import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AnimeDetails from '../components/AnimeDetails';
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
        toast.promise(API.getAnime(this.props.params?.animeId),
            {
                pending: 'Loading anime ...',
                success: 'Anime loaded successfuly',
                error: 'Couldn\'t load anime'
            }, { toastId: "PAGE_LOADING", autoClose: 500 })
            .then(rsp => rsp.data)
            .then(serializedAnime => new AnimeModel(serializedAnime))
            .then(anime => { this.setState({ anime }) })
            .catch((error) => { this.setState({ anime: null, error }) })
            .finally((() => { this.setState({ loading: false }) }))

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
                    <Row as="section">
                        <h2>Trailer :</h2>
                        <Col>
                            <div className="p-5 d-flex justify-content-center align-items-center">
                                <ReactPlayer className="rounded shadow overflow-hidden" url={anime.trailerUrl} controls light pip playing />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <h2 id="episodes">Episodes : {anime.episodesCount}</h2>
                        <Col>
                            <EpisodeSelector episodes={anime.episodes} />
                        </Col>
                    </Row>
                </Container>
            </Container >
        )
    }
}

export default withParams(Anime)