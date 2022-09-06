import React, { Component } from 'react'
import { toast } from 'react-toastify'
import { Container, Col, Row, Spinner } from 'react-bootstrap'
import AnimeCard from '../components/AnimeCard'
import { withSearchParams } from '../utils/helper';
import API from '../utils/api'
import AnimeSearch from '../components/AnimeSearch';

class Animes extends Component {
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
        let { _offset, _limit, _order_by, list_type, user_id, anime_name } = Object.fromEntries(this.props.searchParams.entries());
        toast.promise(API.getAnimes(_offset, _limit, _order_by, list_type, user_id, anime_name),
            {
                pending: 'Loading animes ...',
                success: 'Animes loaded successfuly',
                error: 'Couldn\'t load animes'
            },{toastId: "ANIMES_LIST_LOADING"})
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