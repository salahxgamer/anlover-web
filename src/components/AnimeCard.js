import React from 'react'
import PropTypes from 'prop-types'
import { Placeholder } from 'react-bootstrap'
import { PlayFill, CheckCircleFill, PlayCircleFill, ClockFill, PauseCircleFill, XCircleFill, EyeSlashFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import AnimeModel from '../models/Anime';

import '../styles/AnimeCard.scss'


/**
 * @typedef {Object} AnimeCardProps
 * @property {AnimeModel} anime - Anime instance
 * @property {?boolean} placeholder - Whether to render as a card placeholder
 */

/**
 * Component that renders anime trailer
 * @param {AnimeCardProps} props - Component props
 */
function AnimeCard(props) {
    const { anime, placeholder } = props;

    if (placeholder) return <AnimeCardPlaceholder />;

    // TODO: isolate this to be used globally
    const WATCH_STATUS_ICONS = {
        "watched": CheckCircleFill,
        "watching": PlayCircleFill,
        "plan_to_watch": ClockFill,
        "on_hold": PauseCircleFill,
        "dropped": XCircleFill,
    }

    // TODO: add watch status when the api supports it
    const WatchStatusIcon = WATCH_STATUS_ICONS["status"] || EyeSlashFill

    return (
        <div className="anime-card h-100 w-100 rounded shadow overflow-hidden">

            <div className="anime-poster">


                <div className="tags ltr d-none d-sm-block">
                    <div className="badge text-bg-light">{anime.type}</div>
                    <div className="badge text-bg-light">DUB</div>
                </div>
                <div className="tags rtl">
                    <WatchStatusIcon size="1rem" className="text-light" />
                    <div className="badge text-bg-success">{anime.rating}</div>
                </div>

                <img src={anime.images.cover} className="anime-poster-img" alt={anime.title} />
                <Link to={`/anime/${anime.id}`} className="anime-poster-ahref">
                    <PlayFill className="play" size={60} />
                </Link>
            </div>

            <div className="anime-detail">
                <h3 className="anime-name">
                    <Link to={`/anime/${anime.id}`} title={anime.title}>
                        {anime.title}
                    </Link>
                </h3>

                < div className="anime-info">
                    <span>{anime.status}</span>
                    <span>{anime.releaseYear}</span>
                    <span>{anime.season}</span>
                </div>

            </div>
        </div >

    )
}


const AnimeCardPlaceholder = () => {
    return (
        <div className="anime-card h-100 w-100 rounded shadow overflow-hidden">

            <div className="anime-poster">
                <div className="anime-poster-ahref">
                </div>
            </div>

            <div className="anime-detail">
                <h3 className="anime-name">
                    <div>
                        <Placeholder animation="glow">
                            <Placeholder xs={6} /> <Placeholder xs={4} /> <Placeholder xs={2} /> <Placeholder xs={3} />
                        </Placeholder>
                    </div>
                </h3>

                <Placeholder className="anime-info" animation="glow">
                    <Placeholder xs={4} /> <Placeholder xs={3} /> <Placeholder xs={2} />
                </Placeholder>

            </div>
        </div >
    )
}


AnimeCard.Placeholder = AnimeCardPlaceholder;

AnimeCard.propTypes = {
    anime: PropTypes.instanceOf(AnimeModel).isRequired,
    placeholder: PropTypes.bool,
    hideCover: PropTypes.bool,
}


export default AnimeCard
