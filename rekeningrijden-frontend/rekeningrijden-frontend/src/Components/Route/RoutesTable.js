import Table from 'react-bootstrap/Table'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loading from '../Loading';

const RoutesTable = () => {
    const [cars, setCars] = useState([])
    const [render, setRender] = useState(<tr></tr>)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchdata(){
        setLoading(true);      
        const response = await axios.get(`http://localhost:61309/api/Car`)
        setCars(response.data)
        setLoading(false);}
        fetchdata();
    }, [])

    useEffect(() => {
        setRender(routes.map(RenderRoute));
    }, [routes]);
    
    const RenderRoute = (route, index) => {
        return (
            <tr key={index}>
                <td>{route.date}</td>
                <td>{route.distance}</td>
                <td>{route.price}</td>              
            </tr>
        )
    }
    return (loading ? <Loading /> :
        <Table className="table table-hover" striped bordered>
            <thead>
                <tr>
                    <th>Auto</th>
                    <th>Kilometers</th>
                    <th>Kosten</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {render}
            </tbody>
        </Table>
    )
}

export default RoutesTable