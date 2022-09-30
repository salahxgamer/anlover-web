import Dexie from 'dexie';
import DBConfig from "../config/indexedDBConfig";

const db = new Dexie(DBConfig.name);
db.version(DBConfig.version).stores(DBConfig.schemaDefinitions);

export default db;

export const watchHistory = db.table("watchHistory")

export const addEpisodeToHistory = (data) => watchHistory.put({ ...data, updatedAt: new Date() });
export const getAllEpisodesFromHistory = () => watchHistory.toArray();
export const getEpisodeFromHistory = (id) => watchHistory.get(id);
export const deleteEpisodeFromHistory = (id) => watchHistory.delete(id);
export const deleteAllEpisodesFromHistory = () => watchHistory.clear();
