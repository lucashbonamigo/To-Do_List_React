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

const Tabes = () => {
  
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>('')
  const { tarefas, setTarefas, httpConfigPut } = useContext(UserContext);
  const [tabId, setTabID] = useState<number>(1);
  const [tabName, setTabName] = useState<string>('geral');
  const [tabDescription, setTabDescription] = useState<string>('tudo misturado');

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

  const addTab = () => {
    //if (!tabName) return
    const newTabs = [...tabs]

    newTabs.push(new Tab(tabId, tabName, tabDescription))

    setTabs(newTabs)
    setSelectedTab(newTabs[newTabs.length - 1].id.toString())
    setTabName('');
    setTabDescription('');
    setTabID(tabId + 1);
  }

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
        {tabs && tabs.map((tab) => (
          <Tabs.Trigger value={tab.id.toString()} key={tab.id}>
            {tab.name}{" "}
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
        <Button
          alignSelf="center"
          ms="2"
          size="sm"
          variant="outline"
          onClick={addTab}
          w={'150px'}
        >
          <LuPlus /> {/* ABRIR UM FLUTUANTE COM iNPUT PARA iNSERIR O TEXTO*/}
        </Button>
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
                          <EditeDialog tarefa={task}/>
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