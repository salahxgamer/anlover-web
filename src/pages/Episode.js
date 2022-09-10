import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { Container, Spinner, Col, Row } from 'react-bootstrap';
import { withParams } from '../utils/helper'
import API from '../utils/api'
import ScrollToTop from '../components/ScrollToTop';
import ReactPlayer from 'react-player';
import ProviderSelector from '../components/ProviderSelector';

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
            }, { toastId: "EPISODE_LOADING" })
            .then(rsp => rsp.data)
            .then(episode => { this.setState({ episode, providers: episode.providers }); return episode })
            .catch(err => { this.setState({ episode: null }); console.error(err) })
            .finally((() => { this.setState({ loading: false }) }))

    }
    render() {
        const { episode, providers, player_url, loading } = this.state
        return (
            <Container fluid>
                <ScrollToTop />
                <h1 className="my-2">
                    {/* Display spinner while loading */}
                    {loading && <Spinner animation="grow" variant="primary" />}
                    Episode : {episode?.name}
                </h1 >
                {!loading && episode &&
                    <Container fluid>
                        <Row>

                            <Col className="d-flex flex-column align-items-center justify-content-center mb-2">
                                <ProviderSelector
                                    providers={providers}
                                    onLoad={({ urls }) => player_url || this.setState({ player_url: urls.at(-1) })}
                                    onSelect={url => this.setState({ player_url: url })}
                                    className="mb-2"
                                />

                                <ReactPlayer url={player_url} controls={true} className="shadow rounded" playing />
                            </Col>

                        </Row>
                    </Container>}
                {!loading && !episode &&
                    <div className="h-100 d-flex align-items-center justify-content-center"><h1>Ops, couldn't find this episode :(</h1></div>
                }
            </Container>
        )
    }
}

export default withParams(Episode)