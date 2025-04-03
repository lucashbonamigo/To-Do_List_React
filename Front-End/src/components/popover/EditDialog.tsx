import { Button, CloseButton, Dialog, Flex, Portal } from "@chakra-ui/react"
import { useContext, useState } from "react";
import { UserContext } from "../../hooks/UserContext";
import { Task } from "../TaskBar/ClassTask";
import { PiPencil } from "react-icons/pi";
import LoginInput from "../LoginInput/LoginInput";

interface IpropComp {
  tarefa: Task
}

const EditeDialog = ({ tarefa }: IpropComp) => {
  const { httpConfigPut } = useContext(UserContext);
  const [content, setNovaTarefa] = useState(tarefa.content);
  const [deadline, setDeadline] = useState<Date|undefined>(tarefa.deadline);
  const [repetitions, setRepetitions] = useState<number|undefined>(tarefa.Repetitions);
  const [estimedTime, setEstmedTime] = useState<number|undefined>(tarefa.estimatedTime);
  const [isOpen, setIsOpen] = useState(false);
  const [tabNumber, setTabNumber] = useState<number>(tarefa.tab_task);

  const Update = (taskToAtualize: Task) => {
    const task = {
      content,
      deadline,
      estimedTime,
      repetitions,
      id: taskToAtualize.id,
      status: taskToAtualize.status,
      tab_task: tabNumber,
    };
    httpConfigPut(task ,"PUT")
    setIsOpen(false)
  };

  return (
    <Dialog.Root role="alertdialog" open={isOpen}>
      <Dialog.Trigger asChild>
        <Button variant="outline" className="buttonV" size="sm" onClick={() => setIsOpen(true)}>
          <PiPencil />
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header display={"flex"} direction={'column'} justifyContent={"space-between"} p={'1.5em'}>
              <Dialog.Title>Editar tarefa</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" onClick={()=>setIsOpen(false)}/>
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body p={'1em'}>
              <LoginInput labelInput="Tarefa" value={content} type="text" onChange={setNovaTarefa}/>
              <Flex gap={`.7em`} p={'1em 3em'}>
                <LoginInput labelInput="Repetições" type="number" value={repetitions} onChange={setRepetitions}/>
                <LoginInput labelInput="Horas Estimadas" type="number" value={estimedTime} onChange={setEstmedTime}/>
                <LoginInput labelInput="Data Limite" type={'Date'} value={deadline?.toString()} onChange={setDeadline}/>
                <LoginInput labelInput="Tab" type={'Select'} value={tabNumber} onChange={setTabNumber}/>
              </Flex>
              {/* ADICIONAR TODOS OS INPUTS REFERENTES A TASK AQUI */}
            </Dialog.Body>
            <Dialog.Footer p={'1.5em'}>
              <Dialog.ActionTrigger asChild>
                <Button onClick={()=>setIsOpen(false)} variant="outline">Cancelar</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="red" onClick={() => Update(tarefa)}>Salvar</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
export default EditeDialog