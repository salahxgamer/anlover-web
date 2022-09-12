import React, { Component } from 'react'
import { toast } from 'react-toastify'
import { Container, Col, Row, Spinner } from 'react-bootstrap'
import AnimeCard from '../components/AnimeCard'
import { withSearchParams } from '../utils/helper';
import API from '../utils/api'
import AnimeSearch from '../components/AnimeSearch';
import ScrollToTop from '../components/ScrollToTop';

class Animes extends Component {
    static propTypes = {}

    constructor(props) {
        super(props)
        this.state = {
            // empty objects as placeholders
            animes: [{}, {}, {}, {}, {}, {}],
            loading: true,
            filters: {
                _offset: 0,
                _limit: 25,
                _order_by: "latest_first",
                list_type: "top_anime",
                anime_name: "",
                // get filters from search params if present
                ...Object.fromEntries(this.props.searchParams.entries())
            }
        }
    }

    componentDidMount() {
        this.fetchAnimes();
    }
    componentDidUpdate(prevProps, prevState) {
        // only fetch animes list if filters changed and it's not already loading
        // JSON.stringify is used to do a basic shallow compare (i'm lazy)
        if (!this.state.loading && JSON.stringify(prevState.filters) !== JSON.stringify(this.state.filters))
            this.fetchAnimes()
    }

    fetchAnimes = () => {
        this.props.setSearchParams(this.state.filters, { replace: true })
        this.setState({ loading: true })
        return toast.promise(API.getAnimes(this.state.filters),
            {
                pending: 'Loading animes ...',
                success: 'Animes loaded successfuly',
                error: 'Couldn\'t load animes'
            }, { toastId: "PAGE_LOADING", autoClose: 500 })
            .then(rsp => rsp.data)
            .then(animes => { this.setState({ animes }) })
            .catch(err => { this.setState({ animes: [] }) })
            .finally((() => { this.setState({ loading: false }) }))

    }


    render() {
        return (
            <Container fluid>
                <ScrollToTop />
                <h1 className="my-2">
                    {/* Display spinner while loading */}
                    {this.state.loading && <Spinner animation="grow" variant="primary" />}
                    Animes
                </h1 >
                <Container fluid>
                    <AnimeSearch className="mb-4" onSearch={filters => this.setState({ filters: { ...this.state.filters, ...filters } })} />
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