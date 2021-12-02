import express from 'express';
import { router } from './routes/index';

const app = express();

const port = 3001;

app.use(express.json());

app.get('/', (req, res) => res.send('The server is running.'));

app.use(router);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});