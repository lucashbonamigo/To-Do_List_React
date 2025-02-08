import { useEffect, useState } from 'react'

export const usePost = (url) => {
    const [dataPost, setData] = useState(null);
    const [config, setConfig] = useState("");
    const [method, setMethod] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const httpConfigPost = (body, method) => {
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
                    setData('Success')
                    return
                }
                const json = await res.json();
                setData(json);
                setError(null);
            } catch (err) {
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