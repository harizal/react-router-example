import {useEffect, useState} from 'react'
import axios from "axios";
import {useParams, useHistory} from 'react-router-dom'
import useHttp from '../hooks/useHttp'

export default () => {

    //const[product, setProduct] = useState()
    const params = useParams()
    const history = useHistory()

    const {data: product, loading} = useHttp(`https://fakestoreapi.com/products/${params.id}`)

    if(loading)
    {
        return<>Loading...</>
    }
    //useEffect(()=>{
    //    axios.get(`https://fakestoreapi.com/products/${params.id}`)
    //    .then(response => {
    //        setProduct(response.data)
    //    })
    //}, [])

    const Back = () =>{
        return history.push('/')
    }

    return(
        <>
            <h1>{product?.title}</h1>
            <img src={product?.image} width="200px" height="200px"></img>
            <p>{product?.description}</p>
            <p>{product?.price}</p>
            <button onClick={() => Back()}>Back</button>
        </>
    )
}