import React from 'react'
import PropTypes from 'prop-types'
import { Placeholder } from 'react-bootstrap'
import { PlayFill, CheckCircleFill, PlayCircleFill, ClockFill, PauseCircleFill, XCircleFill, EyeSlashFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import '../styles/AnimeCard.scss'

function AnimeCard(props) {
    const { anime, placeholder } = props;

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

                {!placeholder && <>
                    <div className="tags ltr d-none d-sm-block">
                        <div className="badge text-bg-light">{anime.anime_type}</div>
                        <div className="badge text-bg-light">DUB</div>
                    </div>
                    <div className="tags rtl">
                        <WatchStatusIcon size="1rem" className="text-light" />
                        <div className="badge text-bg-success">{anime.anime_rating}</div>
                    </div>
                </>}

                {!placeholder && <img src={anime.anime_cover_image_url} className="anime-poster-img" alt={anime.anime_name} />}
                <Link to={placeholder ? "" : `/anime/${anime.anime_id}`} className="anime-poster-ahref">
                    <PlayFill className="play" size={60} />
                </Link>
            </div>

            <div className="anime-detail">
                <h3 className="anime-name">
                    <Link to={placeholder ? "" : `/anime/${anime.anime_id}`} title={anime.anime_name}>
                        {placeholder
                            ? <Placeholder animation="glow"><Placeholder xs={6} /> <Placeholder xs={4} /> <Placeholder xs={2} /> <Placeholder xs={3} /></Placeholder>
                            : anime.anime_name
                        }
                    </Link>
                </h3>

                {placeholder
                    ? <Placeholder className="anime-info" animation="glow"><Placeholder xs={4} /> <Placeholder xs={3} /> <Placeholder xs={2} /></Placeholder>
                    : < div className="anime-info">
                        <span>{anime.anime_status}</span>
                        <span>{anime.anime_release_year}</span>
                        <span>{anime.anime_season}</span>
                    </div>
                }

            </div>
        </div >

    )
}

AnimeCard.propTypes = {
    anime: PropTypes.object.isRequired,
    placeholder: PropTypes.bool,
    hideCover: PropTypes.bool,
}


export default AnimeCard
