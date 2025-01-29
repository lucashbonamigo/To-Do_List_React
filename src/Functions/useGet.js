import { useEffect, useState } from 'react'

export const useGet = (url) => {
  const [dataGet, setData] = useState(null);
  const [config, setConfig] = useState("");
  const [method, setMethod] = useState(null);
  const [error, setError] = useState(null);

  const httpConfigGet = (method) => {
    if (method === "GET") {
      setConfig({
        method,
        headers: {
          "Content-Type": "application/json"
        }
      });
      setMethod(method)
    };
  };

  useEffect(() => {
    const httpRequest = async () => {
      if (!config || !method) return;

      try {
        let res;
        res = await fetch(url, config);

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
  }, [config, method, url]);
  return { dataGet, httpConfigGet, error };
};

export default useGet;