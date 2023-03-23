import React, { Component } from 'react';
import axios from 'axios';

export default class App extends Component {
    static displayName = App.name;
    state = {
        cars: []
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
                    this.state.cars
                        .map(car =>
                            <li key={car.id}>{car.name}</li>
                        )
                }
            </ul>
        )
    }
}
