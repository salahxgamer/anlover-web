import { useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import API from '../utils/api';
import Provider from './Provider';

/**
 * @typedef {object} Provider
 * @property {string} name - provider name
 * @property {string} url - provider url
 * @property {array<string>} urls - provider source urls
 * 
 * @typedef {object} Props
 * @property {array<Provider>} providers - array of providers
 * @property {function} onSelect - callback function when a provider is selected
 * @property {function} onLoad - callback function when a provider is fetched
 * @property {object} props - other props
 * 
 * @param {Props} props
 */
export default function ProviderSelector({ providers, onSelect, onLoad, ...props }) {

    return (
        <Dropdown onSelect={onSelect} {...props}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Select Provider
            </Dropdown.Toggle>
            <Dropdown.Menu renderOnMount style={{ overflowY: "scroll", maxHeight: "18rem" }}>
                {
                    providers?.map((provider, index) => <Provider {...provider} onLoad={onLoad} key={index} />)
                }
            </Dropdown.Menu>
        </Dropdown >
    )
}

ProviderSelector.propTypes = {
    providers: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string.isRequired,
        name: PropTypes.string,
        urls: PropTypes.arrayOf(PropTypes.string)
    })),
    onSelect: PropTypes.func,
    onLoad: PropTypes.func
}