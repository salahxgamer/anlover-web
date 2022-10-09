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
    skipFrom = null;

    /**
     * @type {number}
     */
    skipTo = null;

    /**
     * @type {number}
     */
    rating = null;

    /**
     * @type {number}
     */
    ratingUserCount = null;

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
        this.skipFrom = serializedEpisode.skip_from;
        this.skipTo = serializedEpisode.skip_to;
        this.rating = serializedEpisode.episode_rating;
        this.ratingUserCount = serializedEpisode.episode_rating_user_count;
        try {
            this.providers = serializedEpisode.providers?.map(serializedProvider => new Provider(serializedProvider));
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