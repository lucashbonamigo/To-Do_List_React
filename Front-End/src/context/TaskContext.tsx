import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Task } from "../components/TaskBar/ClassTask";
import { UserContext } from "./NotificationContext";
import useFetch from "../hooks/useFetch";
import { getLocalStorage } from "../services/storage/localstorage";

export const TaskContext = createContext<TaskContextTypes>({} as TaskContextTypes);

interface TaskContextTypes {
    addTask: (newTask: Task) => void,
    removeTask: (taktToDelete: Task) => void,
    updateTask: (taskToUpdate: Task) => void,
    handleCheckboxChange: (id: number) => void,
    allTasks: Task[],
}

interface TaskContextProviderProps {
    children: ReactNode;
}

export const TaskContextProvider = ({ children }: TaskContextProviderProps) => {
    const { setDescription, setTitle, setType } = useContext(UserContext);
    const { httpConfig: postConfigureTask, data: postResponseTask, error: postErrorTask } = useFetch<Task>(`https://api-todo-ckia.onrender.com/task/add`);
    const { httpConfig: putConfigureTask, error: putErrorTask, data: putUpdateResponse } = useFetch<Task>(`https://api-todo-ckia.onrender.com/task/update`);
    const { data: tasksData, httpConfig: getConfigureTask, error: getErrorTask } = useFetch<Task[]>(`https://api-todo-ckia.onrender.com/task/tasks`);
    const [taskToDeleteID, setTaskToDeleteID] = useState<number>(0);
    const { httpConfig: deleteTask } = useFetch(`https://api-todo-ckia.onrender.com/task/delete?id=${taskToDeleteID}`);
    const [allTasks, setAllTasks] = useState<Task[]>([]);

    const orderTasks = () => {
        const checkedTask = allTasks.filter((task: Task) => task.status === 1);
        const unCheckedTask = allTasks.filter((tasks: Task) => tasks.status != 1);
        const ordened = [...unCheckedTask, ...checkedTask];
        setAllTasks(ordened);
    }

    const addTask = (newTask: Task) => {
        if (!newTask.content.trim()) return;
        setAllTasks((prevTarefas: Task[]) => {
            return [...prevTarefas, newTask];
        })

        postConfigureTask("POST", newTask);
        orderTasks();
    }

    const removeTask = (taktToDelete: Task) => {
        const filteredTasks = allTasks.filter((tarefa: Task) => tarefa.id !== taktToDelete.id);
        setAllTasks(filteredTasks);
        setTaskToDeleteID(taktToDelete.id ? taktToDelete.id : 0);
        deleteTask("DELETE");
        orderTasks();
    }

    const updateTask = (taktToUpdate: Task) => {
        putConfigureTask("PUT", taktToUpdate);
    }

    const handleCheckboxChange = (id: number) => {

        const novasTarefas = allTasks.map((tarefa) =>
            tarefa.id === id ? { ...tarefa, status: tarefa.status === 0 ? 1 : 0 } : tarefa
        );
        const tarefaAtualizada = novasTarefas.find((tarefa) => tarefa.id === id);

        if (tarefaAtualizada) {
            const body = {
                id,
                status: tarefaAtualizada.status,
                content: tarefaAtualizada.content,
                tab_task: tarefaAtualizada.tab_task,
                deadline: tarefaAtualizada.deadline,
                estimatedTime: tarefaAtualizada.estimatedTime,
                repetitions: tarefaAtualizada.Repetitions,
            };
            putConfigureTask("PUT", body);
        }
        setAllTasks(novasTarefas);
    };

    useEffect(() => {
        setAllTasks(tasksData ? tasksData : []);
    }, [tasksData])

    useEffect(() => {
        setAllTasks(prevTasks => [
            ...prevTasks,
            ...(postResponseTask?.newTask ? [postResponseTask.newTask] : [])
        ]);
    }, [postResponseTask]);

    useEffect(() => {
        if (putUpdateResponse?.updatedTask) {
            setAllTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === putUpdateResponse.updatedTask?.id
                        ? putUpdateResponse.updatedTask!
                        : task
                )
            );
            getConfigureTask("GET");
        }
    }, [putUpdateResponse]);

    useEffect(() => {
        if (putErrorTask) {
            setTitle("Erro em atualizar Tabs!")
            setDescription(putErrorTask);
            setType('error');
        };

        if (getErrorTask) {
            setTitle("Erro em atualizar Tabs!")
            setDescription(getErrorTask);
            setType('error');
        };

        if (postErrorTask) {
            setTitle("Erro em atualizar Tabs!")
            setDescription(postErrorTask);
            setType('error');
        };

    }, [getErrorTask, putErrorTask, postErrorTask])

    useEffect(() => {
        if (getLocalStorage('token')) {
            getConfigureTask("GET");
        }
    }, [])

    return (
        <TaskContext.Provider value={{ addTask, removeTask, updateTask, handleCheckboxChange, allTasks }}>
            {children}
        </TaskContext.Provider >
    );
}

export default TaskContextProvider;