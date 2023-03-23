import React, { Component } from 'react';
import axios from 'axios';
import { useState } from "react"

function AddCar() {
    const handleAddCar = e => {
        // Prevent the default submit and page reload
        e.preventDefault()
        const carData = JSON.stringify({ name: name, description: description, carTypeId: parseInt(carTypeId) });
       
        const customConfig = {
            headers: {
                "Accept": "application/json",
                "Access-Control-Allow-Headers": "*",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            }
        };
        // Handle validations
        //axios
        //    .post("http://localhost:5052/api/Car", carData, customConfig)
            
        axios({
            method: 'post',
            url: 'http://localhost:5052/api/Car',
            data: JSON.stringify({ name: name, description: description, carTypeId: parseInt(carTypeId) }),
            headers: {
                "Accept": "application/json",
                "Access-Control-Allow-Headers": "*",
                "Content-Type": "application/json",
            }
        }).then(response => {
            console.log(response)
        })
        .catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the
                // browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        })
        console.log(carData);
    }

    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [carTypeId, setcarTypeId] = useState()
    return (
        <div>
            <form action="" id="AddCar" method="post" onSubmit={handleAddCar}>
                <h1>Add Car</h1>
                <p className="item">
                    <label> Description </label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </p>
                <p className="item">
                    <label> Name </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </p>
                <p className="item">
                    <label> Car type id </label>
                    <input
                        type="text"
                        name="carTypeId"
                        id="carTypeId"
                        value={carTypeId}
                        onChange={e => setcarTypeId(e.target.value)}
                    />
                </p>
                <p className="item">
                    <input type="submit" value="AddCar" />
                </p>
            </form>
        </div>
    )
}

export default AddCar;