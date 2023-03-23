import React, { Component } from 'react';
import CarList from './Components/CarList.js';
import AddCar from './Components/AddCar.js';

function App(){
    return (
        <div className="App">
            <CarList />
            <AddCar />
        </div>
    )
}

export default App;