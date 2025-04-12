import { Button, Dialog, Portal } from "@chakra-ui/react";
import useDelete from "../../hooks/useDelete";
import { useContext, useState } from "react";
import { UserContext } from "../../hooks/UserContext";
import { PiXCircleBold } from "react-icons/pi";
import { Tab } from "../Tabs/classTab";

interface IpropComp {
  tabToRemove: Tab
}

const DeleteTabDialog = ({ tabToRemove }: IpropComp) => {
  const { httpConfigDel } = useDelete(`https://api-todo-ckia.onrender.com/tabs/delete?id=${tabToRemove.id}`);
  const { setTabs, tabs } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const remove = (tabParaRemover: Tab) => {
    const filteredtabs = tabs.filter((tab: Tab) => tab.id !== tabParaRemover.id);
    setTabs(filteredtabs);
    httpConfigDel();
    setIsOpen(false);
  }

  return (
    <Dialog.Root role="alertdialog" open={isOpen}>
      <Dialog.Trigger asChild>
        <PiXCircleBold onClick={() => setIsOpen(true)} />
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header display={"flex"} direction={'column'} justifyContent={"space-between"} p={'1.5em'}>
              <Dialog.Title>Tem certeza?</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body p={'1em'}>
              <p>
                Deletará todas as tarefas desta tab, esta ação não poderá ser desfeita.
              </p>
            </Dialog.Body>
            <Dialog.Footer p={'1.5em'}>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={() => setIsOpen(false)}>Cancelar</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="red" onClick={() => remove(tabToRemove)}>Excluir</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default DeleteTabDialog
