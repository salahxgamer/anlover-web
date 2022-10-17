import PropTypes from 'prop-types';
import React from 'react';
import { Ratio } from 'react-bootstrap';
import { PlayFill } from 'react-bootstrap-icons';
import ReactPlayer from 'react-player';


/**
 * @typedef {Object} AnimeTrailerProps
 * @property {string} trailerUrl - Anime trailer URL
 */

/**
 * Component that renders anime trailer
 * @param {AnimeTrailerProps} props - Component props
 */
function AnimeTrailer(props) {
    const { trailerUrl } = props;
    const playIcon = (
        <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center bg-dark bg-opacity-25 text-light">
            <PlayFill size="5em" />
            <p>Click to load the trailer</p>
        </div>
    )
    return (
        <Ratio aspectRatio="16x9">
            <ReactPlayer className="rounded shadow bg-dark overflow-hidden"
                url={trailerUrl}
                controls pip light playing
                width="100%" height="100%"
                playIcon={playIcon}
            />
        </Ratio>
    )
}

AnimeTrailer.propTypes = {
    anime: PropTypes.string.isRequired
}

export default AnimeTrailer
