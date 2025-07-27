import * as tabService from '../services/tabService.js';
export const addTab = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const user_id = req.user?.id;
        if (!name || !user_id)
            res.status(400).json({ erro: "Campos obrigatórios" });
        const newTab = await tabService.createTab({ name, description, user_id });
        res.status(200).json({ newTab });
    }
    catch (err) {
        next(err);
    }
};
export const updateTabs = async (req, res, next) => {
    try {
        const { name, description, id } = req.body;
        const user_id = req.body;
        if (!name || !description)
            res.status(400).json({ erro: "Campos obrigatórios" });
        await tabService.updateTab({ name, description, user_id }, Number(id));
        res.status(200).json({ success: "Tab atualizada com sucesso" });
    }
    catch (err) {
        next(err);
    }
};
export const deleteTabs = async (req, res, next) => {
    try {
        const { id } = req.query;
        if (!id)
            res.status(400).json({ erro: "Id obrigatório" });
        await tabService.deleteTabs(Number(id));
        res.status(200).json({ success: "Tab deletada com sucesso" });
    }
    catch (err) {
        next(err);
    }
};
export const getTabs = async (req, res, next) => {
    try {
        const id = req.user?.id;
        if (!id)
            res.status(400).json({ erro: "Id obrigatório" });
        const tabs = await tabService.getTabs(Number(id));
        res.status(200).json(tabs);
    }
    catch (err) {
        next(err);
    }
};
