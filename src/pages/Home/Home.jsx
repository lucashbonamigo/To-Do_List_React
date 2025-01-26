import React, { useEffect, useState, useRef } from "react";
import useFetch from "../../Functions/useFetch";
import { Field } from "../../components/ui/field.jsx"
import { HiHeart } from "react-icons/md"

import {
  Button,
  Heading,
  Input,
  Flex,
  Text,
  List,
  Center
} from '@chakra-ui/react'

const Home = () => {
  const url = "http://localhost:5000/addTask";
  const [tarefas, setTarefas] = useState([]); // Lista de tarefas
  const [novaTarefa, setNovaTarefa] = useState(""); // Nova tarefa a ser adicionada
  const [deadline, setDeadline] = useState("01/01/2025"); // Prazo da tarefa
  const { data, httpConfig } = useFetch(url); // Hook customizado para requisições
  const ref = useRef(null); // Referência ao input de texto
  const [trigger, setTrigger] = useState(0);

  // Buscar tarefas ao carregar o componente
  useEffect(() => {
    httpConfig(null, "GET"); // Faz a requisição GET para obter tarefas
  }, [trigger]);

  // Atualizar o estado `tarefas` sempre que os dados da API mudarem
  useEffect(() => {
    if (data) {
      setTarefas(data); // Atualiza as tarefas com os dados recebidos
    }
  }, [data]);

  // Função para adicionar uma nova tarefa
  const adicionar1 = (e) => {
    e.preventDefault();

    if (novaTarefa.trim() === "") return; // Impede adição de tarefa vazia

    const task = {
      novaTarefa,
      deadline,
    };

    httpConfig(task, "POST"); // Faz a requisição POST para adicionar tarefa
    setNovaTarefa(""); // Reseta o input de tarefa
    setTrigger((trigger) => trigger + 1);
    ref.current.focus(); // Retorna o foco ao input de texto
  };

  // Função para remover uma tarefa
  const remove = (tarefaParaRemover) => {
    const filteredTarefas = tarefas.filter((tarefa) => tarefa.tarefa !== tarefaParaRemover.tarefa);
    setTarefas(filteredTarefas);
    setTrigger((prev) => prev + 1);
    const task = {
      tarefaParaRemover,
      deadline,
    };

    httpConfig(task, "DELETE"); // Faz a requisição POST para adicionar tarefa
  };

  return (
    <Flex className="body">
      <Heading size={'5xl'} >To-Do List Ract</Heading>
      <form onSubmit={adicionar1} className="form">
        <Field label={'Adicionar tarefa'} mt={'2em'}>
        <Input
          ref={ref}
          variant={"flushed"}
          mb={'1em'}
          required
          type="text"
          placeholder="Cozinhar Almoço"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
        />
        </Field>
        <Field label={'Deadline'}>
          <Input
            type="date"
            variant={"flushed"}
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="deadline-input"
          />
        </Field>
        <Button type="submit" value="Adicionar" disabled={!novaTarefa} w={'100%'} marginX={'auto'} mt={`1em`} mb={'2em'} className="submit-button">  
          +
        </Button>
      </form>

      {/* Lista de tarefas */}
      {tarefas.length > 0 && (
        <List.Root>
          {tarefas.map((tarefa, index) => (
            <List.Item key={index} w={'90vw'} maxW={`900px`} background={'gray'} pl={`.3em`} mb={'.2em'} mt={'.5'} display={'flex'} alignItems={'Center'}>
              <input type="checkbox"/>
              <Text className="text" w={'100%'} ml={'.5em'} >
                {tarefa.task} {/* <small>{tarefa.deadline}</small> */}
              </Text>
              <Button variant={"solid"} alignSelf={'end'} className="buttonX" onClick={() => remove(tarefa.id)}>
                X
              </Button >
            </List.Item>
          ))}
        </List.Root>
      )}

      {/* Exibir mensagem caso não haja tarefas */}
      {tarefas.length === 0 && <p className="no-tasks">Nenhuma tarefa adicionada ainda.</p>}
    </Flex>
  );
};

export default Home;
