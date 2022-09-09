import * as Decoder from "./decoder"
import axios from "axios"

export default class API {

    static AUTH_HEADERS = {
        'client-id': process.env.REACT_APP_API_CLIENT_ID,
        'client-secret': process.env.REACT_APP_API_CLIENT_SECRET,
        'Authorization': `Bearer ${process.env.REACT_APP_API_AUTHORIZATION}`,
    };
    static BASE_URL = process.env.REACT_APP_API_BASE_URL;

    static server = axios.create({ baseURL: "/api/v1" });


    constructor() {
        return this
    }

    static errorHandler(err) {
        console.error(err);
        throw err;
    }

    /**
     * @param  {number} _offset Offset from result
     * @param  {number} _limit Limit of queries
     * @param  {string} _order_by One of `"latest_first", "earliest_first", "anime_name_asc", "anime_name_desc", "anime_year_asc", "anime_year_desc", "anime_rating_desc", "best_match", "mal_rank_asc"`
     * @param  {string} list_type One of `"latest_episodes", "custom_list", "anime_list", "currently_airing", "latest_updated_episode", "latest_updated_episode_new", "top_anime", "top_currently_airing", "top_tv", "top_movie", "featured", "filter", "favorites", "watching", "plan_to_watch", "watched", "dropped", "on_hold", "watched_history", "schedule", "last_added_tv", "last_added_movie", "top_anime_mal", "top_currently_airing_mal", "top_tv_mal", "top_movie_mal", "anime_characters", "top_upcoming", "top_upcoming_catalog"`
     * @param  {number} user_id Specify a user id if you want to get a user's list. If you don't specify a user id, it will return the current user's list.
     * @param  {string} anime_name Anime name to search for, if `list_type="filter"`
     * @returns {Promise<any>}
     */
    static getAnimes({ _offset = 0, _limit = 100, _order_by = "latest_first", list_type = "top_anime", user_id = null, anime_name = null }) {
        const params = { _offset, _limit, _order_by, list_type, user_id, anime_name };
        return this.server.get(`/animes`, { params }).then(rsp => rsp.data).catch(this.errorHandler);
    }

    /**
     * @param  {number} anime_id Anime id
     */
    static getAnime(anime_id) {
        return this.server.get(`/anime/${anime_id}`).then(rsp => rsp.data).catch(this.errorHandler);
    }

    /**
     * @param  {} episode_id Episode id
     */
    static getEpisode(episode_id) {
        const urlencoded = new URLSearchParams();
        urlencoded.append("json", JSON.stringify({ episode_id }));

        return fetch(`${this.BASE_URL}/episodes/get-episodes?${urlencoded}`, { method: 'GET', headers: this.AUTH_HEADERS })
            .then(response => response.json())
            .then(response => response.response.data[0])
            .then(async response => { response.episode_sources = await this.getEpisodeSources(response); return response })
            .catch((error, data) => { console.error(error, data); return {} })
    }

    static async getEpisodeSources(episode) {

        // Get the providers urls from api
        let providersURL = [];
        for (let srcProvider of episode.episode_urls) {
            const srcProviderURL = srcProvider.episode_url;
            try {
                let data = await fetch(this.bypassCORS(srcProviderURL), { method: 'GET', headers: this.AUTH_HEADERS })
                data = await data.json()

                // console.log(data)
                providersURL = providersURL.concat(data)
            } catch (error) {
                console.warn("failed loading from : ", srcProvider, error)
            }
        }

        const providers = providersURL.reduce((providers, source, index) =>
            providers.concat([{
                id: index, provider_url: source, provider_host: "", provider_type: "", provider_name: new URL(source).host, provider_urls: []
            }]
            ), []);


        // evaluate providers urls and scrape url sources
        for (const [index, provider] of providers.entries()) {

            const url = this.bypassCORS(provider.provider_url)
            const options = {
                redirect: "follow",
                method: "post"
            }

            let result;
            try {
                let rsp = await fetch(url, options)

                // console.log("loaded :", rsp.status, await rsp);
                let content = await rsp.text();
                result = Decoder.Decoder.decode(rsp.url, await content);

            } catch (error) {
                console.error("failed scraping : ", provider, error)
            }

            if (result)
                providers[index] = {
                    ...provider,
                    provider_host: result.host,
                    provider_type: result.type,
                    provider_urls: result.urls
                }
            // console.log(result);
        }

        return providers

    }

    static bypassCORS(url) {
        return `/api/v1/proxy/${url}`;
    }
}