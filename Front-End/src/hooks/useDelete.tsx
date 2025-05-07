import { useEffect, useState } from 'react'
import { IHead } from '../Interfaces/Interfaces';

export function useDelete() {
    const [dataDel, setData] = useState(null);
    const [options, setOptions] = useState<IHead | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [url, setUrl] = useState<string | null>(null);

    const httpConfigDel = (url: string) => {
        setUrl(url)
        setOptions({
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        });
    };

    useEffect(() => {
        const httpRequest = async () => {
            if (!options || !url) return;

            try {
                const res = await fetch(url, options);
                if (!res.ok) throw new Error(`Erro: ${res.status}`);
                const json = await res.json();
                setData(json);
                setError(null);
            } catch (err: any) {
                setError(err.message);
                setData(null);
            } finally {
            }
        };
        httpRequest();
    }, [options]);

    return { dataDel, httpConfigDel, error };
}

export default useDelete;