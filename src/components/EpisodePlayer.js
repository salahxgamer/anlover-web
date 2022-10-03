import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { toast } from "react-toastify";
import ProviderSelector from '../components/ProviderSelector';
import { addEpisodeToHistory, getEpisodeFromHistory } from "../utils/db";
import Episode from '../models/Episode';

export default class EpisodePlayer extends Component {
    static propTypes = {
        episode: PropTypes.instanceOf(Episode).isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            episode: props.episode,
            urlIndex: -1,
            selectedProvider: null,
        }
    }

    componentDidMount() {
        const { providers } = this.state.episode;
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
        const { providers } = this.state.episode;
        providers.forEach(provider => provider.cancel())
    }

    selectProvider = (selectedProvider, urlIndex = -1) => {
        this.setState({ selectedProvider, urlIndex })
    }

    playerRef = (player) => {
        this.player = player;
    }

    saveWatchProgress = ({ played }) => {
        if (!played) played = this.player.getCurrentTime() / this.player.getDuration()
        addEpisodeToHistory({ episodeId: this.state.episode.id, progress: played })
    }

    resumeWatchProgress = async () => {
        const episodeProgress = (await getEpisodeFromHistory(this.state.episode.id))?.progress
        if (this.player && episodeProgress) {
            this.player.seekTo(episodeProgress)
            toast.info("Episode was resumed...", { toastId: "EPISODE_RESUMED" })
        }
    }

    render() {
        const { episode: { providers }, selectedProvider, urlIndex } = this.state
        return (
            <div className="shadow rounded w-100 bg-dark d-flex flex-column align-items-stretch" style={{ maxHeight: "90vh" }}>
                <ReactPlayer url={selectedProvider?.urls?.at(urlIndex)}
                    playing controls
                    width="100%" height="100%"
                    className="rounded-top overflow-hidden"
                    progressInterval={10000}
                    ref={this.playerRef}
                    onProgress={this.saveWatchProgress}
                    onSeek={this.saveWatchProgress}
                    onStart={this.resumeWatchProgress}
                />

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
