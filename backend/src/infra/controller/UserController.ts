import { Request, Response, NextFunction } from 'express';
import UserService from '../../domain/usecase/UseService';
import User from '../../domain/entities/User';
import Conversation from '../../domain/entities/Conversation';

export default class UserController {
  constructor(private useCase: UserService) {}

  public register = async (req: Request, res: Response, next: NextFunction) => {
    const newUser: Omit<User, 'id'> = {
      userName: req.body.userName,
      password: req.body.password,
    };
    try {
      const result = await this.useCase.register(newUser);
      return res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    const user: Omit<User, 'id'> = {
      userName: req.body.userName,
      password: req.body.password,
    };
    try {
      const result = await this.useCase.login(user);
      return res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  };

  public saveConversation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const message: Pick<Conversation, 'userId' | 'message'> = {
      userId: req.body.userId,
      message: req.body.message,
    };
    try {
      const result = await this.useCase.saveConversation(message);
      return res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  };

  public getConversation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { userId } = req.body;
    try {
      const result = await this.useCase.getConversation(userId);
      if (result === undefined)
        res.status(404).json({ message: 'Conversation is not found' });
      return res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  };
}
