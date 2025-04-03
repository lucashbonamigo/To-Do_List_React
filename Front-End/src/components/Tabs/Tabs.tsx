import { useContext } from 'react'
import { Button, CloseButton, Heading, List, Tabs, Text } from "@chakra-ui/react"
import { useState } from "react"
import { LuPlus } from "react-icons/lu"
import { UserContext } from '../../hooks/UserContext.js';
import { Task } from '../TaskBar/ClassTask.js'
import { Tab } from './classTab.js'
import DeleteDialog from '../popover/DeleteDialog.js'
import EditeDialog from '../popover/EditDialog.js';
import React from 'react';
import AddTabDialog from '../popover/AddTabDialog.js';
import { PiPencil } from 'react-icons/pi';

const Tabes = () => {

  const [selectedTab, setSelectedTab] = useState<string>('')
  const { tarefas, setTarefas, httpConfigPut, tabsData, httpConfigPost } = useContext(UserContext);
  const [tabs, setTabs] = useState<Tab[]>(tabsData ? tabsData : []);

  const handleCheckboxChange = (id: number) => {
    setTarefas((prevTarefas: Task[]) => {
      const novasTarefas = prevTarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, status: tarefa.status === 0 ? 1 : 0 } : tarefa
      );

      const tarefaAtualizada = novasTarefas.find((tarefa) => tarefa.id === id);

      if (tarefaAtualizada) {
        const body = {
          id,
          status: tarefaAtualizada.status,
          content: tarefaAtualizada.content,
          tab_task: tarefaAtualizada.id
        };
        httpConfigPut(body, "PUT");
      }
      return novasTarefas;
    });
  };

  const removeTab = (id: number) => {
    if (tabs && tabs.length > 1) {
      const newTabs = [...tabs].filter((tab) => tab.id !== id)
      setTabs(newTabs)
    }
  }

  return (
    <Tabs.Root
      value={selectedTab}
      variant="outline"
      size="sm"
      onValueChange={(e) => setSelectedTab(e.value)}
    >
      <Tabs.List flex="1 1 auto">
        {tabs && tabs.map((tab: Tab) => (
          <Tabs.Trigger value={tab.id.toString()} key={tab.id}>
            {tab.name}{" "}
            <Button size={'sm'} animation={"0.3s"} variant="outline" className="buttonV">
              <PiPencil color='white'/>
            </Button>
            <CloseButton
              as="span"
              role="button"
              size="2xs"
              me="-2"
              onClick={(e) => {
                e.stopPropagation()
                removeTab(tab.id)
              }}
            />
          </Tabs.Trigger>
        ))}
        <AddTabDialog />
      </Tabs.List>

      <Tabs.ContentGroup>
        {tabs && tabs.map((tab: Tab) => (
          <Tabs.Content value={tab.id.toString()} key={tab.id}>
            <Heading size="xl" my="6">
              {tab.description} {tab.id}
            </Heading>
            <Text>
              {tarefas.length > 0 ? (
                <List.Root>
                  {tarefas.map((task: Task) => (
                    task.tab_task.toString() === selectedTab ? (
                      <React.Fragment key={task.id}>
                        <List.Item key={task.id} w={"90vw"} maxW={`900px`} border={'1px solid white'} background={"transparent"} pl={`.3em`} mt={".5em"} display={"flex"} alignItems={"Center"}>
                          <input
                            type="checkbox"
                            checked={task.status === 1 ? true : false}
                            onChange={() => handleCheckboxChange(task.id)}
                          />
                          <Text className="text" w={"100%"} ml={".5em"}>
                            {task.content}
                          </Text>
                          <EditeDialog tarefa={task} />
                          <DeleteDialog tarefa={task} />

                        </List.Item>
                      </React.Fragment>) : (null)
                  ))}
                </List.Root>
              ) : (
                <p className="no-tasks">Nenhuma tarefa adicionada ainda.</p>
              )}
              {/* .map com todo as tasks da aba  */}
            </Text>
          </Tabs.Content>
        ))}
      </Tabs.ContentGroup>
    </Tabs.Root>
  )
}
export default Tabes