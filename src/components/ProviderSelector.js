import PropTypes from 'prop-types';
import { Badge, Spinner } from 'react-bootstrap';
import { XCircleFill } from 'react-bootstrap-icons';
import Select, { components, createFilter } from 'react-select';
import Provider from '../models/Provider';




/**
 * @typedef {Object} Props
 * @property {Array<Provider>} providers - array of providers to select from
 * @property {Provider} selectedProvider - the selected provider
 * @property {Function} onSelect - callback function when a provider is selected
 * @property {Object} otherProps - other props
 * 
 * @param {Props} props
 */
export default function ProviderSelector(props) {
    const { providers, selectedProvider, onSelect, ...otherProps } = props
    return (
        <Select
            menuPlacement="auto"
            isClearable={false}
            isMulti={false}
            menuShouldScrollIntoView={false}
            isSearchable={false}

            aria-autocomplete="both"
            placeholder="Select a provider..."
            noOptionsMessage={({ inputValue }) => `No providers containing : ${inputValue}`}
            filterOption={createFilter({
                ignoreAccents: true,
                ignoreCase: true,
                stringify: option => option.label,
            })}

            // Put all the successful providers on top and others down
            options={providers.sort((provider) => (provider.isResolved ? (provider.isSuccessful ? -1 : 1) : 0))}
            value={selectedProvider}
            onChange={provider => { onSelect && onSelect(provider, -1) }}

            getOptionLabel={provider => provider.name}
            getOptionValue={provider => provider.toString()}
            isOptionSelected={(provider, selectedProviders) => selectedProviders.find((selectedProvider) => selectedProvider === provider)}
            isOptionDisabled={provider => !provider.isSuccessful}
            isLoading={!!providers.find(provider => !provider.isResolved)}

            components={{ Option: ProviderOption }}

            {...otherProps}
        />
    )
}


ProviderSelector.propTypes = {
    providers: PropTypes.arrayOf(PropTypes.instanceOf(Provider)).isRequired,
    selectedProvider: PropTypes.instanceOf(Provider),
    onSelect: PropTypes.func,
}

/**
 * A React component that renders an option in the Select component.
 * The component will render the provider details.
 */
const ProviderOption = ({ children, ...props }) => {
    const provider = props.data;

    const ProviderStatus = () => {
        if (!provider.isResolved)
            return <Spinner animation="grow" size="sm" variant="primary" />
        if (!provider.isSuccessful)
            return <XCircleFill className="text-danger" size="20" />
        return (
            <>
                {provider.labels.map((label, index) => <Badge bg="primary" key={index}>{label}</Badge>)}
                <Badge bg="success">{provider.urls.length}</Badge>
            </>
        )
    }

    return (
        <components.Option className="provider-option" {...props}>
            <div className='hstack gap-1'>
                <div className='me-auto'>
                    {children}
                </div>
                <ProviderStatus />
            </div>
        </components.Option>
    );
};

ProviderOption.propTypes = {
    children: PropTypes.node.isRequired
};