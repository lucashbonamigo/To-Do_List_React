import { Button, Flex } from '@chakra-ui/react'
import { Task } from './ClassTask'
import { useContext, useRef, useState } from 'react';
import usePost from '../../hooks/usePost';
import LoginInput from '../LoginInput/LoginInput';
import { MdAddTask } from 'react-icons/md';
import { UserContext } from '../../hooks/UserContext';

const TskBar = () => {
    const [novaTarefa, setNovaTarefa] = useState("");
    const [deadline, setDeadline] = useState<Date>();
    const [repetitions, setRepetitions] = useState<number>();
    const [estimedTime, setEstmedTime] = useState<number>();
    const { httpConfigPost } = usePost('https://api-todo-ckia.onrender.com/task/add');
    const ref = useRef<HTMLInputElement>(null);
    const { selectedTab, userID, setTarefas, configTask } = useContext(UserContext);

    const addTaks = () => {
        if (!novaTarefa.trim()) return;
        const task = new Task(userID, novaTarefa, 0, Number(selectedTab), deadline, repetitions, estimedTime);
        setTarefas((prevTarefas: Task[]) => {
            return [...prevTarefas, task];
        })
        setNovaTarefa("");
        if (ref.current) {
            ref.current.focus();
        }
        configTask()
        httpConfigPost(task, "POST");
    }

    return (
        <Flex direction={"Column"} w={{base:"200px", sm: "400px"}}>
            <LoginInput labelInput={"Tarefa"} width={{base:"200px", sm: "380px"}} onChange={setNovaTarefa} type={"Text"} value={novaTarefa} />
            <Flex gap={2}  direction={{base: "column", sm:"row"}}alignItems={'end'} justifyContent={'space-between'} >
                <LoginInput labelInput={"Horas (Qnt)"} width={{base:"200px", sm: "70px"}} onChange={setEstmedTime} type={"Number"} value={estimedTime} />
                <LoginInput labelInput={"Repetições"} width={{base:"200px", sm: "70px"}} onChange={setRepetitions} type={"Number"} value={repetitions} />
                <LoginInput labelInput={"Data Limite"} width={{base:"200px", sm: "130px"}} onChange={setDeadline} type={"Date"} value={deadline} />
                <Button
                    onClick={() => addTaks()}
                    disabled={!novaTarefa.trim()}
                    bg={'lightgreen'}
                >
                    < MdAddTask />
                </Button>
            </Flex>
        </Flex>
    )
}
export default TskBar;
