import express, { Express } from 'express';
import connectDB from './config/db';
import { notFound, errorHandler } from './middleware/errorMiddleware';
import userRoutes from './routes/userRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port: string | undefined = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/api/users', userRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
