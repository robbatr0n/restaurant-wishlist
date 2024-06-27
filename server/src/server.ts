import express, { Express } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port: string | number = process.env.PORT || 5050;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
