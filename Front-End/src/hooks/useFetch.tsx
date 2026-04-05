import { useContext, useEffect, useState } from 'react'
import { IHead } from '../Interfaces/Interfaces';
import { UserContext } from '../context/NotificationContext';

export function useFetch<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [config, setConfig] = useState<IHead | null>(null);
    const [method, setMethod] = useState<string | null>(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const {token} = useContext(UserContext);

    const httpConfig = (method: string, body?: any,) => {
        setLoading(true);
        const baseConfig = {
            method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        };
        if (method === 'POST' || method === 'PUT') {
            setConfig({
                ...baseConfig,
                body: JSON.stringify(body)
            });
        } else {
            setConfig(baseConfig);
        }
        setMethod(method);
    };

    useEffect(() => {
        const httpRequest = async () => {
            if (!config || !method) return;

            try {
                let res;
                res = await fetch(url, config);

                if (!res.ok) {
                    throw new Error(`Erro: ${res.status}`)
                };

                let json = await res.json();
                setData(await json);
                setError(null);
            } catch (err: any) {
                setError(err.message);
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        httpRequest();
    }, [config, method, url]);
    return { data, httpConfig, error, loading };
};

export default useFetch;