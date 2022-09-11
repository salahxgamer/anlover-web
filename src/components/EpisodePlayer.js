import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import ProviderSelector from '../components/ProviderSelector';

export default class EpisodePlayer extends Component {
    static propTypes = {
        providers: PropTypes.arrayOf(PropTypes.object).isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            providers: props.providers,
            urlIndex: -1,
            selectedProvider: null
        }
    }

    render() {
        const { providers, selectedProvider, urlIndex } = this.state
        const { providers: _, ...props } = this.props
        return (
            <div className="shadow rounded w-100 bg-dark d-flex flex-column align-items-stretch" style={{ maxHeight: "90vh" }} {...props}>
                <ReactPlayer url={selectedProvider?.urls?.at(urlIndex)} playing controls width="100%" height="100%" className="rounded-top overflow-hidden" />

                <div>
                    <ProviderSelector
                        providers={providers}
                        onLoad={(provider) => provider.urls.length && (selectedProvider || this.setState({ selectedProvider: provider }))}
                        onSelect={(selectedProvider, urlIndex) => this.setState({ selectedProvider, urlIndex })}
                        className="" />
                </div>
            </div>
        )
    }
}
