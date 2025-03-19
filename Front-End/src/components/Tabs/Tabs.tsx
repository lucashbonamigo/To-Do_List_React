import React, { useContext, useEffect } from 'react'
import { Button, CloseButton, Heading, List, Tabs, Text } from "@chakra-ui/react"
import { useState } from "react"
import { LuPlus } from "react-icons/lu"
import { ITask } from '../../Interfaces/Interfaces'
import useGet from '../../hooks/useGet'
import { getLocalStorage } from '../../services/storage/localstorage'
import { UserContext } from '../../hooks/UserContext.js';

interface Item {
  id: string
  title: string
  content: React.ReactNode
}

const items: Item[] = [
  { id: "1", title: "No To-Do", content: "Tab Content" },
  { id: "2", title: "Para Estudar", content: "Tab Content" },
  { id: "3", title: "Documentação para Ler", content: "Tab Content" },
]

const uuid = () => {
  return Math.random().toString(36).substring(2, 15)
}

const Tabes = () => {
  const [tarefas, setTarefas] = useState<ITask[]>([]);
  const { dataGet, httpConfigGet } = useGet(`https://api-todo-ckia.onrender.com/task/tasks?id=${userID}`);
  const [tabs, setTabs] = useState<Item[]>(items)
  const [selectedTab, setSelectedTab] = useState<string | null>(items[0].id)
  const { user } = useContext(UserContext);
    const [userID, setUserID] = useState<number>(0);
    
    useEffect(() => {
      if (!user) {
        const id = getLocalStorage("id");
        setUserID(Number(id));
      }
      user && setUserID(user.id);
    }, [user]);
  const orderTasks = () => {
    const checkedTask = tarefas.filter((task: ITask) => task.status === 1);
    const unCheckedTask = tarefas.filter((tasks: ITask) => tasks.status != 1);

    const ordened = [...unCheckedTask, ...checkedTask];
    setTarefas(ordened);
  }
  useEffect(() => {
    if (dataGet) {
      setTarefas(dataGet);
    }
  }, [dataGet]);

  useEffect(() => {
    if (tarefas.length > 0) {
      orderTasks();
    }
  }, [tarefas]);

  useEffect(() => {
    if (userID) {
      httpConfigGet("GET");
    }
  }, [userID]);

  const remove = (tarefaParaRemover: ITask) => {
    const filteredTarefas = tarefas.filter((tarefa) => tarefa.id !== tarefaParaRemover.id);
    setTarefas(filteredTarefas);

    const task = { id: tarefaParaRemover.id };
    httpConfigGet(task, "DELETE");
  };

  const handleCheckboxChange = (id: number) => {
    setTarefas((prevTarefas: ITask[]) => {
      const novasTarefas = prevTarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, status: tarefa.status === 0 ? 1 : 0 } : tarefa
      );

      const tarefaAtualizada = novasTarefas.find((tarefa) => tarefa.id === id);

      if (tarefaAtualizada) {
        const body = {
          id,
          status: tarefaAtualizada.status,
        };
        httpConfigGet(body, "PUT");
      }
      return novasTarefas;
    });
  };
  const addTab = () => {
    const newTabs = [...tabs]

    const uid = uuid()

    newTabs.push({
      id: uid,
      title: `Tab`,
      content: `Tab Body`,
    })

    setTabs(newTabs)
    setSelectedTab(newTabs[newTabs.length - 1].id)
  }

  const removeTab = (id: string) => {
    if (tabs.length > 1) {
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
        {tabs.map((item) => (
          <Tabs.Trigger value={item.id} key={item.id}>
            {item.title}{" "}
            <CloseButton
              as="span"
              role="button"
              size="2xs"
              me="-2"
              onClick={(e) => {
                e.stopPropagation()
                removeTab(item.id)
              }}
            />
          </Tabs.Trigger>
        ))}
        <Button
          alignSelf="center"
          ms="2"
          size="2xs"
          variant="ghost"
          onClick={addTab}
        >
          <LuPlus /> Add Tab
        </Button>
      </Tabs.List>

      <Tabs.ContentGroup>
        {tabs.map((item) => (
          <Tabs.Content value={item.id} key={item.id}>
            <Heading size="xl" my="6">
              {item.content} {item.id}
            </Heading>
            <Text>
              {tarefas.length > 0 ? (
                <List.Root>
                  {tarefas.map((tarefa: ITask, index) => (
                    <List.Item key={index} w={"90vw"} maxW={`900px`} border={'1px solid white'} background={"transparent"} pl={`.3em`} mt={".5em"} display={"flex"} alignItems={"Center"}>
                      <input
                        type="checkbox"
                        checked={tarefa.status === 1 ? true : false}
                        onChange={() => handleCheckboxChange(tarefa.id)}
                      />
                      <Text className="text" w={"100%"} ml={".5em"}>
                        {tarefa.task}
                      </Text>
                      <Button variant={"solid"} alignSelf={"end"} className="buttonX" onClick={() => remove(tarefa)}>
                        X
                      </Button>
                    </List.Item>
                  ))}
                </List.Root>
              ) : (
                <p className="no-tasks">Nenhuma tarefa adicionada ainda.</p>
              )}
              {/* .map com todo as tasks da aba */}
            </Text>
          </Tabs.Content>
        ))}
      </Tabs.ContentGroup>
    </Tabs.Root>
  )
}

export default Tabes
