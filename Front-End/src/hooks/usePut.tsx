import { useEffect, useState } from 'react'
import { Task } from '../components/TaskBar/ClassTask';
import { Tab } from '../components/Tabs/classTab';

export function usePut<T>(url: string){
    const [dataPut, setData] = useState<T|null>(null);
    const [config, setConfig] = useState<{ method: string; headers: { "Content-Type": string }; body: string } | null>(null);
    const [method, setMethod] = useState<string|null>(null);
    const [errorPut, setError] = useState<string>('');

    const httpConfigPut = (body :Task|Tab, method :string) => {
        if (method === 'PUT') {
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
                    setError(res.toString());    
                    throw new Error(`Erro: ${res.status}`);
                };
                const json = await res.json();
                setData(json);
                setError('');
            } catch (err: any) {
                setError(err.message);
                setData(null);
            }
        };
        httpRequest();
    }, [config, method, url]);
    return { dataPut, httpConfigPut, errorPut };
};

export default usePut