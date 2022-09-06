import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Container, Col, Row, Spinner } from 'react-bootstrap'
import AnimeCard from '../components/AnimeCard'
import API from '../utils/api'
import AnimeSearch from '../components/AnimeSearch';

export default class Animes extends Component {
    static propTypes = {}

    constructor(props) {
        super(props)
        this.state = {
            // empty objects as placeholders
            animes: [{}, {}, {}, {}, {}, {}],
            loading: true
        }
    }

    componentDidMount() {
        API.getAnimes()
            .then(animes => { this.setState({ animes }) })
            .catch(console.error)
            .finally((() => { this.setState({ loading: false }) }))

    }


    render() {
        return (
            <Container fluid>
                <h1 className="my-2">
                    {/* Display spinner while loading */}
                    {this.state.loading && <Spinner animation="grow" variant="primary" />}
                    Animes
                </h1 >
                <Container fluid>
                    <AnimeSearch className="mb-4" />
                    <Row className="g-4 mb-5">
                        {
                            this.state.animes?.map((anime, index) => (
                                <Col className="d-flex align-items-center justify-content-center" key={index}>
                                    <AnimeCard anime={anime} placeholder={this.state.loading} />
                                </Col>
                            ))
                        }
                    </Row>
                </Container>
            </Container >
        )
    }
}
