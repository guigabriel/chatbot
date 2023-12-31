/* eslint-disable max-lines-per-function */
import { Request, Response, NextFunction } from 'express';
import UserService from '../../domain/usecase/UseService';
import User from '../../domain/entities/User';
import Conversation from '../../domain/entities/Conversation';
import { parseAsync } from 'json2csv';

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
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  public saveConversation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { userId, message } = req.body;
    if (!userId || !message) {
      return res
        .status(400)
        .json({ error: 'userId and message are required fields.' });
    }
    const Imessage: Pick<Conversation, 'userId' | 'message'> = {
      userId: req.body.userId,
      message: req.body.message,
    };
    try {
      const result = await this.useCase.saveConversation(Imessage);
      return res.status(202).json(result);
    } catch (err) {
      next(err);
    }
  };

  public getConversation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user: Pick<User, 'id'> = {
      id: req.body.id,
    };
    try {
      const result = await this.useCase.getConversation(user);
      if (!result) {
        res.status(404).json({ message: 'Conversation is not found' });
        return;
      }
      try {
        const csv = await parseAsync(result);
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=export.csv');
        res.status(200).end(csv);
      } catch (error) {
        console.error('Error parsing data to CSV:', error);
        res.status(500).send('Error exporting data to CSV.');
      }
    } catch (err) {
      next(err);
    }
  };
}
