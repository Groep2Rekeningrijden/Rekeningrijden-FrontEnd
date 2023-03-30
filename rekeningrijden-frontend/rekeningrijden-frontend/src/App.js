import React, { Component } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CarList from './Components/CarList.js';
import AddCar from './Components/AddCar.js';
import MenuBar from './Components/MenuBar.js';

function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MenuBar />}>
                    <Route index element={<CarList />} />
                    <Route path="AddCar" element={<AddCar />} />
                </Route>
            </Routes>
        </BrowserRouter>
        /*<div className="App">
            <CarList />
            <AddCar />
        </div>*/
    )
}

export default App;