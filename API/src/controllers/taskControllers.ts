import asyncHandler from 'express-async-handler';
import { NextFunction, RequestHandler } from 'express';
import * as taskService from '../services/tasksService.js';

export const getTasks: RequestHandler  = asyncHandler(async(req, res, next: NextFunction) => {
    try {
        const { id } = req.query;
        if (!id) {
            res.status(400).json({ erro: "ID do usuário não pode ser vazio" });
            return;
        }
        const tarefas = await taskService.getTasks(Number(id));
        res.status(200).json(tarefas);
    } catch (error) {
        next(error)
    }
});

export const addTask: RequestHandler = asyncHandler(async(req, res, next: NextFunction) => {
    try {
        const { content, tab_task, repetitions, estimatedTime, deadline, status, id } = req.body;
        if (!content) {
            res.status(400).json({ erro: "Conteudo da tarefa não pode ser vazio" });
            return;
        }
       const newTask = await taskService.createTask({content,tab_task, repetitions, estimatedTime, deadline, status, user_id: id});
        res.status(201).json({ newTask });
    } catch (error) {
        next(error)
    }
});

export const updateTask: RequestHandler = asyncHandler(async(req, res, next: NextFunction)=>{
    try {
        const {content, tab_task, repetitions, hours, deadline, status, id} = req.body;
        if (!content) {
            res.status(400).json({ erro: "Conteudo da tarefa não pode ser vazio" });
            return;
        }
        await taskService.updateTask( {content, tab_task, repetitions, estimatedTime: hours, deadline, status, user_id: id});
        res.status(200).json({ success: "Tarefa atualizada com sucesso" });
    } catch (error) {
        next(error)
    }
});

export const deleteTask: RequestHandler = asyncHandler(async(req, res, next: NextFunction) => {
    try {
        const { id } = req.query;
       if (!id){
        res.status(400).json({erro: "ID da tarefa não pode ser vazio"});
        return;
       }
       await taskService.deleteTask(Number(id));
       res.status(200).json({success: "Tarefa deletada com sucesso"});
    }catch(err){
        next(err)
    }
});