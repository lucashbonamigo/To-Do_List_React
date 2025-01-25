import { useEffect, useState } from 'react'

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [config, setConfig] = useState("");
    const [method, setMethod] = useState(null);
    const [callFetch, setCallFetch] = useState(false);
    const [itemId, setItemId] = useState(null);
    const [error, setError] = useState(null);

    const httpConfig = (data, method) =>{
        if(method === 'POST'){
            setConfig({
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            setMethod(method);
        }else if(method === 'DELETE'){
            setConfig({
                method,
                headers: {
                    "Content-type": "application/json"
                }
            })
            setItemId(data);
            setMethod(method);
        };
    };

    //requisição GET
  
    //requisição POST
    useEffect(() => {
        const fetchData = async () => {
            try {
              const res = await fetch('http://localhost:5000/Login  ');
              // Verifique se a resposta é JSON antes de usar res.json()
              if (!res.ok) {
                throw new Error(`Erro na requisição: ${res.status}`);
              }
              const data = await res.json();
              console.log(data); // Agora você pode usar a resposta JSON
            } catch (error) {
              console.error('Erro ao buscar dados:', error);
            }
          };
          
          fetchData();
      }, [url, callFetch]);
    
      // Requisição POST ou DELETE
      useEffect(() => {
        const httpRequest = async () => {
          if (!config || !method) return; // Certifique-se de que há uma configuração válida
    
          try {
            let res;
            if (method === "POST") {
              res = await fetch(url, config);
            } else if (method === "DELETE") {
              const deleteUrl = `${url}/${itemId}`;
              res = await fetch(deleteUrl, config);
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