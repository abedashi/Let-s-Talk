import express from 'express';
import { errorHandler } from './middlewares/error';
import { userRouter } from './routes/userRoutes';
import { storyRouter } from './routes/storyRoutes';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRouter);
app.use('/api/storys', storyRouter);

app.use(errorHandler);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
