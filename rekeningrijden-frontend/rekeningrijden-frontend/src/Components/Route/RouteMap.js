import React, { useRef, useEffect, useState, Component } from 'react';
import RouteData from './RouteData';

function RouteMap() {
    const [data, setGeoData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const pluto_url = 'https://data.cityofnewyork.us/resource/64uk-42ks.json';
        getData();

        async function getData() {
            let mygeojson = { "type": "Feature", "properties": {}, "geometry": { "type": "LineString", "coordinates": [] } }
            await fetch(pluto_url)
                .then(response => response.json())
                .then(data => {
                    let i = 0;
                    for (let point of data) {
                        if (i < 100) {
                            i++;
                            mygeojson.geometry.coordinates.push([parseFloat(point.longitude), parseFloat(point.latitude)]);
                        } else {
                            break;
                        }
                    }
                });
            console.log(mygeojson);
            setGeoData(mygeojson);
            setIsLoading(false);
        }
    }, []);

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