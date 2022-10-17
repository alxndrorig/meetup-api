import { dbConnection } from '../config/connection.js';
import User from '../models/user.model.js';

export async function getUserByEmail(email) {
  const user = await dbConnection.oneOrNone(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );
  return user ? new User(user) : null;
}

async function isUserExist(email) {
  const user = await getUserByEmail(email);
  return !!user;
}

export async function createUser(body) {
  if (!(await isUserExist(body.email))) {
    const user = new User(body);
    return dbConnection.one(
      'INSERT INTO users (name, email, hash, salt, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [user.name, user.email, user.hash, user.salt, user.role]
    );
  } else {
    return null;
  }
}
