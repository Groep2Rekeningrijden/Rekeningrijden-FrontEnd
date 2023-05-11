import React, { useRef, useEffect, useState, Component } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1Ijoia2ltc2llcm8iLCJhIjoiY2xoZzFveWpwMWM2ZDNkcGM3eWludmRxayJ9.5KIyrZkYArzrS38PRfz0Jg';

function RouteData(props) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-73.890557);
    const [lat, setLat] = useState(40.7682044);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        let data = props.geoData;

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
            console.log(data);
            // data in the geojson format
            map.addSource('route', {
                type: "geojson",
                data: data
            }
            )
            const geojsonSource = map.getSource('route');
            // Update the data after the GeoJSON source was created
            geojsonSource.setData(data);
                // bus routes - line layer
                // see https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#line
                map.addLayer({
                    id: "route-line",
                    type: "line",
                    source: "route",
                    paint: {
                        "line-color": "#000000",
                        "line-width": 4,
                    },
                })
        })

        return () => map.remove()
    }, []);

    return (
        <div>
            <div ref={mapContainer} style={{ width: "100%", height: "50vh" }} />
        </div>
    );
}

export default RouteData;