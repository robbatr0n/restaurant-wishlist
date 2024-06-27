import express, { Express } from 'express';
import { notFound, errorHandler } from './middleware/errorMiddleware';
import userRoutes from './routes/userRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port: string | number = process.env.PORT || 5050;

app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
