import { Button, Dialog, Portal } from "@chakra-ui/react";
import { useContext } from "react";
import { Tab } from "../Tabs/classTab";
import { TabContext } from "../../context/TabContext";


interface IpropComp {
  tabToRemove: Tab,
  children: React.ReactNode
}

const DeleteTabDialog = ({ tabToRemove, children }: IpropComp) => {
  const { removeTab } = useContext(TabContext);

  const remove = (tabToRemove: Tab) => {
    removeTab(tabToRemove);
  }

  return (
    <Dialog.Root role="alertdialog">
      <Dialog.Trigger asChild>
        {children}
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg='#1F2630'>
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
                <Button variant='outline'>Cancelar</Button>
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
