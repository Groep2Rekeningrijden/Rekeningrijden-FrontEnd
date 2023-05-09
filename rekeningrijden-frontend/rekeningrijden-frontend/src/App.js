import React, { useRef, useEffect, useState, Component } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CarList from './Components/CarList.js';
import AddCar from './Components/AddCar.js';
import MenuBar from './Components/MenuBar.js';
import ManageCarPage from './Pages/ManageCarPage.js';
import RouteMap from './Components/Route/RouteMap.js';

function App() {

    return (
        <div>
            <RouteMap/>
        </div>
        /*<BrowserRouter>
            <Routes>
                <Route path="/" element={<MenuBar />}>
                    <Route index element={<ManageCarPage />} />
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