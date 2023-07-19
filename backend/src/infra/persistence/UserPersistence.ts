import { ResultSetHeader } from 'mysql2';
import Conversation from '../../domain/entities/Conversation';
import User from '../../domain/entities/User';
import IUserPersistence from '../../domain/repository/IUserPersistence';
import db from '../../utils/connection';

export default class UserPersistenceMysqlAdapter implements IUserPersistence {
  public register = async (
    entity: Omit<User, 'id'>
  ): Promise<Pick<User, 'id'>> => {
    const query = 'INSERT INTO users (username, password) VALUES(?, ?)';
    const values = [entity.userName, entity.password];
    try {
      const [result] = await db.execute<ResultSetHeader>(query, values);
      const newUser: Pick<User, 'id'> = {
        id: result.insertId,
      };
      return newUser;
    } catch (error) {
      throw new Error('Registration failed. Please try again.');
    }
  };

  public login = async (
    entity: Omit<User, 'id'>
  ): Promise<Pick<User, 'id'>> => {
    const query = 'SELECT * FROM users WHERE username = ?';
    const values = entity.userName;

    const [data] = await db.execute(query, [values]);
    const [user] = data as User[];
    if (!user) {
      throw new Error('Invalid username or password');
    }

    const passwordIsCorrect = entity.password === user.password;

    if (!passwordIsCorrect) {
      throw new Error('Invalid username or password');
    }
    return user;
  };

  public saveConversation = async (
    entity: Pick<Conversation, 'userId' | 'message'>
  ): Promise<Pick<Conversation, 'id'>> => {
    const query = 'INSERT INTO conversation (user_id, message) VALUES(?, ?)';
    const values = [entity.userId, entity.message];
    try {
      const [result] = await db.execute<ResultSetHeader>(query, values);
      return { id: result.insertId };
    } catch (error) {
      throw new Error('Registration failed. Please try again.');
    }
  };

  public getConversation = async (
    entity: Pick<User, 'id'>
  ): Promise<Conversation[] | undefined> => {
    const query = 'SELECT id, user_id, posted_at FROM conversation WHERE user_id = ?';
    const values = [entity.id];
    const [data] = await db.execute(query, values);
    const conversations = data as Conversation[];
    return conversations.length > 0 ? conversations : undefined;
  };
}
