import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { Task } from "../components/TaskBar/ClassTask";
import { getLocalStorage } from "../services/storage/localstorage";
import useGet from "./useGet";
import usePut from "./usePut";
import { Tab } from "../components/Tabs/classTab";
import usePost from "./usePost";

export const UserContext = createContext<UserContextType>({} as UserContextType);

interface UserContextProviderProps {
    children: ReactNode;
}

interface UserContextType {
    tarefas: Task[],
    setTarefas: Dispatch<SetStateAction<Task[]>>,
    httpConfigPut: (body: Task, method: string)=> void,
    notification:string,
    tabsData: Tab[]|null|undefined,
    httpConfigPost: (body: Tab, method: string)=> void,
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [tarefas, setTarefas] = useState<Task[]>([]);
    const [userID, setUserID] = useState<number>(0);
    const { dataGet: taskData , httpConfigGet: configTask } = useGet<Task[]>(`https://api-todo-ckia.onrender.com/task/tasks?id=${userID}`);
    const { httpConfigPut, dataPut, errorPut } = usePut(`https://api-todo-ckia.onrender.com/task/update`);
    const [notification, setNotification] = useState<string>('');
    const {dataGet: tabsData, httpConfigGet: configData} = useGet<Tab[]>(`https://api-todo-ckia.onrender.com/task/tabs?id=${userID}`);
    const { httpConfigPost, errorPost} = usePost<Tab>('https://api-todo-ckia.onrender.com/tabs/add');

    useEffect(() => {
        setTarefas(taskData ? taskData : [])
        if (tarefas.length > 0) {
            orderTasks();
        }
        dataPut && setNotification(dataPut);
        errorPut && setNotification(errorPut);
        errorPost && setNotification(errorPost)
        setTimeout(function() {
            setNotification('')
        }, 3000);
    }, [taskData, dataPut, errorPost]);

    useEffect(() => {
        if (!userID) {
            const id = getLocalStorage("id");
            setUserID(Number(id));
        }
        configTask("GET");
        configData('GET');
    }, [userID]);

    const orderTasks = () => {
        const checkedTask = tarefas.filter((task: Task) => task.status === 1);
        const unCheckedTask = tarefas.filter((tasks: Task) => tasks.status != 1);

        const ordened = [...unCheckedTask, ...checkedTask];
        setTarefas(ordened);
    }
    return (
        <UserContext.Provider value={{ tarefas, setTarefas, httpConfigPut, notification, tabsData, httpConfigPost }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;