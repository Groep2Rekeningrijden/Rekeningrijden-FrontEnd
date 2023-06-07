import React, { useRef, useEffect, useState, Component } from 'react';
import axios from 'axios'
import RouteData from './RouteData';

const RouteMap = (props) => {
    const [data, setGeoData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    async function getData() {
        let data = "";
        await axios.get('http://localhost:5054/routes/getRoute', { params: { id: "b344e30e-6a32-4c2a-b2db-beae7f97142d" } })
            .then(resp => {
                data = resp.data;
            });
        let geojson = {
            features: [{
                type: "Feature",
                properties: {},
                geometry: {
                    coordinates: [],
                    type: "LineString",
                },
            }],
            "type": "FeatureCollection"
        }

        for (let i = 0; i < data.segments.length; i++) {
            geojson.features[0].geometry.coordinates.push([
                data.segments[i].start.lat,
                data.segments[i].start.lon
            ]);
        }
        let geo = JSON.stringify(geojson, null, 2);
        setGeoData(geo);
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