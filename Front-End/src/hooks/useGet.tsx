import { useEffect, useState } from 'react'
import { IHead } from '../Interfaces/Interfaces';

export const useGet = (url:string) => {
  const [dataGet, setData] = useState(null);
  const [config, setConfig] = useState<IHead|null>(null);
  const [method, setMethod] = useState<string|null>(null);
  const [error, setError] = useState(null);

  const httpConfigGet = (method: string) => {
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
      } catch (err:any) {
        setError(err.message);
        setData(null);
      }
    };
    httpRequest();
  }, [config, method, url]);
  return { dataGet, httpConfigGet, error };
};

export default useGet;