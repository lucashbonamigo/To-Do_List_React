import { useEffect, useState } from 'react'

export const usePut = (url: string) => {
    const [dataPost, setData] = useState(null);
    const [config, setConfig] = useState<{ method: string; headers: { "Content-Type": string }; body: string } | null>(null);
    const [method, setMethod] = useState<string|null>(null);
    const [error, setError] = useState(null);

    const httpConfigPut = (body :any, method :string) => {
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
    }, [config, method, url]);
    return { dataPost, httpConfigPut, error };
};

export default usePut