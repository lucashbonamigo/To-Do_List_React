import express from 'express';
import { addTabs, updateTabs, deleteTabs, getTabs } from '../controllers/tabsControllers.js';
const tabsRouter = express.Router();
tabsRouter.post('/add', addTabs);
tabsRouter.get('/tabs', getTabs);
tabsRouter.put('/update', updateTabs);
tabsRouter.delete('/delete', deleteTabs);
export default tabsRouter;
