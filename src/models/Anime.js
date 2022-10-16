import { snakeToTitleCase } from "../utils/helper";
import Episode from "./Episode";

/**
 * Represents an anime (TV, Movie...)
 * @class
 * @public
 */
class Anime {

    /**
     * @param {Object} serializedAnime
     */
    constructor(serializedAnime) {

        if (!serializedAnime.anime_id) throw Error("No anime id supplied, serializedAnime.id is required")

        /**
         * Raw serialized anime data
         * @type {Object}
         * @public
         */
        this._rawData = serializedAnime;

        /**
         * Anime Unique ID
         * @type {!string}
         * @public
         */
        this.id = serializedAnime.anime_id;
        /**
         * Anime Title
         * @type {?string}
         * @public
         */
        this.title = serializedAnime.anime_name;
        /**
         * The english title version
         * @type {?string}
         * @public
         */
        this.englishTitle = serializedAnime.anime_english_title;
        /**
         * Brief Description of anime
         * @type {?string}
         * @public
         */
        this.description = serializedAnime.anime_description;
        /**
         * Anime related Keywords
         * @type {?string[]}
         * @public
         */
        this.keywords = serializedAnime.anime_keywords?.split(",").map(k => k.trim());

        /**
         * Anime type (`Movie`, `TV`, `OVA`, `ONA`...)
         * @type {?("Movie"|"TV"|"OVA"|"ONA"|string)}
         * @public
         */
        this.type = serializedAnime.anime_type;
        /**
         * Anime airing status (`Finished Airing`, `Currently Airing`, `Not Yet Aired`...) 
         * @type {?("Finished Airing"|"Currently Airing"|"Not Yet Aired"|string)}
         * @public
         */
        this.status = serializedAnime.anime_status;
        /**
         * Is the anime stream and infos available
         * @type {boolean}
         * @public
         */
        this.justInfo = serializedAnime.just_info === "Yes";
        /**
         * Is the anime featured
         * @type {boolean}
         * @public
         */
        this.isFeatured = serializedAnime.anime_featured === "Featured";

        /**
         * Anime release season (`Fall`, `Summer`, `Spring`, `Winter`...)
         * @type {?("Fall"|"Summer"|"Spring"|"Winter"|string)}
         * @public
         */
        this.season = serializedAnime.anime_season;
        /**
         * Anime relase year
         * @type {?(string|number)}
         * @public
         */
        this.releaseYear = serializedAnime.anime_release_year;
        /**
         * Anime release day (`Monday`, `Tuesday`...)
         * @type {?string}
         * @public
         */
        this.releaseDay = serializedAnime.anime_release_day;

        /**
         * Anime genres
         * @type {?Array<{id:string, label:string}>}
         * @public
         */
        this.genres = serializedAnime.anime_genres?.split(",").map((label, index) => ({
            id: serializedAnime.anime_genre_ids?.split(",").at(index)?.trim(),
            label: label.trim(),
        }));

        /**
         * Age rated for the anime
         * @type {?string}
         * @public
         */
        this.ageRating = serializedAnime.anime_age_rating;
        /**
         * Users rating of the anime
         * @type {?string}
         * @public
         */
        this.rating = serializedAnime.anime_rating;
        /**
         * How many users rated the anime
         * @type {?number}
         * @public
         */
        this.ratingUserCount = Number(serializedAnime.anime_rating_user_count);
        /**
         * Anime content rating (Nudity, Violence, Profanity...)
         * @type {?Array<{content_type:string, level:string, vote_count:number}>}
         * @public
         */
        this.contentRating = serializedAnime.content_rating?.map(rating => ({
            ...rating,
            label: snakeToTitleCase(rating.content_type),
        }));

        /**
         * Anime images (cover, banner...)
         * @type {?{cover:string, coverFull:string, banner:string}}
         * @public
         */
        this.images = {
            cover: serializedAnime.anime_cover_image_url,
            coverFull: serializedAnime.anime_cover_image_full_url,
            banner: serializedAnime.anime_banner_image_url,
        }

        /**
         * URL of anime trailer
         * @type {?string}
         * @public
         */
        this.trailerUrl = serializedAnime.anime_trailer_url || serializedAnime.more_info_result?.trailer_url;

        /**
         * Anime update date
         * @type {?Date}
         * @public
         */
        this.updatedAt = serializedAnime.anime_updated_at ? new Date(serializedAnime.anime_updated_at) : null;
        /**
         * Anime creation date
         * @type {?Date}
         * @public
         */
        this.createdAt = serializedAnime.anime_created_at ? new Date(serializedAnime.anime_created_at) : null;

        /**
         * Anime studios
         * @type {?Array<{id:string, label:string}>}
         * @public
         */
        this.studios = serializedAnime.more_info_result?.anime_studios?.split(",").map((label, index) => ({
            id: serializedAnime.more_info_result?.anime_studio_ids?.split(",").at(index)?.trim(),
            label: label.trim()
        }));
        /**
         * Anime air info
         * @type {{from:?Date, to:?Date}}
         * @public
         */
        this.aired = {
            from: serializedAnime.more_info_result?.aired_from ? new Date(serializedAnime.more_info_result?.aired_from) : null,
            to: serializedAnime.more_info_result?.aired_to ? new Date(serializedAnime.more_info_result?.aired_to) : null
        };
        /**
         * Anime source (Manga...)
         * @type {?string}
         * @public
         */
        this.source = serializedAnime.more_info_result?.source;
        /**
         * Anime average episode duration
         * @type {?string}
         * @public
         */
        this.duration = serializedAnime.more_info_result?.duration;
        /**
         * Episodes count
         * @type {?(string|number)}
         * @public
         */
        this.episodesCount = serializedAnime.more_info_result?.episodes || serializedAnime.episodes?.data?.length;

        /**
         * Episodes of the anime
         * @type {?Array<Episode>}
         * @public
         */
        this.episodes = serializedAnime.episodes?.data?.map(serializedEpisode => new Episode(serializedEpisode));

        /**
         * Other related animes to this
         * @type {?Array<(Anime|Object)>}
         * @public
         */
        this.relatedAnimes = serializedAnime.related_animes?.data?.map(serializedRelatedAnime => new Anime(serializedRelatedAnime));

        /**
         * Other recommended animes to this
         * @type {?Array<(Anime|Object)>}
         * @public
         */
        this.recommendations = serializedAnime.related_recommendations?.data?.map(serializedRelatedAnime => new Anime(serializedRelatedAnime));

        /**
         * News related to this anime
         * @type {?Array<Object>}
         * @public
         */
        this.news = serializedAnime.related_news?.data;

    }

    /**
     * Anime genres labels
     * @type {?Array<string>}
     * @public
     */
    get genresLabels() {
        return this.genres.map(genre => genre.label)
    }

    /**
     * Anime studios labels
     * @type {?Array<string>}
     * @public
     */
    get studiosLabels() {
        return this.studios.map(studio => studio.label)
    }

}

export default Anime;