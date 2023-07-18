import { ResultSetHeader } from 'mysql2';
import db from '../utils/connection';

export default class UserModels {

  public register = async (username: string, password: string) => {
    const query = 'INSERT INTO users (username, password) VALUES(?, ?)';
    const values = [username, password];
    try {
      const [result] = await db.execute<ResultSetHeader>(query, values);
      return result.insertId;
    } catch (error) {
      throw new Error('Registration failed. Please try again.');
    }
  };

  public login = async (username: string, password: string) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    const values = username;

    const [data] = await db.execute(query, [values]);
    const [user] = data as any;
    if (!user) {
      throw new Error('Invalid username or password');
    }

    const passwordIsCorrect = password === user.password;

    if (!passwordIsCorrect) {
      throw new Error('Invalid username or password');
    }
    return user.id;
  };

  public saveConversation = async(userId: number, message: string) => {
    const query = 'INSERT INTO conversation (user_id, message) VALUES(?, ?)';
    const values = [userId, message];
    try {
        const [result] = await db.execute<ResultSetHeader>(query, values);
        return result.insertId;
      } catch (error) {
        throw new Error('Registration failed. Please try again.');
      }

  };

  public getConversation = async(id: number) => {
    const query = 'SELECT * FROM conversation WHERE user_id = ?';
    const values = id;
    const [data] = await db.execute(query, [values]);
    const [user] = data as any;
    return user || undefined;
  };
}
