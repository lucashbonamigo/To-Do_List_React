import { useContext } from 'react'
import { Task } from '../TaskBar/ClassTask'
import { UserContext } from '../../hooks/UserContext';
import EditeDialog from '../popover/EditDialog';
import DeleteDialog from '../popover/DeleteDialog';
import { Text } from '@chakra-ui/react'

interface Iprops {
    task: Task
}

const item = ({ task }: Iprops) => {
    const { setTarefas, taskUpdate } = useContext(UserContext);
    
    const handleCheckboxChange = (id: number) => {
        setTarefas((prevTarefas: Task[]) => {
            const novasTarefas = prevTarefas.map((tarefa) =>
                tarefa.id === id ? { ...tarefa, status: tarefa.status === 0 ? 1 : 0} : tarefa
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
                taskUpdate(body, "PUT");
            }
            return novasTarefas;
        });
    };

    return (
        <>
            <input
                type="checkbox"
                checked={task.status === 1 ? true : false}
                onChange={() => handleCheckboxChange(task.id)}
            />
            <Text className="text" w={"100%"} ml={".5em"}>
                {task.content}
            </Text>
            <EditeDialog tarefa={task} />
            <DeleteDialog tarefa={task} />
        </>
    )
}
export default item