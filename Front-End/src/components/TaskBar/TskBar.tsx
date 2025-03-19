import { Button, Flex, Input } from '@chakra-ui/react'
import { Props, Task } from './ClassTask'
import { FormEvent, useRef, useState } from 'react';
import usePost from '../../hooks/usePost';

const TskBar = () => {
    const [novaTarefa, setNovaTarefa] = useState("");
    const [deadline, setDeadline] = useState<Date|null>(null);
    const [repetitions, setRepetitions] = useState(0);
    const { httpConfigPost } = usePost('https://api-todo-ckia.onrender.com/task/add');
    const ref = useRef<HTMLInputElement>(null);

    const adicionar1 = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!novaTarefa.trim()) return;
    
        const task = new Task(); 
        httpConfigPost(task, "POST");
        setNovaTarefa("");
    
        if (ref.current) {
          ref.current.focus();
        }
    }
    return (
        <form onSubmit={adicionar1}>
            <Flex direction={"column"} w={"90vw"} maxW={`900px`} mb={"2em"}>
                <sup>Adicionar Tarefa</sup>
                <Input
                    ref={ref}
                    variant={"flushed"}
                    mb={".5em"}
                    required
                    type="text"
                    placeholder="Cozinhar Almoço"
                    value={novaTarefa}
                    onChange={(e) => setNovaTarefa(e.target.value)}
                />
            </Flex>
            <Button
                type="submit"
                value="Adicionar"
                disabled={!novaTarefa.trim()}
                w={"10%"}
                my={'auto'}
                mb={"2em"}
                className="submit-button"
                bg={"white"}
                ml={".5em"}
            >
                +
            </Button>
            <Flex direction={"column"} w={"90vw"} maxW={`900px`} mb={"2em"}>
                <sup>Data Limite</sup>
                <Input
                    type="date"
                    variant={"flushed"}
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="deadline-input"
                />
                <Flex>
                    <sup>Hora:</sup>
                    <Input
                        type="time"
                        variant={"flushed"}
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="deadline-input"
                    />
                </Flex>
            </Flex>
            <Flex direction={"column"} w={"90vw"} maxW={`900px`} mb={"2em"}>
                <sup>Tempo Estimado:</sup>
                <Input
                    type="timer"
                    variant={"flushed"}
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="deadline-input"
                />
            </Flex>
            <Flex direction={"column"} w={"90vw"} maxW={`900px`} mb={"2em"}>
                <sup>Repetições:</sup>
                <Input
                    type="Number"
                    variant={"flushed"}
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="deadline-input"
                />
            </Flex>
        </form>
    )
}
export default TskBar;
