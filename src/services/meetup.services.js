import { dbConnection } from "../config/connection.js";
import { MeetupDTO } from "../dto/meetup.dto.js"
import { queryValidation } from "../validations/query.validation.js";

async function getAll(query) {
    const filters = [];
    
    query.title ? filters.push(`title LIKE '%${query.title}%'`) : null;
    query.description ? filters.push(`description LIKE '%${query.description}%'`) : null;
    query.keywords ? filters.push(`(keywords && '\{${query.keywords}\}')`) : null;
    query.date ? filters.push(`date = '${query.date}'`) : null;
    query.location ? filters.push(`location LIKE '%${query.location}%'`) : null;

    let sqlRequest = 'SELECT * FROM meetups';

    sqlRequest += filters.length > 0 ? ` WHERE ${filters.join(' AND ')}` : '';
    sqlRequest += query.sort ? ` ORDER BY ${query.sort} DESC` : '';
    sqlRequest += query.page ? ` LIMIT ${query.page * 10}` : '';
    

    try {
        const meetups = await dbConnection.any(sqlRequest);
        return meetups.map(meetup => new MeetupDTO(meetup))
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
        return await dbConnection.result('DELETE FROM meetups WHERE id = $1', [id]);
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