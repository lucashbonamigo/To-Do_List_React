import express from 'express';
import {getTasks, addTask, updateTask, deleteTask} from '../controllers/taskControllers.js'

const taskRouter = express.Router();

taskRouter.post('/add', addTask);
taskRouter.get('/tasks', getTasks);
taskRouter.put('/update', updateTask);
taskRouter.delete('/delete', deleteTask);

export default taskRouter;