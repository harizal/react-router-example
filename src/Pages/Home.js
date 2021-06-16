import {Redirect} from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import '../../src/App.css';
import useHttp from '../hooks/useHttp'

export default () => {

    if(!localStorage.getItem('auth'))
    {
        return <Redirect to ="/login"/>
    }
    const [auth, setAuth] = useState([])    
    const [charts, setChart] = useState([])
    //const [products, setProducts] = useState([])

    useEffect(() => {
        setAuth(localStorage.getItem('auth'))
    })

    const AddToChart = (id, title, price) => {
        let existingData = charts.filter(m => m.productId === id)
        if(existingData.length === 0)
        {
            setChart(chart => [
                ...chart, {
                    productId: id,
                    title: title,
                    price: price,
                    total: 1
                }
            ])
        }
        else
        {
            var chartList = charts.map((chart) => {
                if(chart.productId === id)
                {
                    console.log(chart.productId)
                    console.log(id)
                    return{
                        ...chart,
                        total: chart.total + 1
                    }
                }
                else
                {
                    return chart
                }
            })
            setChart(chartList)
        }
    }
    
    const IncreaseDecreaseTotal = (id, type) => {
        var chartList = charts.map((chart, i) => {            
          if(chart.productId === id)
          {        
            return {
              ...chart,
              total: type === 0 ? chart.total + 1 : chart.total - 1
            }        
          }
          else{
            return chart;
          }      
        })
      
        setChart(chartList)
      }

    const {data: products, loading} = useHttp('https://fakestoreapi.com/products')
    

    
    if(loading)
    
    {
        return <>Loading....</>
    }   

    return <>
        <h1>Home</h1>
        <div className="container">
            <div>
                <h1>List Of Product</h1>
                {products?.map((product, index) => {
                    return(
                        <>
                            <div key={index}>
                                <div>
                                <Link to={`/product/${product.id}`}>
                                    <p>{product.title}</p>
                                    <img src={product.image} width="100" height="100"></img>
                                </Link>
                                    <p><button onClick={()=> AddToChart(product.id, product.title, product.price)}>Add to Cart</button></p>
                                </div>
                            </div>
                        </>
                    )
                })}   
            </div>
            <div>
                <h1>Chart List</h1>
                {charts?.map((chart, index) => {
                    return <>
                        <p key={index}>
                            Product Name : {chart.title}
                            <br/>
                            Price : {chart.price}
                            <br/>
                            Total : {chart.price * chart.total} .... ({chart.price} * {chart.total})
                            <br/>
                            <button onClick={() => IncreaseDecreaseTotal(chart.productId, 0)}>+</button>{chart.total === 1 ? '' : <button onClick={() => IncreaseDecreaseTotal(chart.productId, 1)}>-</button>}
                        </p>
                    </>
                })}
                <p><h5>Total : {charts.reduce((a, v) => a = a + (v.price * v.total), 0)}</h5></p>
            </div>
        </div>            
    </>
}