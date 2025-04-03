import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import { useContext, useState } from "react";

import LoginInput from "../LoginInput/LoginInput";
import { Tab } from "../Tabs/classTab";
import { UserContext } from "../../hooks/UserContext";
import { LuPlus } from "react-icons/lu";

const AddTabDialog = () => {
  const [tabName, setTabName] = useState<string>('');
  const [tabDescription, setTabDescription] = useState<string>('');
  const { httpConfigPost } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const addTab = () => {
    if (!tabName) return

    const tab = new Tab(tabName, Number(localStorage.getItem('id')), tabDescription)
    httpConfigPost(tab, "POST");
  }

  return (
    <Dialog.Root role="alertdialog" open={isOpen}>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
          <LuPlus/>
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header display={"flex"} direction={'column'} justifyContent={"space-between"} p={'1.5em'}>
              <Dialog.Title>Nova Tab</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm"  onClick={() => setIsOpen(false)}/>
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body p={'1em'}>
              <LoginInput labelInput="Nome" value={tabName} type="text" onChange={setTabName}/>
              <LoginInput labelInput="Description" value={tabDescription} type="text" onChange={setTabDescription}/>
            </Dialog.Body>
            <Dialog.Footer p={'1.5em'}>
              <Dialog.ActionTrigger asChild>
                <Button onClick={()=>setIsOpen(false)} variant="outline">Cancelar</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="red" onClick={addTab}>Salvar</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
export default AddTabDialog