
import PropTypes from 'prop-types';
import React from 'react';
import { Badge, Button, Col, Container, Dropdown, Row } from 'react-bootstrap';
import { Play, Plus } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import AnimeModel from '../models/Anime';
import { snakeToTitleCase } from '../utils/helper';

import '../styles/AnimeDetails.scss';

/**
 * @typedef {Object} AnimeDetailsProps
 * @property {AnimeModel} anime - Anime instance
 */

/**
 * Component that displays anime details and infos
 * @param {AnimeDetailsProps} props - Anime object
 */
function AnimeDetails(props) {
    const { anime } = props
    const ratingLevelToColor = level => ({
        "none": "success",
        "mild": "warning",
        "moderate": "warning",
        "severe": "danger"
    }[level] || "dark")

    return (
        <Container fluid className="anime-details">
            <div
                style={{ backgroundImage: `url(${anime.images.banner || anime.images.coverFull || anime.images.cover})` }}
                className="backdrop"
            />
            <Container>
                <Row>
                    <Col xs="12" sm="auto" className="d-flex justify-content-center py-5 poster-container">
                        <img
                            src={anime.images.cover || anime.image.coverFull} alt={anime.title}
                            className="shadow rounded poster"
                        />
                    </Col>

                    <Col xs="12" sm className="py-sm-5 details-container">
                        <h2>{anime.title}</h2>
                        <div className="hstack gap-2 flex-wrap info-tags">
                            <Badge bg="dark" text="bg-dark" >{anime.type}</Badge>
                            <Badge bg="dark" text="bg-dark" >{anime.ageRating}</Badge>
                            <Badge bg="warning" text="bg-warning" >{anime.rating}</Badge>
                            <div className="vr" />
                            <span className="fw-light">{anime.releaseYear}</span>
                            <div className="vr" />
                            <span className="fw-light">{anime.episodesCount} Episodes</span>
                            <div className="vr" />
                            <span className="fw-light">{anime.duration}</span>
                        </div>
                        <div className="hstack gap-2 flex-wrap my-3 action-container">
                            {/* // TODO: add ability to resume from last episode */}
                            {anime.episodes &&
                                <Button as={Link} to={`/episode/${anime.episodes?.at(0)?.id}`} className="d-flex align-items-center">
                                    <Play size="1.3em" className="me-2" />
                                    Watch now
                                </Button>
                            }
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" className="d-flex align-items-center">
                                    <Plus size="1.3em" className="me-2" />
                                    Add to list
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item>Favorite</Dropdown.Item>
                                    <Dropdown.Item>To Watch</Dropdown.Item>
                                    <Dropdown.Item>Watching</Dropdown.Item>
                                    <Dropdown.Item>Finished</Dropdown.Item>
                                </Dropdown.Menu>

                            </Dropdown>
                        </div>
                        <p className="d-none d-sm-block fw-light">{anime.description}</p>

                    </Col>

                    <Col xs="12" lg="4" className="py-2 py-lg-5 bg-opacity-10 bg-dark shadow info-container">
                        <div className="px-2">
                            <div className="d-sm-none">
                                <span className="fw-bold">Summary : </span>
                                <span className="fw-light">{anime.description}</span>
                            </div>

                            <div>
                                <span className="fw-bold">Title : </span>
                                <span>{anime.title || "--"}</span>
                            </div>
                            <div>
                                <span className="fw-bold">English title : </span>
                                <span>{anime.englishTitle || "--"}</span>
                            </div>

                            <hr />

                            <div>
                                <span className="fw-bold">Aired : </span>
                                <span>{anime.aired.from?.toLocaleDateString()} - {anime.aired.to?.toLocaleDateString() || "--"}</span>
                            </div>
                            <div>
                                <span className="fw-bold">Release : </span>
                                <span>{anime.releaseYear} {anime.releaseDay}</span>
                            </div>
                            <div>
                                <span className="fw-bold">Status : </span>
                                <span>{anime.status || "--"}</span>
                            </div>
                            <div>
                                <span className="fw-bold">Duration : </span>
                                <span>{anime.duration || "--"}</span>
                            </div>
                            <div>
                                <span className="fw-bold">Rating : </span>
                                <span>{anime.rating || "--"} ({anime.ratingUserCount} votes)</span>
                            </div>

                            <hr />

                            <div>
                                <span className="fw-bold">Genres : </span>
                                <span>{anime.genres?.map(genre => <Badge pill bg="dark" key={genre.id}>{genre.label}</Badge>) || "--"}</span>
                            </div>

                            <hr />

                            <div>
                                <span className="fw-bold">Studios : </span>
                                <span>{anime.studios?.map(studio => <Badge pill bg="secondary" key={studio.id}>{studio.label}</Badge>) || "--"}</span>
                            </div>

                            <hr />

                            <div>
                                <span className="fw-bold">Content rating : </span>
                                <div className="mt-2">
                                    {anime.contentRating.map(rating =>
                                        <div
                                            className={`d-flex justify-content-between align-items-center px-2 border-bottom border-${ratingLevelToColor(rating.level)} rounded bg-opacity-10 bg-${ratingLevelToColor(rating.level)} mb-1`}
                                            key={rating.content_type}
                                        >
                                            <div>
                                                <span>{snakeToTitleCase(rating.content_type)}</span> <span className="fw-light fst-italic">{rating.level}</span>
                                            </div>
                                            <Badge bg={ratingLevelToColor(rating.level)} pill>
                                                {rating.vote_count}
                                            </Badge>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </Col>
                </Row>
            </Container>

        </Container >
    )
}

AnimeDetails.propTypes = {
    anime: PropTypes.instanceOf(AnimeModel).isRequired
}


export default AnimeDetails