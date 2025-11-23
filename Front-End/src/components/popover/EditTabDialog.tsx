import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import { useContext, useState } from "react";
import LoginInput from "../LoginInput/LoginInput";
import { Tab } from "../Tabs/classTab";
import { TabContext } from "../../context/TabContext";

interface IpropComp {
  tabe: Tab,
  children: React.ReactNode
}

const EditeTabDialog = ({ tabe, children }: IpropComp) => {
  const { updateTab } = useContext(TabContext);
  const [name, setName] = useState(tabe.name);
  const [description, setDescription] = useState(tabe.description);

  const Update = (tabToAtualize: Tab) => {
    const tab: Tab = {
      name,
      description,
      id: tabToAtualize.id,
      user_id: tabToAtualize.user_id,
    };
    updateTab(tab);
  };

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
              <Dialog.Title>Editar tarefa</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm"/>
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body p={'1em'}>
              <LoginInput labelInput="Nome" value={name} type="text" onChange={setName} />
              <LoginInput labelInput="Descrição" type="text" value={description} onChange={setDescription} />
            </Dialog.Body>
            <Dialog.Footer p={'1.5em'}>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancelar</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="green" onClick={() => Update(tabe)}>Salvar</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
export default EditeTabDialog