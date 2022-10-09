import PropTypes from 'prop-types';
import React from 'react';
import { Badge, Button } from 'react-bootstrap';
import { ChatLeftText, StarFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import Select, { components, createFilter } from 'react-select';
import EpisodeWatchStatus from './EpisodeWatchStatus';
import Episode from '../models/Episode';

import "../styles/EpisodeSelector.scss";

/**
 * A React component that renders a Select component with a list of episodes.
 * The component will navigate to the selected episode if no onSelect prop is provided.
 * @param {Array<Episode>} episodes - An array of episodes to display in the Select component.
 * @param {Function} onSelect - A function to call when an episode is selected.
 */
export default function EpisodeSelector({ episodes, onSelect, ...props }) {
    const navigate = useNavigate();
    return (
        <Select
            menuPlacement="auto"
            isClearable={false}
            isMulti={false}
            menuShouldScrollIntoView={false}
            isSearchable
            menuIsOpen

            aria-autocomplete="both"
            placeholder="Select an episode to watch..."
            noOptionsMessage={({ inputValue }) => `No episodes with title containing : ${inputValue}`}
            filterOption={createFilter({
                ignoreAccents: true,
                ignoreCase: true,
                stringify: option => option.label,
            })}
            options={episodes}
            styles={{ menu: (base) => ({ ...base, position: 'relative' }) }}

            getOptionLabel={ep => ep.name}
            getOptionValue={ep => ep.id}
            isOptionSelected={() => false} // we don't really care about this so just return false to make things faster
            components={{ Option: EpisodeOption }}

            onChange={episode => { onSelect ? onSelect(episode) : navigate(`/episode/${episode.id}`) }}

            {...props}
        />
    )
}

EpisodeSelector.propTypes = {
    episodes: PropTypes.arrayOf(PropTypes.instanceOf(Episode)).isRequired,
    onSelect: PropTypes.func
};


/**
 * A React component that renders an option in the Select component.
 * The component will render the episode name, rating, watched status and watched history.
 */
const EpisodeOption = ({ children, ...props }) => {
    // eslint-disable-next-line no-unused-vars
    const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
    const newProps = { ...props, innerProps: rest };
    const episode = props.data
    return (
        <div className='hstack gap-3 episode-option pe-2'>
            <components.Option {...newProps}>
                <div className='me-auto'>
                    {children}
                </div>
            </components.Option>
            <Badge bg="warning"><StarFill size={10} className="align-baseline" />{episode.rating}</Badge>
            <Button variant="link" className="p-0 d-flex" ><ChatLeftText /></Button >
            <EpisodeWatchStatus episodeId={episode.id} />
        </div>
    );
};

EpisodeOption.propTypes = {
    innerProps: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired
};