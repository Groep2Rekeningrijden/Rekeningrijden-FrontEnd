import React, { useRef, useEffect, useState, Component } from 'react';
import axios from 'axios'
import RouteData from './RouteData';

const RouteMap = (props) => {
    const [data, setGeoData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    async function getData() {
        let mygeojson = { "type": "Feature", "properties": {}, "geometry": { "type": "LineString", "coordinates": [] } }
        await axios.get('http://localhost:5099/getById/' + props.route.id)
            .then(response => response.json())
            .then(data => {
                let i = 0;
                for (let point of data) {
                    // if (i < 100) {
                    //     i++;
                        mygeojson.geometry.coordinates.push([parseFloat(point.lat), parseFloat(point.long)]);
                    // } else {
                    //     break;
                    // }
                }
            });
        console.log(mygeojson);
        setGeoData(mygeojson);
        setIsLoading(false);
    }

    useEffect(() => {
if(props.route !== ''){
            getData();
        }
    }, [props])
        

    return (
        <div>
            <h3>Kaart:</h3>
            {isLoading ?
                (
                    "Loading..."
                ) :
                (
                    <RouteData geoData={data} />
                )}
        </div>
    );
}

export default RouteMap;