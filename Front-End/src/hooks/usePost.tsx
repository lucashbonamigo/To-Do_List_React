import { useEffect, useState } from 'react'
import { IHead } from '../Interfaces/Interfaces';

export function usePost<T>(url: string){
    const [dataPost, setData] = useState<T|null>(null);
    const [config, setConfig] = useState<IHead|null>(null);
    const [method, setMethod] = useState<string|null>(null);
    const [errorPost, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const httpConfigPost = (body:any, method: string) => {
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
                    throw new Error(`Erro: ${res.status}`)
                };

                let json = await res.json();
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
    return { dataPost, httpConfigPost, errorPost, loading };
};

export default usePost