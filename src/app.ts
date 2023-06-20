import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { appRoutter } from './routes';

export const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(appRoutter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
