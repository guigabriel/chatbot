import {Router} from 'express';

import userController from '../factory/UserFactory';
const userRoutes = Router();

userRoutes.post('/', userController.login);
userRoutes.post('/register', userController.register);
userRoutes.post('/save', userController.saveConversation);
userRoutes.get('/csv', userController.getConversation);

export default userRoutes;