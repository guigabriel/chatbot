import Conversation from '../entities/Conversation';
import User from '../entities/User';
import IUserPersistence from './IUserPersistence';


export default class UserRepository {
    constructor(private iPersistence: IUserPersistence){}

    public register = async (entity: Pick<User, 'userName' | 'password'>)
    :Promise <Pick<User, 'id'>> => {
        return this.iPersistence.register(entity);
    };

    public login = async (entity: Pick<User, 'userName' | 'password'>)
    : Promise<Pick<User, 'id'> | undefined> => {
        return this.iPersistence.login(entity);
    };

    public saveConversation = async(entity: Pick<Conversation, 'userId' | 'message'>)
    : Promise<Pick<Conversation, 'id'>> => {
        return this.iPersistence.saveConversation(entity);
    };

    public getConversation = async (entity: Pick<User, 'id'>)
    : Promise<Conversation[] | undefined > => {
        return this.iPersistence.getConversation(entity);
    };
}