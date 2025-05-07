import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { Task } from "../components/TaskBar/ClassTask";
import { getLocalStorage } from "../services/storage/localstorage";
import useGet from "./useGet";
import usePut from "./usePut";
import { Tab } from "../components/Tabs/classTab";
import usePost from "./usePost";
import useDelete from "./useDelete";

export const UserContext = createContext<UserContextType>({} as UserContextType);

interface UserContextProviderProps {
    children: ReactNode;
}

interface UserContextType {
    tarefas: Task[],
    setTarefas: Dispatch<SetStateAction<Task[]>>,
    tabsUpdate: (body: Tab, method: string) => void,
    taskUpdate: (body: Task, method: string) => void,
    notification: string,
    tabs: Tab[],
    httpConfigPost: (body: Tab, method: string) => void,
    selectedTab: string,
    setSelectedTab: Dispatch<SetStateAction<string>>,
    userID: number,
    setTabs: Dispatch<SetStateAction<Tab[]>>,
    orderTasks: () => void,
    httpConfigDel: (url : string)=> void
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [tarefas, setTarefas] = useState<Task[]>([]);
    const [tabs, setTabs] = useState<Tab[]>([]);
    const [userID, setUserID] = useState<number>(0);
    const { dataGet: taskData, httpConfigGet: configTask } = useGet<Task[]>(`https://api-todo-ckia.onrender.com/task/tasks?id=${userID}`);
    const { httpConfigPut: taskUpdate, dataPut: taskDataPut, errorPut: taskErrorPut } = usePut<Task>(`https://api-todo-ckia.onrender.com/task/update`);
    const { httpConfigPut: tabsUpdate, dataPut: tabsDataPut, errorPut: tabsErrorPut } = usePut<Tab>(`https://api-todo-ckia.onrender.com/tabs/update`);
    const [notification, setNotification] = useState<string>('');
    const { dataGet: tabsData, httpConfigGet: configData } = useGet<Tab[]>(`https://api-todo-ckia.onrender.com/tabs/tabs?id=${userID}`);
    const { httpConfigPost, errorPost, dataPost } = usePost<Tab>('https://api-todo-ckia.onrender.com/tabs/add');
    const [selectedTab, setSelectedTab] = useState<string>('0');
    const { httpConfigDel } = useDelete();

    useEffect(() => {
        setTarefas(taskData ? taskData : [])
        setTabs(tabsData ? tabsData : []);
        if (tarefas.length > 0) {
            orderTasks();
        }
        taskErrorPut && setNotification(taskErrorPut);
        tabsErrorPut && setNotification(tabsErrorPut);
        errorPost && setNotification(errorPost)
        setTimeout(function () {
            setNotification('')
        }, 3000);
    }, [taskData, taskDataPut, tabsDataPut, errorPost]);

    useEffect(() => {
        if (tabs.length > 0) {
            setSelectedTab(tabs[0].id.toString());
        }
    }, [tabs]);

    useEffect(() => {
        if (!userID) {
            const id = getLocalStorage("id");
            setUserID(Number(id));
        }
        configTask("GET");
        configData("GET");
        orderTasks()
    }, [userID, dataPost]);

    const orderTasks = () => {
        const checkedTask = tarefas.filter((task: Task) => task.status === 1);
        const unCheckedTask = tarefas.filter((tasks: Task) => tasks.status != 1);
        const ordened = [...unCheckedTask, ...checkedTask];
        setTarefas(ordened);
    }
    return (
        <UserContext.Provider value={{ tarefas, userID, setTarefas, selectedTab, setSelectedTab, taskUpdate, tabsUpdate, notification, tabs, setTabs, httpConfigPost, orderTasks, httpConfigDel }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;