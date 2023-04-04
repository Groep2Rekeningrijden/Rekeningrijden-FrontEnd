import React, { Component } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button} from 'react-bootstrap';
function deleteCar(id) {
    axios.delete(`http://localhost:5052/api/Car?id=` + id)
        .then(res => {

        })
};

const deleteButton = (params) => {

    
};

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Naam' },
    { field: 'description', headerName: 'Beschrijving' },
    { field: 'cartype.name', headerName: 'Auto type naam', valueGetter: (params) => params.row?.carType?.name },
    { field: 'cartype.description', headerName: 'Auto type beschrijving', valueGetter: (params) => params.row?.carType?.description },
    { field: 'carType.pricePerKilometer', headerName: 'Prijs per Km', valueGetter: (params) => params.row?.carType?.pricePerKilometer },
    {
        field: 'options', headerName: 'Options', sortable: false,
        renderCell: (params) => {
            return (
                <Button onClick={deleteCar(params.row?.id)}>Click</Button>
            );
        }
    },
];

export default class App extends Component {
    static displayName = App.name;
    state = {
        cars: [],
        columns: columns
    }

    componentDidMount() {
        axios.get(`http://localhost:5052/api/Car`)
            .then(res => {
                const cars = res.data;
                this.setState({ cars });
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
