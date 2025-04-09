import asyncHandler from 'express-async-handler';
import { RequestHandler } from 'express';
import * as taskService from '../services/tasksService.js';

export const getTasks: RequestHandler  = asyncHandler(async(req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            res.status(400).json({ erro: "ID do usuário não pode ser vazio" });
            return;
        }
        const tarefas  = await taskService.getTasks(Number(id));
        res.status(200).json(tarefas);
    } catch (error) {
        res.status(500).send({ erro: "Erro de servidor" })
    }
});

export const addTask: RequestHandler = asyncHandler(async(req, res) => {
    try {
        const { content, tab_task, repetitions, estimatedTime, deadline, status, id } = req.body;
        if (!content) {
            res.status(400).json({ erro: "Conteudo da tarefa não pode ser vazio" });
            return;
        }
        await taskService.createTask({content,tab_task, repetitions, estimatedTime, deadline, status, user_id: id});
        res.status(201).json({ success: "Tarefa criada com sucesso" });
    } catch (error) {
        console.log("erro no servidor", error)
        res.status(500).json({ erro: "Erro de servidor" })
    }
});

export const updateTask: RequestHandler = asyncHandler(async(req, res)=>{
    try {
        const {content, tab_task, repetitions, hours, deadline, status, id} = req.body;
        if (!content) {
            res.status(400).json({ erro: "Conteudo da tarefa não pode ser vazio" });
            return;
        }
        await taskService.updateTask( {content, tab_task, repetitions, estimatedTime: hours, deadline, status, user_id: id});
        res.status(200).json({ success: "Tarefa atualizada com sucesso" });
    } catch (error) {
        console.log(error)
        res.status(500).json({erro: "Erro de servidor", error})
    }
});

export const deleteTask: RequestHandler = asyncHandler(async(req, res) => {
    try {
        const { id } = req.body;
       if (!id){
        res.status(400).json({erro: "ID da tarefa não pode ser vazio"});
        return;
       }
       taskService.deleteTask(id);
       res.status(200).json({success: "Tarefa deletada com sucesso"});
    }catch(err){
        res.status(500).json({erro: "Erro de servidor"})
    }
});