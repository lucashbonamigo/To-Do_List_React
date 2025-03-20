import { Button, Flex } from '@chakra-ui/react'
import { Task } from './ClassTask'
import { FormEvent, useRef, useState } from 'react';
import usePost from '../../hooks/usePost';
import LoginInput from '../LoginInput/LoginInput';
import { getLocalStorage } from '../../services/storage/localstorage';

const TskBar = () => {
    const [novaTarefa, setNovaTarefa] = useState("");
    const [deadline, setDeadline] = useState<Date>();
    const [repetitions, setRepetitions] = useState<number>();
    const [estimedTime, setEstmedTime] = useState<number>()
    const { httpConfigPost } = usePost('https://api-todo-ckia.onrender.com/task/add');
    const ref = useRef<HTMLInputElement>(null);
    const [idUser, setIdUser] = useState<number>(0)

    
    const adicionar1 = (e: FormEvent<HTMLFormElement>) => {
        setIdUser(Number(getLocalStorage("id")))
        e.preventDefault();
        if (!novaTarefa.trim()) return;

        const task = new Task(idUser,novaTarefa, 0, deadline, repetitions, estimedTime);
        httpConfigPost(task, "POST");
        setNovaTarefa("");

        if (ref.current) {
            ref.current.focus();
        }
    }

    return (
        <form onSubmit={adicionar1}>
            <LoginInput labelInput={"Tarefa"} width='80%' onChange={setNovaTarefa} type={"Text"} value={novaTarefa} />
            <Flex gap={2}>
                <LoginInput labelInput={"Horas (Qnt)"} width='70px' onChange={setEstmedTime} type={"Number"} value={estimedTime}/>
                <LoginInput labelInput={"Repetições"} width='70px' onChange={setRepetitions} type={"Number"} value={repetitions}/>
                <LoginInput labelInput={"Data Limite"} width='130px'onChange={setDeadline} type={"Date"} value={deadline} />
            </Flex>
            {/* <LoginInput labelInput={""} onChange={setNovaTarefa} type={"Text"}/> */}
            <Button
                type="submit"
                value="Adicionar"
                disabled={!novaTarefa.trim()}
                bg={'lightgreen'}
            >
                +
            </Button>
        </form>
    )
}
export default TskBar;
