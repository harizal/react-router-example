import { useEffect, useState } from "react"
import axios from 'axios'

export default function useHttp(url, option) {
    const [loading, setLoading] = useState()
    const [data, setData] = useState()

    useEffect(() => {    
        setLoading(true);
        axios.get(url, option)
        .then(respose => {
            setData(respose.data)
        })
        .catch(e =>{
            setLoading(false);
        })
        .finally(()=>{
            setLoading(false);
        })
    },[url])

    return {data, loading};
}