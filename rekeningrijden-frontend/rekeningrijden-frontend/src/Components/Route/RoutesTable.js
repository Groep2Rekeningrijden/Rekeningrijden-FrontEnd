import Table from 'react-bootstrap/Table'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loading from '../Loading';

const RoutesTable = () => {
    const [routes, setRoutes] = useState([])
    const [render, setRender] = useState(<tr></tr>)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchdata(){
        setLoading(true);      
        const response = await axios.get(`http://localhost:61309/api/Car`)
        setRoutes(response.data)
        setLoading(false);}
        fetchdata();
    }, [])

    useEffect(() => {
        setRender(routes.map(RenderRoute));
    }, [routes]);
    
    const RenderRoute = (route, index) => {
        return (
            <tr key={index}>
                <td>{route.priceTotal}</td>              
            </tr>
        )
    }
    return (loading ? <Loading /> :
        <Table className="table table-hover" striped bordered>
            <thead>
                <tr>
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