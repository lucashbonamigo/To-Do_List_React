import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import useDelete from "../../hooks/useDelete";
import { useContext, useState } from "react";
import { UserContext } from "../../hooks/UserContext";

interface IpropComp {
  id: number
}

const DeleteTabDialog = ({ id }: IpropComp) => {
  const { httpConfigDel } = useDelete(`https://api-todo-ckia.onrender.com/tabs/delete?id=${id}`);
  const {Getget} = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const remove = () => {
    httpConfigDel("DELETE");
    setIsOpen(false);
    Getget()
  }

  return (
    <Dialog.Root role="alertdialog" open={isOpen}>
      <Dialog.Trigger asChild>
        <Button variant="outline" className="buttonX" size="sm" onClick={() => setIsOpen(true)}>
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
                Deletará todas as tarefas desta tab, esta ação não poderá ser desfeita.
              </p>
            </Dialog.Body>
            <Dialog.Footer p={'1.5em'}>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancelar</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="red" onClick={() => remove()}>Excluir</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default DeleteTabDialog
