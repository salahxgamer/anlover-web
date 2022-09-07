import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { Container, Spinner, ButtonToolbar, ButtonGroup, Button, Col, Row } from 'react-bootstrap';
import { withParams } from '../utils/helper'
import API from '../utils/api'
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';

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
            loading: true
        }
    }

    componentDidMount() {
        toast.promise(API.getEpisode(this.props.params?.episodeId),
            {
                pending: 'Loading episode ...',
                success: 'Episode loaded successfuly',
                error: 'Couldn\'t load episode'
            }, { toastId: "EPISODE_LOADING" })
            .then(episode => { this.setState({ episode }); return episode })
            .catch(console.error)
            .finally((() => { this.setState({ loading: false }) }))

    }
    render() {
        const { episode, loading } = this.state
        return (
            <Container fluid>
                <h1 className="my-2">
                    {/* Display spinner while loading */}
                    {loading && <Spinner animation="grow" variant="primary" />}
                    Episode : {episode.episode_name}
                </h1 >
                {!loading && episode &&
                    <Container fluid>
                        <Row>

                            <Col lg={2}>
                                <ButtonToolbar className="flex-column" aria-label="Toolbar with button groups">
                                    {episode.episode_sources?.map(provider =>
                                        <ButtonGroup vertical className="my-2" aria-label="" key={provider.id}>
                                            <h6 className={!provider.provider_urls.length && "text-danger"}>{provider.provider_name}</h6>
                                            {provider.provider_urls?.map((url, index) =>
                                                <Button key={index} bg="success" onClick={() => this.setState({ player_url: url })}>
                                                    {!this.state.player_url && this.setState({ player_url: url })}
                                                    Quality {index + 1}
                                                </Button>
                                            )}
                                        </ButtonGroup>
                                    )}
                                </ButtonToolbar>
                            </Col>

                            <Col className="d-flex align-items-center justify-content-center mb-2">
                                <ReactPlayer url={this.state.player_url} controls={true} className="shadow rounded" playing />
                            </Col>

                        </Row>
                    </Container>}
            </Container>
        )
    }
}

export default withParams(Episode)