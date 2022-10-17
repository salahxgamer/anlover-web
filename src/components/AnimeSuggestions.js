import PropTypes from "prop-types";
import React from "react";
import { Col, Row } from "react-bootstrap";
import AnimeCard from "./AnimeCard";
import AnimeModel from "../models/Anime";

/**
 * @typedef {object} AnimeSuggestionsProps
 * @property {AnimeModel[]} animes
 */

/**
 * Renders anime cards of suggested animes
 * @param {AnimeSuggestionsProps} props
 */
const AnimeSuggestions = (props) => {
    const { animes } = props
    if (!animes?.length) return <div className=" text-center"><p className="fw-light">Nothing found.</p></div>
    return (
        <Row
            className="flex-nowrap overflow-auto pb-3"
            style={{ scrollSnapType: "x mandatory", overscrollBehaviorX: "contain" }}
        >
            {animes?.map((suggestedAnime, index) =>
                <Col
                    className="d-flex align-items-center justify-content-center"
                    style={{ scrollSnapAlign: "start" }}
                    xs={6} sm={4} md={3} lg={2} key={index}
                >
                    <AnimeCard anime={suggestedAnime} />
                </Col>
            )}
        </Row>
    );
};

AnimeSuggestions.propTypes = {
    animes: PropTypes.arrayOf(PropTypes.instanceOf(AnimeModel)).isRequired
};

export default AnimeSuggestions;