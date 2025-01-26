import { useEffect, useState } from 'react'

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [config, setConfig] = useState("");
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);
  const [itemId, setItemId] = useState(null);
  const [error, setError] = useState(null);
  const [getData, setGetData] = useState(null);

  const httpConfig = (body, method) => {
    if (method === 'POST' || method === 'PUT') {
      setConfig({
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      setMethod(method);
    } else if (method === 'DELETE') {
      setConfig({
        method,
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      })
      console.log(body);
      setItemId(body);
      setMethod(method);
    }else if(method === "GET"){
      setConfig({
        method,
        headers: {
          "Content-Type": "application/json"
        }//,
       // body: JSON.stringify(body)
      });
      setMethod(method)
    };
  };


  // Requisição POST, PUT ou DELETE
  useEffect(() => {
    const httpRequest = async () => {
      if (!config || !method) return; // Certifique-se de que há uma configuração válida

      try {
        let res;
        if (method === "POST") {
          res = await fetch(url, config);
        } else if (method === "DELETE") {
          const deleteUrl = `http://localhost:5000/Delete`; //entender como funciona o parametro apartir do /item
          res = await fetch(deleteUrl, config);
        } else if (method === "PUT") {
          res = await fetch(url, config);
        } else if (method === "GET") {
          res = await fetch("http://localhost:5000/", config);
        }

        if (!res.ok) throw new Error(`Erro: ${res.status}`);
        const json = await res.json();
        setData(json);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      }
    };
    httpRequest();
  }, [config, method, url, itemId]);
  return { data, httpConfig, error };
};

export default useFetch