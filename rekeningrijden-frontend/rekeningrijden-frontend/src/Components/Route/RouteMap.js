import React, { useRef, useEffect, useState, Component } from 'react';
import axios from 'axios'
import RouteData from './RouteData';

const RouteMap = (props) => {
    const [data, setGeoData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const [items, setItems] = useState([]);

    useEffect(() => {
        // Simulating fetching items from a database
        const fetchItems = async () => {
            try {
                // Perform an asynchronous operation to fetch the items from the database
                // For example, using fetch or axios
                const response = await fetch('https://lts.oibss.nl/Routes/getRoutes');
                const data = await response.json();
                // Update the state with the retrieved items
                setItems(data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, []);

    async function getData(idtest) {
        setIsLoading(true);
        let data = "";
        await axios.get('https://lts.oibss.nl/Routes/getRoute', { params: { id: idtest } })
            .then(resp => {
                data = resp.data;
            });;
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
                data.segments[i].start.lon,
                data.segments[i].start.lat
            ]);
        }
        let geo = JSON.stringify(geojson, null, 2);
        setGeoData(geo);
        setIsLoading(false);
    }

    /*useEffect(() => {
        if(props.route !== ''){
            getData();
        }
    }, [props])*/

    const shoot = (idtest) => {
        getData(idtest);
    }
        

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
            {items.map((item, index) => (
                <button onClick={() => { shoot(item.id) }}>{item.id}</button>
            ))}
        </div>
    );
}

export default RouteMap;