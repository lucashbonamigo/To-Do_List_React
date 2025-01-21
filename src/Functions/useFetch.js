import { useEffect, useState } from 'react'

export const useFetch = (url) => {
    const [data, setData] = useState("");
    const [config, setConfig] = useState("");
    const [method, setMethod] = useState("");
    const [callFetch, setCallFetch] = useState(false);
    const [itemId, setItemId] = useState("");

    const httpconfig = (data, method) =>{
        if(method === 'POST'){
            setConfig({
                method,
                headers: {
                    "Content-Type": "aplication/json"
                },
                body: JSON.stringify(data)
            });
            setMethod(method);
        }else if(method === 'DELETE'){
            setConfig({
                method,
                headers: {
                    "Content-type": "application/json"
                }
            })
            setItemId(data);
            setMethod(method);
        };
    };

    //requisição GET
    useEffect(() =>{
        const fetchData = async () =>{
            const res = fetch(url);
            const data = await res.json();

            setData(data);
        }
        fetchData();
    },[url, callFetch])

    //requisição POST
    useEffect(()=>{
        let json;
        let res;
        const httpRequest = async () =>{
            if (method === 'POST'){
                let fetchOptions = [url, config];
                res = await fetch(...fetchOptions);
                json = await res.json();
            }else if(method === 'DELETE'){
                const DeleteUrl = `${url}/${itemId}`
                res = await fetch(DeleteUrl);
                json = await res.json();
            }
            setCallFetch(json);
        }
        httpRequest();
    },[config, method, url])
  return {data, httpconfig}
}

export default useFetch