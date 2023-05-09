import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import React, { useRef, useEffect, useState, Component } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1Ijoia2ltc2llcm8iLCJhIjoiY2xoZzFveWpwMWM2ZDNkcGM3eWludmRxayJ9.5KIyrZkYArzrS38PRfz0Jg';

function RouteMap() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(4.453854141435812);
    const [lat, setLat] = useState(50.41030639418156);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {

        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });

        // only want to work with the map after it has fully loaded
        // if you try to add sources and layers before the map has loaded
        // things will not work properly
        map.on("load", () => {
            // bus routes source
            // another example of using a geojson source
            // this time we are hitting an ESRI API that returns
            // data in the geojson format
            // see https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#geojson
            map.addSource('bus-routes', {
                type: "geojson",
                data: "features.geojson",
            })

            // avalanche paths - fill layer
            // source-layer can be grabbed from the tileset details page
            // in Mapbox studio
            // see https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#fill

            // bus routes - line layer
            // see https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#line
            map.addLayer({
                id: "bus-routes-line",
                type: "line",
                source: "bus-routes",
                paint: {
                    "line-color": "#000000",
                    "line-width": 4,
                },
            })
        })

        return () => map.remove()
    }, [])

    return <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />
}

export default RouteMap;