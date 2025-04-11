import { NextFunction, RequestHandler } from 'express';
import * as tabService from '../services/tabService.js';

export const addTab: RequestHandler = async (req, res, next: NextFunction) => {
    try {
      const { name, description, user_id } = req.body;
      if (!name || !user_id) res.status(400).json({ erro: "Campos obrigatórios" });
  
      await tabService.createTab({ name, description, user_id });
       res.status(201).json({ success: "Tab criada com sucesso" });
    } catch (err) {
        next(err)
    }
};

export const updateTabs: RequestHandler = async (req, res, next: NextFunction) =>{
    try {
        const { name, description, user_id, id } = req.body;
        if (!name || !description) res.status(400).json({ erro: "Campos obrigatórios" });

        await tabService.updateTab({ name, description, user_id }, Number(id));
        res.status(200).json({ success: "Tab atualizada com sucesso" });
    } catch (err) {
        next(err)
    }
}

export const deleteTabs: RequestHandler = async (req, res, next: NextFunction) =>{
    try{
        const { id } = req.query;
        if(!id) res.status(400).json({erro: "Id obrigatório"});
        await tabService.deleteTabs(Number(id));
        res.status(200).json({success: "Tab deletada com sucesso"});
    }catch(err){
        next(err)
    }
}

export const getTabs: RequestHandler = async (req, res, next: NextFunction) => {
    try {
        const { id } = req.query;
        if (!id) res.status(400).json({ erro: "Id obrigatório" });
        const tabs = await tabService.getTabs(Number(id));
        res.status(200).json(tabs);
    } catch (err) {
        next(err)
    }
}