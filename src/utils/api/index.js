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
}