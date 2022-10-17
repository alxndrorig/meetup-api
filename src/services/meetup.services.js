import { dbConnection } from '../config/connection.js';
import { MeetupDTO } from '../dto/meetup.dto.js';
import MeetupModel from '../models/meetup.model.js';

async function getAll(query) {
  const filters = [];

  query.title ? filters.push(`title LIKE '%${query.title}%'`) : null;
  query.description
    ? filters.push(`description LIKE '%${query.description}%'`)
    : null;
  query.keywords ? filters.push(`(keywords && '\{${query.keywords}\}')`) : null;
  query.date ? filters.push(`date = '${query.date}'`) : null;
  query.location ? filters.push(`location LIKE '%${query.location}%'`) : null;

  let sqlRequest = 'SELECT * FROM meetups';

  sqlRequest += filters.length > 0 ? ` WHERE ${filters.join(' AND ')}` : '';
  sqlRequest += query.sort ? ` ORDER BY ${query.sort} DESC` : '';
  sqlRequest += query.page ? ` LIMIT ${query.page * 10}` : '';

  try {
    const meetups = await dbConnection.any(sqlRequest);
    return meetups.map(meetup => new MeetupDTO(meetup));
  } catch (error) {
    throw error;
  }
}

async function getById(id) {
  try {
    return new MeetupDTO(
      await dbConnection.one(`SELECT * FROM meetups WHERE id = $1`, [id])
    );
  } catch {
    return false;
  }
}

async function create(body) {
  const model = new MeetupModel(body);
  try {
    return new MeetupDTO(
      await dbConnection.one(
        'INSERT INTO meetups(title, description, keywords, date, location) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [
          model.title,
          model.description,
          model.keywords,
          model.date,
          model.location,
        ]
      )
    );
  } catch (error) {
    throw error;
  }
}

async function remove(id) {
  try {
    return await dbConnection.result('DELETE FROM meetups WHERE id = $1', [id]);
  } catch (error) {
    throw error;
  }
}

async function update(id, body) {
  const model = new MeetupModel(body);
  try {
    return new MeetupDTO(
      await dbConnection.oneOrNone(
        'UPDATE meetups SET title = $1, description = $2, keywords = $3, date = $4, location = $5 WHERE id = $6 RETURNING *',
        [
          model.title,
          model.description,
          model.keywords,
          model.date,
          model.location,
          id,
        ]
      )
    );
  } catch (error) {
    throw error;
  }
}

export { getAll, getById, create, remove, update };
