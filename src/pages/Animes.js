import React, { Component } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import { toast } from 'react-toastify'
import AnimeCard from '../components/AnimeCard'
import AnimeSearch from '../components/AnimeSearch'
import ScrollToTop from '../components/ScrollToTop'
import API from '../utils/api'
import { withSearchParams } from '../utils/helper'

class Animes extends Component {
    static propTypes = {}

    constructor(props) {
        super(props)
        this.state = {
            // empty objects as placeholders
            animes: new Array(12).fill({}),
            loading: true,
            initialFilters: {
                _offset: 0,
                _limit: 100,
                _order_by: "latest_first",
                list_type: "top_anime",
                // get filters from search params if present
                ...Object.fromEntries(this.props.searchParams.entries())
            }
        }
    }

    componentDidMount() {
        // fetch animes with initial filters
        this.fetchAnimes();
    }

    fetchAnimes = (filters = this.state.initialFilters) => {
        // set search params to url
        this.props.setSearchParams(filters, { replace: true })
        this.setState({ loading: true })
        return toast.promise(API.getAnimes(filters),
            {
                pending: 'Loading animes ...',
                success: 'Animes loaded successfuly',
                error: 'Couldn\'t load animes'
            }, { toastId: "PAGE_LOADING", autoClose: 500 })
            .then(rsp => rsp.data)
            .then(animes => { this.setState({ animes }) })
            .catch(() => { this.setState({ animes: [] }) })
            .finally((() => { this.setState({ loading: false }) }))

    }


    render() {
        return (
            <Container fluid>
                <Helmet><title>{this.props.searchParams.get("anime_name") ? `Search for "${this.props.searchParams.get("anime_name")}"` : "Animes List"}</title></Helmet>
                <ScrollToTop />
                <h1 className="my-2">
                    {/* Display spinner while loading */}
                    {this.state.loading && <Spinner animation="grow" variant="primary" />}
                    Animes
                </h1 >
                <Container fluid>
                    <AnimeSearch
                        className="mb-4"
                        initialFilters={this.state.initialFilters}
                        onSearch={this.fetchAnimes}
                        isAutoSearch={true}
                    />
                    <Row className="g-4 mb-5">
                        {
                            this.state.animes?.map((anime, index) => (
                                <Col className="d-flex align-items-center justify-content-center" xs={6} sm={4} md={3} lg={2} key={index}>
                                    <AnimeCard anime={anime} placeholder={this.state.loading} />
                                </Col>
                            ))
                        }
                        {!this.state.animes?.length && !this.state.loading && (
                            <h1 className="text-center">No Animes Found :(</h1>
                        )}
                    </Row>
                </Container>
            </Container >
        )
    }
}

export default withSearchParams(Animes)