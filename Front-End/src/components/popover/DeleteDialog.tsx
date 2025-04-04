import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import { useContext } from "react";
import { UserContext } from "../../hooks/UserContext";
import { Task } from "../TaskBar/ClassTask";
import useDelete from "../../hooks/useDelete";

interface IpropComp {
  tarefa: Task
}

const DeleteDialog = ({ tarefa }: IpropComp) => {
  const { tarefas, setTarefas } = useContext(UserContext);
  const { httpConfigDel } = useDelete(`https://api-todo-ckia.onrender.com/task/Delete}`);
  const {Getget} = useContext(UserContext);
  const remove = (tarefaParaRemover: Task) => {
    const filteredTarefas = tarefas.filter((tarefa: Task) => tarefa.id !== tarefaParaRemover.id);
    setTarefas(filteredTarefas);

    const task = { id: tarefaParaRemover.id };
    httpConfigDel(task, "DELETE");
    Getget()
  };

  return (
    <Dialog.Root role="alertdialog">
      <Dialog.Trigger asChild>
        <Button variant="outline" className="buttonX" size="sm">
          X
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header display={"flex"} direction={'column'} justifyContent={"space-between"} p={'1.5em'}>
              <Dialog.Title>Tem certeza?</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body p={'1em'}>
              <p>
                Esta ação não poderá ser desfeita.
              </p>
            </Dialog.Body>
            <Dialog.Footer p={'1.5em'}>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancelar</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="red" onClick={() => remove(tarefa)}>Excluir</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
export default DeleteDialog