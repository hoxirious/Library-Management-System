import express from 'express';
import * as dotenv from 'dotenv';
import { authRouter } from './routes/auth';

const app = express();
dotenv.config();

const port = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => res.send('The server is running.'));

app.use('/api', authRouter);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});