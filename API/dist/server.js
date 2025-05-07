import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import userRouter from './routes/userRoutes.js';
import taskRouter from './routes/taskRoutes.js';
import tabsRouter from './routes/tabsRoutes.js';
import { errorHandler } from './middlewares/errorHancler.js';
const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());
const port = process.env.PORT;
app.use('/user', userRouter);
app.use('/task', taskRouter);
app.use('/tabs', tabsRouter);
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server on In port ${port}`);
});
