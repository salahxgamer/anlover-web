import * as Decoder from "./decoder"

export default class API {

    static AUTH_HEADERS = {
        'client-id': process.env.REACT_APP_API_CLIENT_ID,
        'client-secret': process.env.REACT_APP_API_CLIENT_SECRET,
        'Authorization': `Bearer ${process.env.REACT_APP_API_AUTHORIZATION}`,
    };
    static BASE_URL = process.env.REACT_APP_API_BASE_URL;

    static options = {
        animes_list: {
            _order_by: ["latest_first", "earliest_first", "anime_name_asc", "anime_name_desc",
                "anime_year_asc", "anime_year_desc", "anime_rating_desc", "best_match", "mal_rank_asc"],
            list_type: ["latest_episodes", "custom_list", "anime_list", "currently_airing", "latest_updated_episode",
                "latest_updated_episode_new", "top_anime", "top_currently_airing", "top_tv", "top_movie", "featured",
                "filter", "favorites", "watching", "plan_to_watch", "watched", "dropped", "on_hold", "watched_history",
                "schedule", "last_added_tv", "last_added_movie", "top_anime_mal", "top_currently_airing_mal", "top_tv_mal",
                "top_movie_mal", "anime_characters", "top_upcoming", "top_upcoming_catalog"]
        }
    }


    constructor() {
        return this
    }

    /**
     * @param  {} _offset Offset from result
     * @param  {} _limit Limit of queries
     * @param  {} _order_by One of `"latest_first", "earliest_first", "anime_name_asc", "anime_name_desc", "anime_year_asc", "anime_year_desc", "anime_rating_desc", "best_match", "mal_rank_asc"`
     * @param  {} list_type One of `"latest_episodes", "custom_list", "anime_list", "currently_airing", "latest_updated_episode", "latest_updated_episode_new", "top_anime", "top_currently_airing", "top_tv", "top_movie", "featured", "filter", "favorites", "watching", "plan_to_watch", "watched", "dropped", "on_hold", "watched_history", "schedule", "last_added_tv", "last_added_movie", "top_anime_mal", "top_currently_airing_mal", "top_tv_mal", "top_movie_mal", "anime_characters", "top_upcoming", "top_upcoming_catalog"`
     * @param  {} user_id Specify a user id if you want to get a user's list. If you don't specify a user id, it will return the current user's list.
     */
    static getAnimes(_offset = 0, _limit = 100, _order_by = "latest_first", list_type = "top_anime", user_id = 2346241) {
        let params = `json={"_offset":${_offset},"_limit":${_limit},"_order_by":"${_order_by}","list_type":"${list_type}","just_info":"Yes","user_id":${user_id}}`
        if (this.options.animes_list._order_by.includes(_order_by) && this.options.animes_list.list_type.includes(list_type))
            return fetch(`${this.BASE_URL}/animes/get-published-animes?${params}`, { method: 'GET', headers: this.AUTH_HEADERS })
                .then(response => response.json())
                .then(response => response.response.data)
                .catch((error, data) => { console.error(error, data); return [] })

        console.error(`Invalid order_by or list_type`);
    }

    /**
     * @param  {} anime_id Anime id
     */
    static getAnime(anime_id) {
        let params = `anime_id=${anime_id}&fetch_episodes=Yes&more_info=Yes`
        return fetch(`${this.BASE_URL}/anime/get-anime-details?${params}`, { method: 'GET', headers: this.AUTH_HEADERS })
            .then(response => response.json())
            .then(response => response.response)
            .catch((error, data) => { console.error(error, data); return {} })
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