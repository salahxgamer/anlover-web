import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import ProviderSelector from '../components/ProviderSelector';
import Provider from '../classes/Provider';

export default class EpisodePlayer extends Component {
    static propTypes = {
        providers: PropTypes.arrayOf(PropTypes.object).isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            providers: props.providers.map(provider => new Provider(provider)),
            urlIndex: -1,
            selectedProvider: null,
        }
    }

    componentDidMount() {
        const { providers } = this.state;
        let autoSelectedProvider = null;
        providers.forEach(provider => {
            provider.resolve().finally(() => this.forceUpdate());
            provider.onSuccessfulResolve((provider) => {
                if (!autoSelectedProvider) {
                    autoSelectedProvider = provider;
                    this.selectProvider(autoSelectedProvider);
                }
            });
        })
    }

    componentWillUnmount() {
        const { providers } = this.state;
        providers.forEach(provider => provider.cancel())
    }

    selectProvider = (selectedProvider, urlIndex = -1) => {
        this.setState({ selectedProvider, urlIndex })
    }

    render() {
        const { providers, selectedProvider, urlIndex } = this.state
        // eslint-disable-next-line no-unused-vars
        const { providers: _, ...newProps } = this.props
        return (
            <div className="shadow rounded w-100 bg-dark d-flex flex-column align-items-stretch" style={{ maxHeight: "90vh" }} {...newProps}>
                <ReactPlayer url={selectedProvider?.urls?.at(urlIndex)} playing controls width="100%" height="100%" className="rounded-top overflow-hidden" />

                <div>
                    <ProviderSelector
                        providers={providers}
                        onSelect={this.selectProvider}
                        selectedProvider={selectedProvider}
                    />
                </div>
            </div>
        )
    }
}
