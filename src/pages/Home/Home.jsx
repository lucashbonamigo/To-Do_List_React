import React, { useEffect, useState, useRef } from "react";
import useFetch from "../../Functions/useFetch";

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
    setTrigger((trigger)=> trigger + 1);
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
    <div className="body">
      <h1 className="title">To-Do List</h1>

      {/* Formulário para adicionar nova tarefa */}
      <form onSubmit={adicionar1}>
        <input
          ref={ref}
          className="digitadd"
          required
          type="text"
          placeholder="Adicione uma tarefa"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="deadline-input"
        />
        <input type="submit" value="Adicionar" className="submit-button" />
      </form>

      {/* Lista de tarefas */}
      {tarefas.length > 0 && (
        <ul className="items">
          {tarefas.map((tarefa, index) => (
            <li key={index} className="item">
              <input type="checkbox" className="modal" />
              <p className="text">
                {tarefa.task} {/* <small>{tarefa.deadline}</small> */}
              </p>
              <button className="buttonX" onClick={() => remove(tarefa.id)}>
                X
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Exibir mensagem caso não haja tarefas */}
      {tarefas.length === 0 && <p className="no-tasks">Nenhuma tarefa adicionada ainda.</p>}
    </div>
  );
};

export default Home;
