import * as Decoder from "./decoder"
import axios from "axios"

export default class API {


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
     * @param  {number} episode_id Episode id
     */
    static getEpisode(episode_id) {
        return this.server.get(`/episode/${episode_id}`).then(rsp => rsp.data).catch(this.errorHandler);
    }

    static fetchProvider = async (url, proxy = true) => {
        // temporary ok.ru provider url fix
        if (url.includes('ok.ru')) url = url.replace("/video/", "/videoembed/").replace("m.", "")
        
        const headers = { 'user-agent': "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36" }
        const blacklistHeaders = ["sec-ch.*"]
        
        const method = Decoder?.DeServers?.find(prov => url.includes(prov?.name))?.rq === 1 ? "POST" : "GET"

        return this.server
            ({
                url: proxy ? "/proxy" : url,
                method,
                params: proxy && {
                    url,
                    headers,
                    blacklistHeaders
                },
                //null transform (we do not want to parse as JSON);
                transformResponse: (r) => r
            })
            .then(rsp => rsp.data)
            .then(content => Decoder?.decode(url, content))
            .catch(this.errorHandler)
    }
}