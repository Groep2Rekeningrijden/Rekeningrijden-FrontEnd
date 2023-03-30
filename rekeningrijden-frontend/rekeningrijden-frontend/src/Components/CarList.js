import React, { Component } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

export default class App extends Component {
    static displayName = App.name;
    getCarTypeDescription(params) {
        return params.carType.description;
    }
    state = {
        cars: [],
        columns: [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'name', headerName: 'Naam', width: 130 },
            { field: 'description', headerName: 'Beschrijving', width: 130 },
            { field: 'cartype.name', headerName: 'Auto type naam', width: 130, valueGetter: (params) => params.row?.carType?.name },
            { field: 'cartype.description', headerName: 'Auto type beschrijving', width: 130, valueGetter: (params) => params.row?.carType?.description },
            { field: 'carType.pricePerKilometer', headerName: 'Prijs per Km', width: 130, valueGetter: (params) => params.row?.carType?.pricePerKilometer },
        ],
    }

    

    componentDidMount() {
        axios.get(`http://localhost:5052/api/Car`)
            .then(res => {
                const cars = res.data;
                this.setState({ cars });
                console.log(cars);
                console.log(this.state.cars[0].carType);
            })
    }

    render() {
        return (
            <ul>
                {
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={this.state.cars}
                            columns={this.state.columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                        />
                    </div>
                }
            </ul>
        )
    }
}
