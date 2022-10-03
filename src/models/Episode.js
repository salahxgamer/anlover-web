import Provider from "./Provider";

/**
 * Represents an episode of an anime
 */
export default class Episode {
    /**
     * @type {string}
     */
    id = null;

    /**
     * @type {string}
     */
    name = null;

    /**
     * @type {number}
     */
    number = null;

    /**
     * @type {number}
     */
    skip_from = null;

    /**
     * @type {number}
     */
    skip_to = null;

    /**
     * @type {number}
     */
    rating = null;

    /**
     * @type {number}
     */
    rating_user_count = null;

    /**
     * @type {Provider[]}
     */
    providers = null;


    /**
     * Deserialize an episode object response from the API
     * @param {object} serializedEpisode
     */
    constructor(serializedEpisode) {
        this.id = serializedEpisode.episode_id;
        this.name = serializedEpisode.episode_name;
        this.number = serializedEpisode.episode_number;
        this.skip_from = serializedEpisode.skip_from;
        this.skip_to = serializedEpisode.skip_to;
        this.rating = serializedEpisode.episode_rating;
        this.rating_user_count = serializedEpisode.episode_rating_user_count;
        try {
            this.providers = serializedEpisode.providers.map(serializedProvider => new Provider(serializedProvider));
        } catch (e) {
            this.providers = serializedEpisode.providers;
        }
    }

    resolveProviders = () => {
        this.providers.map(provider => provider.resolve())
    }

    toString = () => {
        return `[Episode ${this.id}]`;
    }
}