import { dbConnection } from "../config/connection.js";

async function getAll() {
    try {
        return await dbConnection.any('SELECT * FROM meetups');
    } catch(error) {
        throw error;
    }
}


async function getById(id) {
    try {
        return await dbConnection.one(`SELECT * FROM meetups WHERE id = $1`, [id]);
    } catch {
        return false;
    }
}


async function create({title, description, keywords, date, location}) {
    try {
        return await dbConnection.one('INSERT INTO meetups(title, description, keywords, date, location) VALUES ($1, $2, $3, $4, $5) RETURNING *', [title, description, keywords, date, location]);
    } catch (error) {
        throw error;
    }
}  


async function remove(id) {
    try {
        const result = await dbConnection.result('DELETE FROM meetups WHERE id = $1', [id]);
        return result;
    } catch(error) {
        throw error;
    }
}

async function update(id, body) {
    try {
        return await dbConnection.result('UPDATE meetups SET title = $2, description = $3, keywords = $4, date = $5, location = $6 WHERE id = $1 RETURNING *', 
        [id, body.title, body.description, body.keywords, body.date, body.location]);
    } catch (error) {
        throw error;
    }
}

export { getAll, getById, create, remove, update }