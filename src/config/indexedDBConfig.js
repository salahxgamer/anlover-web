/**
 * @typedef {Object} DBConfig
 * @property {string} name - db name
 * @property {number} version - db version
 * @property {Object} schemaDefinitions - db schema definitions
 */

/**
 * @type {DBConfig}
 */
const DBConfig = {
    name: 'AnLoverLocalDB',
    version: 1,
    schemaDefinitions: {
        watchHistory: "&episodeId, animeId, progress, updatedAt"
    }
};

export default DBConfig