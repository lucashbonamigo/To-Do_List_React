import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import { useContext, useState } from "react";

import LoginInput from "../LoginInput/LoginInput";
import { Tab } from "../Tabs/classTab";

import { LuPlus } from "react-icons/lu";
import { TabContext } from "../../context/TabContext";

const AddTabDialog = () => {
  const [tabName, setTabName] = useState<string>('');
  const [tabDescription, setTabDescription] = useState<string>('');
  const { addTab } = useContext(TabContext);
  const [isOpen, setIsOpen] = useState(false);

  const insertTab = () => {
    setIsOpen(false);
    setTabName('');
    setTabDescription('');
    const tab = new Tab(tabName, Number(localStorage.getItem('id')), tabDescription)
    addTab(tab);
  }

  return (
    <Dialog.Root role="alertdialog" open={isOpen}>
      <Dialog.Trigger asChild>
        <Button 
          variant="outline" 
          borderRadius='full' 
          onClick={() => setIsOpen(true)}
        >
          <LuPlus/>
        </Button>
      </Dialog.Trigger>
      
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg='#1F2630'>
            <Dialog.Header 
              display={"flex"} 
              direction={'column'} 
              justifyContent={"space-between"} 
              p={'1.5em'}
            >
              <Dialog.Title>
                Adicionar Aba
              </Dialog.Title>
              
              <Dialog.CloseTrigger asChild>
                <CloseButton 
                  size="sm" 
                  onClick={() => setIsOpen(false)}
                />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body 
              p={'1em'}
            >
              <LoginInput 
                labelInput="Nome" 
                value={tabName} 
                type="text" 
                onChange={setTabName}
              />
              <LoginInput 
                labelInput="Description" 
                value={tabDescription} 
                type="text" 
                onChange={setTabDescription}
              />
            </Dialog.Body>
            <Dialog.Footer p={'1.5em'}>
              <Dialog.ActionTrigger asChild>
                <Button onClick={()=>setIsOpen(false)} variant="outline">Cancelar</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="green" onClick={insertTab}>Salvar</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
export default AddTabDialog