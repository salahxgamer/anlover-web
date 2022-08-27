import React from 'react'
import PropTypes from 'prop-types'
import { OverlayTrigger, Tooltip, Placeholder } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import '../styles/AnimeCard.scss'

function AnimeCard(props) {
    const { anime, placeholder, hideCover } = props;

    return (
        /* Anime card wrapper */
        <Link to={placeholder ? "" : `/anime/${anime.anime_id}`} className="text-decoration-none text-reset">
            <div className="anime-card h-100 d-flex flex-column align-items-center shadow rounded overflow-hidden">


                {/* Anime cover */}
                {!(hideCover || placeholder) && <div className="cover" style={{ backgroundImage: `url(${anime.anime_cover_image_url})` }} />}
                {placeholder && !hideCover && < Placeholder animation="glow"><Placeholder className="cover" /></Placeholder>}

                {/* Anime details */}
                <div className="p-2 w-100">
                    {/* Generate tooltip containing full anime title */}
                    <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip>{anime.anime_name}</Tooltip>}
                    >
                        <h5 className="text-truncate">
                            {placeholder
                                ? <Placeholder animation="glow"><Placeholder xs={6} /> <Placeholder xs={2} /></Placeholder>
                                : anime.anime_name
                            }
                        </h5>
                    </OverlayTrigger>

                    {placeholder ? <Placeholder animation="glow" className="hstack gap-3"><Placeholder xs={2} /> <Placeholder xs={5} /> <Placeholder xs={3} /></Placeholder> :

                        <div className="hstack gap-3">
                            <span className="badge text-bg-primary rounded-pill">{anime.anime_rating}</span>
                            <span className="badge text-bg-secondary">{anime.anime_status}</span>
                            <span className="badge text-bg-info">{anime.anime_release_year}</span>
                        </div>
                    }
                </div>

            </div >
        </Link >
    )
}

AnimeCard.propTypes = {
    anime: PropTypes.object.isRequired,
    placeholder: PropTypes.bool,
    hideCover: PropTypes.bool,
}


export default AnimeCard
