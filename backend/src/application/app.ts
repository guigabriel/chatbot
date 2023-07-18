import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import userRoutes from '../infra/routes/UserRoutes';
import ErrorHandler from '../infra/middlewares/Erro';

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use('/', userRoutes);

app.use(ErrorHandler.execute);


export default app;