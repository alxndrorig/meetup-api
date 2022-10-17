import { dbConnection } from '../config/connection.js';

export const logout = async token => {
  try {
    const userToken = await dbConnection.oneOrNone(
      'SELECT * FROM usertokens WHERE token = $1',
      [token]
    );
    if (!userToken) {
      return { message: 'Logged Out Sucessfully' };
    }
    await dbConnection.one(
      'DELETE FROM usertokens WHERE token = $1 RETURNING *',
      [token]
    );
    return { message: 'Logged Out Sucessfully' };
  } catch (error) {
    console.log(error);
    throw { message: 'Interval Server Error' };
  }
};
