import { useEffect, useState } from 'react'

export const useDelete = (url) => {
    const [dataDel, setData] = useState(null);
    const [config, setConfig] = useState("");
    const [method, setMethod] = useState(null);
    const [itemId, setItemId] = useState(null);
    const [error, setError] = useState(null);

    const httpConfigDel = (body, method) => {
        if (method === 'DELETE') {
            setConfig({
                method,
                headers: {
                    "Content-type": "application/json"
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
            } catch (err) {
                setError(err.message);
                setData(null);
            }
        };
        httpRequest();
    }, [config, method, url, itemId]);
    return { dataDel, httpConfigDel, error };
};

export default useDelete