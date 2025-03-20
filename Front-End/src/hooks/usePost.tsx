import { useEffect, useState } from 'react'
import { IHead, Iresponse } from '../Interfaces/Interfaces';
import { Task } from '../components/TaskBar/ClassTask';

export const usePost = (url: string) => {
    const [dataPost, setData] = useState<Iresponse|null>(null);
    const [config, setConfig] = useState<IHead|null>(null);
    const [method, setMethod] = useState<string|null>(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const httpConfigPost = (body:Task, method: string) => {
        setLoading(true);
        if (method === 'POST') {
            setConfig({
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
            setMethod(method);
        }
    };


    // Requisição POST, PUT ou DELETE
    useEffect(() => {
        const httpRequest = async () => {
            if (!config || !method) return; // Certifique-se de que há uma configuração válida

            try {
                let res;
                res = await fetch(url, config);

                if (!res.ok) {
                    setData(null);
                    const json = await res.json();
                    setData(json);
                    console.log(json)
                    throw new Error(`Erro: ${res.status}`)
                };
                if (res.status === 201) {
                    setData(null)
                    return
                }
                const json = await res.json();
                setData(json);
                setError(null);
            } catch (err:any) {
                setError(err.message);
                setData(null);
            }finally{
                setLoading(false);
            }
        };
        httpRequest();
    }, [config, method, url]);
    return { dataPost, httpConfigPost, error, loading };
};

export default usePost