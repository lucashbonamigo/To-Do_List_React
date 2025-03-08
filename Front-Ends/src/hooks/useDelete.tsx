import { useEffect, useState } from 'react'
import { IHead } from '../Interfaces/Interfaces';

interface IBody {
    id: number
}

export const useDelete = (url: string) => {
    const [dataDel, setData] = useState(null);
    const [config, setConfig] = useState<IHead|null>(null);
    const [method, setMethod] = useState<string|null>(null);
    const [itemId, setItemId] = useState<IBody>();
    const [error, setError] = useState(null);

    const httpConfigDel = (body: IBody, method: string) => {
        if (method === 'DELETE') {
            setConfig({
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
            setItemId(body);
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

                if (!res.ok) throw new Error(`Erro: ${res.status}`);
                const json = await res.json();
                setData(json);
                setError(null);
            } catch (err: any) {
                setError(err.message);
                setData(null);
            }
        };
        httpRequest();
    }, [config, method, url, itemId]);
    return { dataDel, httpConfigDel, error };
};

export default useDelete