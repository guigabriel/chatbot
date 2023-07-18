import Conversation from '../entities/Conversation';
import User from '../entities/User';
import UserRepository from '../repository/UserRepository';

export default class UserService {
    
  constructor(private repository: UserRepository) {}

  public register = async (
    entity: Omit<User, 'id'>
  ): Promise<Pick<User, 'id'>> => {
    if (entity.userName.length < 3) {
      throw new Error('Username is too short');
    }
    if (entity.password.length < 5) {
      throw new Error('Password is too short');
    }
    return this.repository.register(entity);
  };

  public login = async (
    entity: Omit<User, 'id'>
  ): Promise<Pick<User, 'id'> | undefined> => {
    return this.repository.login(entity);
  };

  public saveConversation = async (
    entity: Pick<Conversation, 'userId' | 'message'>
  ): Promise<Pick<Conversation, 'id'>> => {
    if(entity.userId === undefined){
      throw new Error('You need to pass an user id');
    }
    return this.repository.saveConversation(entity);
  };

  public getConversation = async (
    entity: Pick<User, 'id'>
  ): Promise<Conversation[] | undefined> => {
    return this.repository.getConversation(entity);
  };
}
