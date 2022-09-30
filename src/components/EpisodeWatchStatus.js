import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';
import { addEpisodeToHistory, deleteEpisodeFromHistory, getEpisodeFromHistory } from '../utils/db';


/**
 * Component to render a watched status icon for an episode.
 * 
 * @component
 * @param {string} episodeId The episode ID.
 * @param {string} animeId The anime ID.
 * @param {React.ReactNode} renderOnWatched The component to render when the episode is watched.
 * @param {React.ReactNode} renderOnNotWatched The component to render when the episode is not watched.
 */
const EpisodeWatchStatus = ({ episodeId, animeId, renderOnWatched, renderOnNotWatched }) => {
    const [isWatched, setIsWatched] = useState(false);
    useEffect(() => {
        getEpisodeFromHistory(episodeId)
            .then(episodeFromHistory => setIsWatched(!!episodeFromHistory));
        return () => { };
    }, [episodeId]);

    const handleFlagEpisode = () => {
        if (isWatched)
            deleteEpisodeFromHistory(episodeId)
        else
            addEpisodeToHistory({ episodeId, animeId })
        setIsWatched(!isWatched)
    }

    return (
        <Button variant="link" className="p-0 d-flex" onClick={handleFlagEpisode}>
            {isWatched ? renderOnWatched : renderOnNotWatched}
        </Button >
    );
};

EpisodeWatchStatus.propTypes = {
    episodeId: PropTypes.string.isRequired,
    animeId: PropTypes.string,
    renderOnWatched: PropTypes.node,
    renderOnNotWatched: PropTypes.node,
};

EpisodeWatchStatus.defaultProps = {
    renderOnWatched: <EyeFill className="text-primary" />,
    renderOnNotWatched: <EyeSlashFill className="text-muted" />,
};


export default EpisodeWatchStatus;