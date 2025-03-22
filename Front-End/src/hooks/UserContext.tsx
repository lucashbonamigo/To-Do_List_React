import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { Task } from "../components/TaskBar/ClassTask";
import { getLocalStorage } from "../services/storage/localstorage";
import useGet from "./useGet";
import usePut from "./usePut";

export const UserContext = createContext<UserContextType>({} as UserContextType);

interface UserContextProviderProps {
    children: ReactNode;
}

interface UserContextType {
    tarefas: Task[],
    setTarefas: Dispatch<SetStateAction<Task[]>>,
    httpConfigPut: (body: Task, method: string)=> void,
    notification:string
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [tarefas, setTarefas] = useState<Task[]>([]);
    const [userID, setUserID] = useState<number>(0);
    const { dataGet, httpConfigGet } = useGet(`https://api-todo-ckia.onrender.com/task/tasks?id=${userID}`);
    const { httpConfigPut, dataPut, errorPut } = usePut(`https://api-todo-ckia.onrender.com/task/update`);
    const [notification, setNotification] = useState<string>('');

    useEffect(() => {
        setTarefas(dataGet)
        if (tarefas.length > 0) {
            orderTasks();
        }
        dataPut && setNotification(dataPut);
        errorPut && setNotification(errorPut)
        setTimeout(function() {
            setNotification('')
        }, 3000);
    }, [dataGet, dataPut]);

    useEffect(() => {
        if (!userID) {
            const id = getLocalStorage("id");
            setUserID(Number(id));
        }
        httpConfigGet("GET");
    }, [userID]);

    const orderTasks = () => {
        const checkedTask = tarefas.filter((task: Task) => task.status === 1);
        const unCheckedTask = tarefas.filter((tasks: Task) => tasks.status != 1);

        const ordened = [...unCheckedTask, ...checkedTask];
        setTarefas(ordened);
    }
    return (
        <UserContext.Provider value={{ tarefas, setTarefas, httpConfigPut, notification }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;