import express from 'express';
import cors from 'cors';
import { router } from './routes/index';

const app = express();

const port = 3001;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('The server is running.'));

app.use('/api', router);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});