import Conversation from '../entities/Conversation';
import User from '../entities/User';

export default interface IUserPersistence {
    register(entity: Omit<User, 'id'>): Promise<Pick<User, 'id'>>
    login(entity: Omit<User, 'id'>): Promise<Pick<User, 'id'> | undefined>
    saveConversation(
        entity: Pick<Conversation, 'userId' | 'message'>
        ): Promise<Pick<Conversation, 'id' >>
    getConversation(entity: Pick<User, 'id'>): Promise<Conversation[] | undefined>
}