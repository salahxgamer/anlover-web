import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import { toast } from 'react-toastify';
import { Container, Spinner, Col, Row } from 'react-bootstrap';
import { withParams } from '../utils/helper'
import API from '../utils/api'
import ScrollToTop from '../components/ScrollToTop';
import EpisodePlayer from '../components/EpisodePlayer';

class Episode extends Component {
    static propTypes = {
        params: PropTypes.shape({
            episodeId: PropTypes.string.isRequired
        })
    }

    constructor(props) {
        super(props)
        this.state = {
            // empty object as placeholder
            episode: {},
            loading: true,
            player_url: "",
            providers: []
        }
    }

    componentDidMount() {
        toast.promise(API.getEpisode(this.props.params?.episodeId),
            {
                pending: 'Loading episode ...',
                success: 'Episode loaded successfuly',
                error: 'Couldn\'t load episode'
            }, { toastId: "PAGE_LOADING", autoClose: 500 })
            .then(rsp => rsp.data)
            .then(episode => { this.setState({ episode, providers: episode.providers }); return episode })
            .catch(err => { this.setState({ episode: null }); console.error(err) })
            .finally((() => { this.setState({ loading: false }) }))

    }
    render() {
        const { episode, providers, loading } = this.state
        return (
            <Container fluid>
                <Helmet><title>{`Episode : ${episode.episode_name}`}</title></Helmet>
                <ScrollToTop />
                <h1 className="my-2">
                    {/* Display spinner while loading */}
                    {loading && <Spinner animation="grow" variant="primary" />}
                    Episode : {episode?.episode_name}
                </h1 >
                {!loading && episode &&
                    <Container fluid>
                        <Row>

                            <Col className="d-flex flex-column align-items-center justify-content-center mb-4">
                                <EpisodePlayer providers={providers} episode={episode} />
                            </Col>

                        </Row>
                    </Container>}
                {!loading && !episode &&
                    <div className="h-100 d-flex align-items-center justify-content-center"><h1>Ops, couldn&apos;t find this episode :(</h1></div>
                }
            </Container>
        )
    }
}

export default withParams(Episode)